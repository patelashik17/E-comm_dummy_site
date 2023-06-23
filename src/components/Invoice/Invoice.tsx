  import "./Invoice.css";
  import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
  } from "@paypal/react-paypal-js";
  import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
  import { CLIENT_ID } from '../config/cofig';
  import {useState} from 'react';
  import {  useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { Link } from "react-router-dom";
  interface invoiceState {
    invoiceSlice: {
      product: any;
      
    };
  }

  export interface Props {
      quantity?: number;
  }
    

  const Invoice:React.FC<Props> = (props:any) => {
      const { products } = useSelector((state: any) => state.CartReducer);
    const { product } = useSelector(
      (state: invoiceState) => state.invoiceSlice
    );
    const [orderID, setOrderID] = useState(false);
    const [success, setSuccess] = useState(false);
    const createOrder = (data:any, actions:any) => {
      return actions.order.create({
          purchase_units: [
              {
                  description: "Sunflower",
                  amount: {
                      currency_code: "USD",
                      value: 20,
                  },
              },
          ],
      }).then((orderID:any) => {
              setOrderID(orderID);
              return orderID;
          });
  };

  // check Approval
  const onApprove = (data:any, actions:any) => {
      return actions.order.capture().then(function (details:any) {
          const { payer } = details;
          setSuccess(true);
      });
  };
    const navigate=useNavigate();
    const calculateTotal = () => {
      if (!products || products.length === 0) {
        return 0;
      }
      return products.reduce((total: number, item: any) => {
        return total + item.quantity * item.price;
      }, 0);
    };
    return (
      <>
      <PayPalScriptProvider options={{ clientId: "AeexPwxaM-z6wxBxIWwBn4FMp50uSTmojkXqAnT8NDobBieUitx9s-CO6TNqWYpaSBv4Cw7t89ez5ftM" }}>
        <div className="invoice-card">
          <div className="invoice-title">
            <div id="main-title">
              <h4>INVOICE</h4>
              <span>#89292</span>
            </div>

            <span id="date">16/02/2019</span>
          </div>

          <div className="invoice-details">
            <table className="invoice-table">
              <thead>
                <tr>
                  <td>PRODUCT</td>
                  <td>UNIT</td>
                  <td>PRICE</td>
                </tr>
               
              </thead>
              {products.map((product:any)=>(
              <tbody>    
                <tr className="row-data">
                  <td>
                    {product.title}
                  </td>
                  <td id="unit">{product.quantity}</td>
                  <td>{product.price * product.quantity}</td>
                 
                </tr>
                
                 
                
              </tbody>
              
              ))}
            </table>
          
          </div>
          <td className="total">calculate:: {calculateTotal()}</td>
          <div className="invoice-footer">
            <Link to="/homepage">
            <button className="btn btn-secondary" id="later">
              LATER
            </button>
            </Link>
            <PayPalButtons className="paypal"/>
          </div>
        </div>
        </PayPalScriptProvider>
      </>
    );
  };

  export default Invoice;
