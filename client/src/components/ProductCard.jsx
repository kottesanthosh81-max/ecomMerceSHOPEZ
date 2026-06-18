import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="product-card">
        <img src={product.image} alt={product.name} />

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <h2>₹{product.price}</h2>
      </div>
    </Link>
  );
}

export default ProductCard;