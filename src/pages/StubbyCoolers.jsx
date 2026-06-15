import { useEffect, useState } from "react";
import CategoryPage from "../components/CategoryPage";
import { getProductsByCollection } from "../shopify";

export default function StubbyCoolers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByCollection("coolers").then(setProducts).catch(console.error);
      document.title = "Stubby Coolers | Formula RX8 Merch";

  }, []);

  return (
    <CategoryPage
      title="Coolers"
      description="Trackside essentials for every Formula RX8 supporter."
      products={products}    
      />
  );
}