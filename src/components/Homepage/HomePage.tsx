import { useEffect , useState,useCallback } from "react";
import { Button } from "antd";
import "./HomePage.css";
import Navigation from "../Navigation/Navigation";
import {
  setAddSuccess,
  setBedgeCount,
  setProductData,
} from "./Reducer/Reducer";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch,useSelector } from "react-redux";

const Homepage = () => {
  const productData = useSelector((state:any) => state.HomePage.productData);
  const bedgeCount = useSelector((state:any) => state.HomePage.bedgeCount);
  const [open, setOpen] = useState(false);
  const dispatch=useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    dispatch(setProductData(data));
    console.log(data);  
  };

  const addData = async (productId: any) => {
    try {
      const selectedProduct = productData.products.find(
        (product: any) => product.id === productId
      );
      const response = await fetch(
        "https://e-comm-b9d1a-default-rtdb.firebaseio.com/productData.json",
        {
          method: "POST",
          body: JSON.stringify(selectedProduct),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAddSuccess(true);
      dispatch(setBedgeCount(bedgeCount + 1));
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };




  return (
    <>
      <Navigation src="" />
      <div className="product_page">
        {productData?.products?.map((product: any, id: number) => (
          <div className="box" key={id}>
            <ul>
              <img
                src={product.images[0]}
                alt="product-img"
                className="product_image"
              />
              <div className="desc">
                <li className="id-hide">{product.id}</li>
                <li className="prod_title">{product.title}</li>
                <li className="prod_desc">{product.description}</li>
                <li className="prod_price">₹ {product.price}</li>
                <li>{product.rating.rate}</li>
              </div>
              <Button
                type="primary"
                className="add_cart"
                onClick={() => addData(product.id)}
              >
                Add to cart
              </Button>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};


export default Homepage;
