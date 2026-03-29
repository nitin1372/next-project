"use client";
import React from "react";

const AdBanner = () => {
  return (
    <>
    <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
      
      <div
        style={{
          width: "90%",
          maxWidth: "900px",
          borderRadius: "12px",
          overflow: "hidden"
        }}
      >
        <img
          src="/advertisement/add1.webp"
          alt="ad"
          style={{
            width: "100%",
            height: "auto",
            display: "block"
          }}
        />
      </div>


    </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
      
      <div
        style={{
          width: "90%",
          maxWidth: "900px",
          borderRadius: "12px",
          overflow: "hidden"
        }}
      >
        <img
          src="/advertisement/add2.webp"
          alt="ad"
          style={{
            width: "100%",
            height: "auto",
            display: "block"
          }}
        />
      </div>
      


    </div>

    
</>
  );
};

export default AdBanner;