import { Link, useParams } from "react-router";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const { orderNumber } = useParams();

  return (
    <div className="container order-success">
      <h1>Order placed</h1>
      <p>Thank you for your purchase!</p>
      <p>
        Your order number: <strong>#{orderNumber}</strong>
      </p>
      <Link to="/" className="btn btn--primary order-success__link">
        Back to catalog
      </Link>
    </div>
  );
}