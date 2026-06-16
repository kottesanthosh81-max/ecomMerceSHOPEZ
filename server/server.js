const express = require("express");
const cors = require("cors");
const connectDB=require("./db");
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
console.log("PRO LOAD SUC")
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes=require("./routes/adminRoutes");
const  errorHandler  = require("./middleware/errorMiddleware");
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin",adminRoutes);


app.get("/", (req, res) => {
  res.send("Server is running");
});


app.get("/api", (req, res) => {
  res.send("API is working");
});

const PORT = 5000;
app.get("/test", (req, res) => {
    res.send("SANTH NEW SERVER 123");
});

app.get("/error-test", (req, res, next) => {
  const error = new Error("This is a test error");
  next(error);
});


app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


