import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile")) || {
      name: user.name || "User",
      email: user.email || "",
      mobile: "",
      address: "",
    }
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  const totalSpent = orders.reduce(
    (sum, order) => sum + (order.price || 0),
    0
  );

  const memberSince =
    localStorage.getItem("memberSince") ||
    new Date().toLocaleDateString();

  localStorage.setItem("memberSince", memberSince);

  const lastLogin =
    localStorage.getItem("lastLogin") ||
    new Date().toLocaleString();

  localStorage.setItem(
    "lastLogin",
    new Date().toLocaleString()
  );

  const saveProfile = () => {
    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    alert("Profile Updated Successfully");
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #d4fc79, #96e6a1)",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "750px",
          margin: "auto",
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            width="130"
            style={{
              borderRadius: "50%",
            }}
          />

          <h1>My Profile</h1>
        </div>

        <hr />

        <h3>
          👤 Name:
          {isEditing ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
            />
          ) : (
            ` ${profile.name}`
          )}
        </h3>

        <h3>
          📧 Email:
          {isEditing ? (
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
            />
          ) : (
            ` ${profile.email || "Not Added"}`
          )}
        </h3>

        <h3>
          📱 Mobile:
          {isEditing ? (
            <input
              type="text"
              value={profile.mobile}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  mobile: e.target.value,
                })
              }
            />
          ) : (
            ` ${profile.mobile || "Not Added"}`
          )}
        </h3>

        <h3>
          🏠 Address:
          {isEditing ? (
            <input
              type="text"
              value={profile.address}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  address: e.target.value,
                })
              }
            />
          ) : (
            ` ${profile.address || "Not Added"}`
          )}
        </h3>

        <h3>📦 Total Orders: {orders.length}</h3>

        <h3>🛒 Cart Items: {cart.length}</h3>

        <h3>💰 Total Amount Spent: ₹{totalSpent}</h3>

        <h3>📅 Member Since: {memberSince}</h3>

        <h3>🕒 Last Login: {lastLogin}</h3>

        <h3 style={{ color: "green" }}>
          ⭐ Premium Member
        </h3>

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
          }}
        >
          {isEditing ? (
            <button
              onClick={saveProfile}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;