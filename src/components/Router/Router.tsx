import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Homepage from "../Homepage/HomePage";
import Invoice from "../Invoice/Invoice";
import Aboutus from "../Aboutus/Aboutus";
import Protected from "../Login/Protected";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Protected Component={Homepage} />} />
        <Route
          path="/invoice-bill"
          element={<Protected Component={Invoice} />}
        />
        <Route path="/about-us" element={<Protected Component={Aboutus} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
