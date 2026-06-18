function Contact() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #36d1dc, #5b86e5)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center",
          width: "350px",
          boxShadow: "0 0 10px gray",
        }}
      >
        <h1>Contact Us</h1>

        <p>📧 support@kvrstore.com</p>

        <p>📞 +91 9876543210</p>

        <p>📍 Ghatkesar, Hyderabad, Telangana</p>

        <p>🕒 Mon - Sat : 9 AM - 8 PM</p>
      </div>
    </div>
  );
}

export default Contact;