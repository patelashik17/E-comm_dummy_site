import React, { useEffect } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';
import { DeleteTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {
  setProducts,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  setLoading,
  setError,
} from "./Reducer/Reducer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;
const Cart: React.FC = () => {
  const { products, loading, error } = useSelector(
    (state: any) => state.CartReducer
  );
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] =React. useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    loading(true);
  };
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
  return(
    <p>Loading......</p>);
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="cart_page">
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow className="head_row">
            <TableCell className="head_row">Product</TableCell>
            <TableCell align="right" className="head_row">Title</TableCell>
           
            <TableCell align="right" className="head_row">Quantity</TableCell>
            <TableCell align="right" className="head_row">Total</TableCell>
            <TableCell align="right" className="head_row">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {products?.map((product: any) => (
         
          
            <TableRow key={product.id}>
              <TableCell style={{height: "34px",width:" 3rem",}} className="cart_img">
                <img
               src={product.thumbnail}
               alt={product.title}
               className="cart_img"
             /></TableCell>
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
              <TableCell align="right">{product.price * product.quantity}</TableCell>
              <TableCell align="right"> <DeleteTwoTone style={{fontSize: "22px"}}
                  onClick={(event: any) => handleDelete(product.id)}
                /></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right" className="calculateTotal">{ccyFormat(calculateTotal())}</TableCell>
          </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>

     
        <Button variant="contained" className="shoppingbtn" onChange={handleCancel}>
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
