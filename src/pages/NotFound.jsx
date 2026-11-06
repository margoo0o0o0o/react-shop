import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "50px 0", textAlign: "center" }}>
      <h1>404</h1>
      <p>Такой страницы не существует</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Вернуться на главную
      </Link>
    </div>
  );
}