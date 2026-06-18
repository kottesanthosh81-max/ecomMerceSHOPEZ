import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{order.name}</h3>
            <p>Address: {order.address}</p>
            <p>Phone: {order.phone}</p>
            <p>Quantity: {order.quantity}</p>
            <img src={order.image} alt="" width="150" />

<p>Product: {order.productName}</p>
<p>Category: {order.category}</p>
<p>Price: ₹{order.price}</p>
<p>Quantity: {order.quantity}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;