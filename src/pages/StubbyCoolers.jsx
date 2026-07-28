import { useEffect, useState } from "react";
import CategoryPage from "../components/CategoryPage";
import { getProductsByCollection } from "../shopify";

export default function StubbyCoolers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByCollection("coolers").then(setProducts).catch(console.error);
  }, []);

  return (
    <CategoryPage
      title="Stubby Coolers"
      description="Trackside essentials for every Formula RX8 supporter."
      products={products}    
      />
  );
}