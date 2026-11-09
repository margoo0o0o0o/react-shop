import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="container product-message">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/" className="btn btn--primary">Back to home</Link>
    </div>
  );
}