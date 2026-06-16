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


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);


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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
