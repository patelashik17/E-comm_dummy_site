import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Invoice.css";

export interface Props {
  quantity?: number;
}

const Invoice: React.FC<Props> = (props: any) => {
  const { products } = useSelector((state: any) => state.CartReducer);

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
      <PayPalScriptProvider
        options={{
          clientId:
            "AeexPwxaM-z6wxBxIWwBn4FMp50uSTmojkXqAnT8NDobBieUitx9s-CO6TNqWYpaSBv4Cw7t89ez5ftM",
        }}
      >
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
              {products.map((product: any) => (
                <tbody>
                  <td>{product.index}</td>
                  <tr className="row-data">
                    <td>{product.title}</td>
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
            <PayPalButtons className="paypal" />
          </div>
        </div>
      </PayPalScriptProvider>
    </>
  );
};

export default Invoice;
