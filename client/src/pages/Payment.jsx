import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const originalAmount = location.state?.totalPrice || 0;

  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  let discount = 0;
  let couponMessage = "";
  let couponColor = "";

  switch (coupon.toUpperCase()) {
    case "SAVE10":
      discount = originalAmount * 0.1;
      couponMessage = "SAVE10 Applied - 10% Off";
      couponColor = "green";
      break;

    case "HDFC20":
      discount = originalAmount * 0.2;
      couponMessage = "HDFC20 Applied - 20% Off";
      couponColor = "blue";
      break;

    case "SBI15":
      discount = originalAmount * 0.15;
      couponMessage = "SBI15 Applied - 15% Off";
      couponColor = "orange";
      break;

    default:
      if (coupon !== "") {
        couponMessage = "Invalid Coupon Code";
        couponColor = "red";
      }
  }

  const finalAmount = originalAmount - discount;

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    localStorage.setItem("paymentMethod", paymentMethod);
    localStorage.setItem("finalAmount", finalAmount);

    if (paymentMethod === "Cash on Delivery") {
      alert("Order Placed Successfully!");
    } else {
      alert(`Payment Successful via ${paymentMethod}`);
    }

    navigate("/order-confirmation");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "550px",
          margin: "auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#0d6efd" }}>
          Payment
        </h2>

        <h3>
          Original Amount: ₹{originalAmount}
        </h3>

        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <div style={{ marginTop: "15px" }}>
          <b>Available Offers</b>
          <br />
          SAVE10 - 10% OFF
          <br />
          HDFC20 - 20% OFF
          <br />
          SBI15 - 15% OFF
        </div>

        {couponMessage && (
          <p
            style={{
              color: couponColor,
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {couponMessage}
          </p>
        )}

        <h3 style={{ color: "green" }}>
          Discount: ₹{discount.toFixed(2)}
        </h3>

        <h2 style={{ color: "#dc3545" }}>
          Final Amount: ₹{finalAmount.toFixed(2)}
        </h2>

        <div
          style={{
            marginTop: "25px",
            textAlign: "left",
            background: "#f8f9fa",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h4>Select Payment Method</h4>

          <label>
            <input
              type="radio"
              name="payment"
              value="Google Pay"
              checked={paymentMethod === "Google Pay"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            {" "}Google Pay
          </label>

          <br /><br />

          <label>
            <input
              type="radio"
              name="payment"
              value="PhonePe"
              checked={paymentMethod === "PhonePe"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            {" "}PhonePe
          </label>

          <br /><br />

          <label>
            <input
              type="radio"
              name="payment"
              value="Paytm"
              checked={paymentMethod === "Paytm"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            {" "}Paytm
          </label>

          <br /><br />

          <label>
            <input
              type="radio"
              name="payment"
              value="SuperMoney"
              checked={paymentMethod === "SuperMoney"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            {" "}SuperMoney
          </label>

          <br /><br />

          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            {" "}Other UPI Apps
          </label>

          {[
            "Google Pay",
            "PhonePe",
            "Paytm",
            "SuperMoney",
            "UPI",
          ].includes(paymentMethod) && (
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Enter UPI ID"
                style={{
                  width: "100%",
                  padding: "10px",
                }}
              />
            </div>
          )}

          <br /><br />

          <label>
            <input
              type="radio"
              name="payment"
              value="Credit/Debit Card"
              checked={
                paymentMethod ===
                "Credit/Debit Card"
              }
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            {" "}Credit / Debit Card
          </label>

          {paymentMethod ===
            "Credit/Debit Card" && (
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Card Number"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              />

              <input
                type="text"
                placeholder="Card Holder Name"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              />

              <input
                type="password"
                placeholder="CVV"
                style={{
                  width: "100%",
                  padding: "10px",
                }}
              />
            </div>
          )}

          <br /><br />

          <label>
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={
                paymentMethod ===
                "Cash on Delivery"
              }
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            {" "}Cash on Delivery (COD)
          </label>

          {paymentMethod ===
            "Cash on Delivery" && (
            <p
              style={{
                color: "green",
                marginTop: "10px",
              }}
            >
              Pay when the order is delivered.
            </p>
          )}
        </div>

        <button
          onClick={handlePayment}
          style={{
            marginTop: "25px",
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {paymentMethod === "Cash on Delivery"
            ? "Place Order"
            : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default Payment;