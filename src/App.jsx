import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Card from "./pages/Card";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Card" element={<Card />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
