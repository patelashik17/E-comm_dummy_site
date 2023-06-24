import React, { useEffect , useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { DeleteTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Cart.scss";
import {
setProducts,
incrementQuantity,
  decrementQuantity,
  deleteProduct,
  setLoading,
  setError,
} from "./Reducer/Reducer";

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

const Cart: React.FC = () => {
  const { products, loading, error } = useSelector(
    (state: any) => state.CartReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));

      try {
        const response = await fetch(
          "https://e-comm-b9d1a-default-rtdb.firebaseio.com/productData.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();

        const products = Object.values(data).map((product: any) => ({
          ...product,
          quantity: 1,
        }));
        dispatch(setProducts(products));
      } catch (error: any) {
        dispatch(setError(error.message));
      }
      dispatch(setLoading(false));
    };

    fetchData();
  }, [dispatch]);

  const handleIncrementQuantity = (productId: number) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = (productId: number) => {
    dispatch(decrementQuantity(productId));
  };

  const calculateTotal = () => {
    let total = 0;
    products.map((item: any) => (total = total + item.quantity * item.price));
    return total;
  };

  const handleDelete = async (productId: any) => {
    if (productId) {
      try {
        await fetch(
          `https://e-comm-b9d1a-default-rtdb.firebaseio.com/productData/${productId}.json`,
          {
            method: "DELETE",
          }
        );
        dispatch(deleteProduct(productId));
        console.log("Item deleted successfully");
      } catch (error) {
        console.error(error);
      }
    }
  };

  
  if (loading) {
    return <center><h1>Loading......</h1></center>;
  }
  
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (products.length === 0) {
    return (
      <p>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>No</span> items
        in the cart.
      </p>
    );
  }

  return (
    <div className="cart_page">   
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow className="head_row">
              <TableCell className="head_row">Product</TableCell>
              <TableCell align="right" className="head_row">
                Title
              </TableCell>

              <TableCell align="right" className="head_row">
                Quantity
              </TableCell>
              <TableCell align="right" className="head_row">
                Total
              </TableCell>
              <TableCell align="right" className="head_row">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell
                  style={{ height: "34px", width: " 3rem" }}
                  
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="cart_img"
                  />
                </TableCell>
                <TableCell align="right">{product.title}</TableCell>

                <TableCell align="right">
                  <button
                    className="btn-outline-primary"
                    type="button"
                    style={{
                      width: "24px",
                      height: "25px",
                    }}
                    onClick={() => handleDecrementQuantity(product.id)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      width: "30px",
                      height: "25px",
                    }}
                    value={product.quantity.toString() || ""}
                    readOnly
                  />
                  <button
                    className="btn-inline-primary"
                    type="button"
                    style={{
                      width: "24px",
                      height: "25px",
                    }}
                    onClick={() => handleIncrementQuantity(product.id)}
                  >
                    +
                  </button>
                </TableCell>
                <TableCell align="right">
                  {product.price * product.quantity}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <DeleteTwoTone
                    style={{ fontSize: "22px" }}
                    onClick={(event: any) => handleDelete(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right" className="calculateTotal">
                {ccyFormat(calculateTotal())}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" className="shoppingbtn">
        Continue shopping
      </Button>

      <Link to="/invoice-bill">
        <Button
          className="checkOutbtn"
          variant="contained"
          endIcon={<ReceiptLongIcon />}
        >
          CheckOut
        </Button>
      </Link>
    </div>
  );
};

export default Cart;
