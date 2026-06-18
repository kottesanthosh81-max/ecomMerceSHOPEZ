import { Link } from "react-router-dom";

function Navbar() {
  const cartCount =
    JSON.parse(localStorage.getItem("cart") || "[]").length;

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged Out Successfully");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h2 className="logo">SHOPEZ</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        <Link to="/cart">Cart ({cartCount})</Link>

        <Link to="/orders">MyOrders</Link>
        <div>
  <Link to="/profile">My Profile</Link>
</div>
<div>
  <Link to="/contact">Contact</Link>
</div>
      </div>
    </nav>
  );
}

export default Navbar;