import { useEffect, useState, useCallback } from "react";
import { Button } from "antd";
import Navigation from "../Navigation/Navigation";
import {
  setAddSuccess,
  setBedgeCount,
  setProductData,
} from "./Reducer/Reducer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.scss";

const Homepage = () => {
  const productData = useSelector((state:any) => state.HomePage.productData);
  const bedgeCount = useSelector((state:any) => state.HomePage.bedgeCount);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      dispatch(setProductData(response.data));
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [dispatch]);

  const addData = useCallback(
    async (productId:any) => {
      try {
        const selectedProduct = productData.products.find(
          (product:any) => product.id === productId
        );
        const response = await axios.post(
          "https://e-comm-b9d1a-default-rtdb.firebaseio.com/productData.json",
          selectedProduct
        );
        dispatch(setAddSuccess(true));
        dispatch(setBedgeCount(bedgeCount + 1));
      } catch (error) {
        console.error("Error adding data:", error);
      }
    },
    [bedgeCount, dispatch, productData.products]
  );

  return (
    <>
      <Navigation src="" bedgeCount={bedgeCount}/>
      <div className="product_page">
        {productData?.products?.map((product:any, id:any) => (
          <div className="box" key={id}>
            <ul>
              <img
                src={product.images[0]}
                alt="product-img"
                className="product_image"
              />
              <div className="desc">
                <li className="id-hide">{product.id}</li>
                <li
                  className="prod_title"
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  {product.title}
                </li>
                <li className="prod_desc" style={{ lineHeight: "23px" }}>
                  {product.description}
                </li>
                <li
                  className="prod_price"
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginTop: "10px",
                  }}
                >
                  ₹ {product.price}
                </li>
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
      <div>
       
      </div>
    </>
  );
};

export default Homepage;
