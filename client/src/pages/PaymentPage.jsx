import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Select a payment method");
      return;
    }

    navigate("/order-confirmation", {
      state: { paymentMethod },
    });
  };

  return (
    <div className="container mt-4">
      <h2>Payment Method</h2>

      <div className="form-check">
        <input
          type="radio"
          name="payment"
          value="Credit Card"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label className="ms-2">Credit Card</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          name="payment"
          value="Debit Card"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label className="ms-2">Debit Card</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          name="payment"
          value="UPI"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label className="ms-2">UPI</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          name="payment"
          value="Net Banking"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label className="ms-2">Net Banking</label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          name="payment"
          value="Cash on Delivery"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <label className="ms-2">Cash on Delivery</label>
      </div>

      <button
        className="btn btn-success mt-3"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
}

export default PaymentPage;