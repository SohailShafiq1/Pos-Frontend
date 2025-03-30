import { AiFillFileAdd, AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import style from "./addingproducts.module.css";

const s = style;

const AddingProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Fetch categories
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState(""); // New category input
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Open popup for adding a new product
  const openAddPopup = () => {
    setName("");
    setPrice("");
    setCategory("");
    setNewCategory(""); // Reset new category field
    setEditMode(false);
    setShowPopup(true);
  };

  // Open popup for editing a product
  const openEditPopup = (product) => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setNewCategory(""); // Reset new category field
    setEditingProductId(product.id);
    setEditMode(true);
    setShowPopup(true);
  };

  // Handle form submission for adding/updating product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCategory = newCategory ? newCategory : category; // Use newCategory if provided

    if (editMode) {
        // Update existing product
        try {
            const response = await fetch(`http://localhost:5000/api/products/${editingProductId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, price, category: finalCategory }),
            });

            if (response.ok) {
                const updatedProduct = await response.json();
                setProducts((prevProducts) =>
                    prevProducts.map((p) =>
                        p.id === editingProductId ? updatedProduct.product : p
                    )
                );

                setMessage("Product updated successfully!");
                setShowPopup(false);
            } else {
                setMessage("Error updating product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            setMessage("Failed to update product");
        }
    } else {
        // Add new product
        try {
            const response = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, price, category: finalCategory }),
            });

            if (response.ok) {
                const addedProduct = await response.json();
                setProducts([...products, addedProduct.product]);

                // Update category list if a new category was added
                if (newCategory && !categories.includes(newCategory)) {
                    setCategories([...categories, newCategory]);
                }

                setMessage("Product added successfully!");
                setShowPopup(false);
            } else {
                setMessage("Error adding product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            setMessage("Failed to add product");
        }
    }
};


  return (
    <div className={s.container}>
      <div className={s.products}>
        <h1>Products</h1>
        <AiFillFileAdd className={s.add} onClick={openAddPopup} />
      </div>
      <div className={s.item}>
        {products.map((product) => (
          <div key={product.id} className={s.items}>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <BiEdit className={s.edit} onClick={() => openEditPopup(product)} />
            <AiFillDelete className={s.delete} onClick={() => handleDelete(product.id)} />
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className={s.popupOverlay}>
          <div className={s.popup}>
            <h1>{editMode ? "Edit Product" : "Add New Product"}</h1>
            <form onSubmit={handleSubmit} className={s.form}>
              <div> 
                <h1>Enter Name:  
                  <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </h1>
              </div>
              <div>
                <h1>Enter Price: 
                  <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                  />
                </h1>
              </div>
              <div>
                <h1>Select Category:</h1>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={newCategory !== ""} // Disable if new category is entered
                  required
                >
                  <option value="">-- Select a Category --</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h1>Or Add New Category:</h1>
                <input
                  type="text"
                  placeholder="New Category"
                  value={newCategory}
                  onChange={(e) => {
                    setNewCategory(e.target.value);
                    setCategory(""); // Clear selected category when typing new one
                  }}
                />
              </div>
              <div className={s.buttons}>
                <button type="submit" className={s.addBtn}>
                  {editMode ? "Update Product" : "Add Product"}
                </button>
                <button type="button" className={s.close} onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </form>
            {message && <p className={s.message}>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddingProducts;
