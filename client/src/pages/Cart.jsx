import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter(
      (_, index) => index !== indexToRemove
    );

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
const totalPrice = cartItems.reduce(
  (total, item) => total + item.price,
  0
);
  return (
    <div>
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Cart is Empty</h3>
      ) : (
        cartItems.map((item, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <p>Stock: {item.stock}</p>

            <button onClick={() => removeItem(index)}>
              Remove
            </button>

            <hr />

          </div>
        ))
      )}
    <h2>Total: ₹{totalPrice}</h2>

<button
  onClick={() =>
    navigate("/checkout", {
  state: {totalPrice,
    cartItems,
  }
})
  }
>
  Place Order
</button>
    </div>
  );
}

export default Cart;