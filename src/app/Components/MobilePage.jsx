"use client";

import { useEffect, useState } from "react";

const MobilePage = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  // 🔹 Sab products load karo
  useEffect(() => {
    fetch("https://dummyjson.com/products/category/smartphones")
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);

        // unique brands nikal lo
        const uniqueBrands = [...new Set(data.products.map(p => p.brand))];
        setBrands(uniqueBrands);
      });
  }, []);

  // 🔹 Filtered products
  const filteredProducts = selectedBrand
    ? products.filter(p => p.brand === selectedBrand)
    : products;

  return (
    <div style={{ padding: "20px" }}>
      
      {/* 🔥 Brand Navigation */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "15px",
        marginBottom: "30px"
      }}>
        {brands.map((brand, index) => (
          <div
            key={index}
            onClick={() => setSelectedBrand(brand)}
            style={{
              textAlign: "center",
              cursor: "pointer",
              padding: "10px",
              borderRadius: "10px",
              background: selectedBrand === brand ? "#dbeafe" : "#f5f5f5"
            }}
          >
            <p>{brand}</p>
          </div>
        ))}
      </div>

      {/* 🔥 Products Show */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px"
      }}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center"
          }}>
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
            <h4>{item.title}</h4>
            <p>₹ {item.price}</p>
            <p style={{ color: "green" }}>{item.brand}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MobilePage;