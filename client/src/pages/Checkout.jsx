import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Checkout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const buyNowProduct = JSON.parse(
    localStorage.getItem("buyNowProduct")
  );

  const cartItems =
    location.state?.cartItems ||
    (buyNowProduct ? [buyNowProduct] : []);

  const totalPrice =
    location.state?.totalPrice ||
    cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);

  const productName = cartItems?.[0]?.name || "";
  const category = cartItems?.[0]?.category || "";

  if (!token) {
    return <Navigate to="/login" />;
  }

  const placeOrder = async () => {
    if (!name || !address || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          name,
          address,
          phone,
          productName,
          price: totalPrice,
          category,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Confirmed Successfully!");

      navigate("/payment", {
        state: {
          totalPrice,
          cartItems,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "30px auto",
        padding: "25px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2>Checkout</h2>

      <hr />

      <h3>Product: {productName}</h3>

      <h4>Category: {category}</h4>

      <h3 style={{ color: "green" }}>
        Total Price: ₹{totalPrice}
      </h3>

      <hr />

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(Number(e.target.value))
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <button
        onClick={placeOrder}
        style={{
          width: "100%",
          padding: "12px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Confirm Order
      </button>
    </div>
  );
}

export default Checkout;