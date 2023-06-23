import {  BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Homepage from "../Homepage/HomePage";
import Cart from '../Cart/Cart';
import Invoice from "../Invoice/Invoice";
import Aboutus from "../Aboutus/Aboutus";
const Router=()=>{
    return(
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/homepage" element={<Homepage/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/invoice-bill" element={<Invoice/>}/>
                    <Route path="/about-us" element={<Aboutus/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;