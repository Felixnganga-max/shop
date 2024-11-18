import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Collections from "./pages/Collections"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


function App() {
  

  return (
   <div className="px-4 sm:px-[2vw] md:px-[3vw] lg:px-[5vw]">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/contact" element={<Contact /> } />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="//cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
    <Footer />

   </div>
    
  )
}

export default App
