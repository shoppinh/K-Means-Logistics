import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Home from "./pages";
import Driver from "./pages/Driver";
import Order from "./pages/Order";
const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="driver" element={<Driver />} />
        <Route path="order" element={<Order />} />
      </Routes>
    </>
  );
};

export default App;
