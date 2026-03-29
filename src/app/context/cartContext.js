"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [buyNowItem, setBuyNowItemState] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart-items");
    const savedBuyNowItem = localStorage.getItem("buy-now-item");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    if (savedBuyNowItem) {
      setBuyNowItemState(JSON.parse(savedBuyNowItem));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (buyNowItem) {
      localStorage.setItem("buy-now-item", JSON.stringify(buyNowItem));
    } else {
      localStorage.removeItem("buy-now-item");
    }
  }, [buyNowItem]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: (item.qty || 1) + (product.qty || 1) }
            : item
        );
      }

      return [...prev, { ...product, qty: product.qty || 1 }];
    });
  };

  const setBuyNowItem = (product) => {
    setBuyNowItemState({ ...product, qty: product.qty || 1 });
  };

  const updateQuantity = (id, type) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;

          const nextQty =
            type === "increase" ? (item.qty || 1) + 1 : (item.qty || 1) - 1;

          return { ...item, qty: nextQty };
        })
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearBuyNowItem = () => {
    setBuyNowItemState(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        buyNowItem,
        addToCart,
        setBuyNowItem,
        updateQuantity,
        removeFromCart,
        clearCart,
        clearBuyNowItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
