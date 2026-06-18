import { useEffect, useState } from "react";

function OrderConfirmation() {
  const [orderId, setOrderId] = useState("");

  const paymentMethod =
    localStorage.getItem("paymentMethod") || "Not Selected";

  const finalAmount =
    localStorage.getItem("finalAmount") || 0;

  useEffect(() => {
    const newOrderId =
      "ORD" + Math.floor(100000 + Math.random() * 900000);

    setOrderId(newOrderId);
  }, []);

  const orderDate = new Date().toLocaleDateString();

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-success">
        🎉 Order Placed Successfully!
      </h1>

      <hr />

      <h4 className="mt-3">
        Order ID: {orderId}
      </h4>

      <h5>
        Order Date: {orderDate}
      </h5>

      <h5>
        Payment Method: {paymentMethod}
      </h5>

      <h5>
        Total Paid: ₹{Math.round(finalAmount)}
      </h5>

      <h5>
        Delivery Status: Processing
      </h5>

      <h5>
        Expected Delivery:
        {" "}
        {estimatedDelivery.toLocaleDateString()}
      </h5>

      <div className="mt-4">
        <p>
          Thank you for shopping with us ❤️
        </p>

        <p>
          Your order has been received and is
          being prepared for shipment.
        </p>
      </div>

      <button
        className="btn btn-success mt-3"
        onClick={() => (window.location.href = "/")}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderConfirmation;