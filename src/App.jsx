import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Sidebar from "./Components/SideBar"; // Create a separate Sidebar component
import Setting from "./Components/Setting/Setting";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}> 
        <Sidebar />  
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Setting/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
