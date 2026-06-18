import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [product, setProduct] = useState(null);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const [reviews, setReviews] = useState([
    {
      name: "Santosh",
      comment: "Very Good Product",
      rating: 5,
    },
    {
      name: "Ravi",
      comment: "Worth the price",
      rating: 4,
    },
    {
      name: "Kiran",
      comment: "Fast delivery",
      rating: 5,
    },
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const addToCart = () => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      _id: product._id,
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart");
  };

  const buyNow = () => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const buyNowProduct = {
      _id: product._id,
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price,
      quantity: 1,
    };

    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify(buyNowProduct)
    );

    navigate("/checkout");
  };

  const submitReview = () => {
    if (!review) {
      alert("Please write review");
      return;
    }

    const newReview = {
      name: "User",
      comment: review,
      rating,
    };

    setReviews([newReview, ...reviews]);
    setReview("");
    setRating(5);
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const averageRating =
    reviews.reduce((a, b) => a + b.rating, 0) /
    reviews.length;

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "350px",
            borderRadius: "10px",
          }}
        />

        <div>
          <h1>{product.name}</h1>

          <h2 style={{ color: "green" }}>
            ₹{product.price}
          </h2>

          <p>{product.description}</p>

          <h3>Category: {product.category}</h3>

          <h3>
            Stock:
            {product.stock > 0
              ? " In Stock"
              : " Out Of Stock"}
          </h3>

          <h3>
            ⭐ {averageRating.toFixed(1)} / 5
          </h3>

          <p>🚚 Delivery in 2-5 Days</p>

          <p>🔄 7 Days Replacement</p>

          <p>💳 Secure Payments</p>

          <button
            onClick={addToCart}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            Add To Cart
          </button>

          <button
            onClick={buyNow}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Buy Now
          </button>
        </div>
      </div>

      <hr />

      <h2>Product Specifications</h2>

      <ul>
        <li>Brand: {product.name}</li>
        <li>Category: {product.category}</li>
        <li>Available Stock: {product.stock}</li>
        <li>Warranty: 1 Year</li>
      </ul>

      <hr />

      <h2>Customer Reviews</h2>

      {reviews.map((r, index) => (
        <div
          key={index}
          style={{
            border: "1px solid lightgray",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <h4>{r.name}</h4>

          <p>{"⭐".repeat(r.rating)}</p>

          <p>{r.comment}</p>
        </div>
      ))}

      <hr />

      <h2>Write Review</h2>

      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
      >
        <option value={5}>5 Star</option>
        <option value={4}>4 Star</option>
        <option value={3}>3 Star</option>
        <option value={2}>2 Star</option>
        <option value={1}>1 Star</option>
      </select>

      <br />
      <br />

      <textarea
        rows="4"
        cols="50"
        placeholder="Write your review..."
        value={review}
        onChange={(e) =>
          setReview(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={submitReview}>
        Submit Review
      </button>
    </div>
  );
}

export default ProductDetails;