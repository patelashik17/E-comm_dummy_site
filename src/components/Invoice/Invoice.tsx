import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Invoice.scss";

export interface Props {
  quantity?: number;
}

const Invoice: React.FC<Props> = () => {
  const { products } = useSelector((state: any) => state.CartReducer);

  const calculateTotal = () => {
    if (!products || products.length === 0) {
      return 0;
    }
    return products.reduce((total: number, item: any) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  const funDate = () => {
    const date = new Date();
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const getRandom = () => {
    let min = 10000;
    let max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
              <h4 >INVOICE</h4>
              <span>#{getRandom()}</span>
            </div>

            <span id="date">{funDate()}</span>
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
