import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        (product.category || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      ) &&
      (category === "All" || product.category === category)
  );

  return (
    <>
      
      <div
        style={{
          textAlign: "center",
          padding: "70px 20px",
          background:
            "linear-gradient(to right, #00c6ff, #0072ff)",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "55px",
            marginBottom: "10px",
          }}
        >
          Welcome to SHOPEZ
        </h1>

        <p
          style={{
            fontSize: "20px",
            marginBottom: "25px",
          }}
        >
          🛒 Best Products at Best Prices
        </p>

        <button
          onClick={() =>
            window.scrollTo({
              top: 500,
              behavior: "smooth",
            })
          }
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#ff7b00",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Shop Now
        </button>
      </div>

    
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search products or categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            width: "350px",
            borderRadius: "25px",
            border: "2px solid #0072ff",
            outline: "none",
            fontSize: "16px",
          }}
        />
      </div>

      
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <button onClick={() => setCategory("All")}>
          All
        </button>{" "}
        <button onClick={() => setCategory("mobiles")}>
          Mobiles
        </button>{" "}
        <button onClick={() => setCategory("Accessories")}>
          Accessories
        </button>{" "}
        <button onClick={() => setCategory("Electronics")}>
          Electronics
        </button>
      </div>

  
      <h3
        style={{
          textAlign: "center",
          color: "#333",
        }}
      >
    
      </h3>

  
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <h2
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            No Products Found
          </h2>
        )}
      </div>
    </>
  );
}

export default Home;