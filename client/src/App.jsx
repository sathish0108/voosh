import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/home";
import "./App.css";
const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/editor" element={<Editor />} /> */}
      </Routes>
    </HashRouter>
  );
};

export default App;
