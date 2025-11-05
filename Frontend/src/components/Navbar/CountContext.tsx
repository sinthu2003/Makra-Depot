import { createContext, useState, useEffect } from "react";

export const CountContext = createContext();

export const CountProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);

  // Load initial values from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedWish = JSON.parse(localStorage.getItem("wish")) || [];
    setCartCount(savedCart.length);
    setWishCount(savedWish.length);
  }, []);

  // Save updates to localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length !== cartCount) {
      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount(cart.length);
    }
  }, [cartCount]);

  useEffect(() => {
    const wish = JSON.parse(localStorage.getItem("wish")) || [];
    if (wish.length !== wishCount) {
      localStorage.setItem("wish", JSON.stringify(wish));
      setWishCount(wish.length);
    }
  }, [wishCount]);

  return (
    <CountContext.Provider value={{ cartCount, setCartCount, wishCount, setWishCount }}>
      {children}
    </CountContext.Provider>
  );
};
