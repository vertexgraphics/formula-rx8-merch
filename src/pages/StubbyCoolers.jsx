import { useEffect, useState } from "react";
import CategoryPage from "../components/CategoryPage";
import { getRX8ProductsByType } from "../shopify";

export default function StubbyCoolers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getRX8ProductsByType("Stubbie Cooler").then(setProducts).catch(console.error);
  }, []);

  return (
    <CategoryPage
      title="Stubby Coolers"
      description="Trackside essentials for every Formula RX8 supporter."
      products={products}    
      />
  );
}