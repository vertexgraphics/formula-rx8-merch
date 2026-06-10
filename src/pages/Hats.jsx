import { useEffect, useState } from "react";
import CategoryPage from "../components/CategoryPage";
import { getProductsByCollection } from "../shopify";

export default function Hats() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByCollection("hats").then(setProducts).catch(console.error);
  }, []);

  return (
    <CategoryPage
      title="Hats"
      description="Trackside headwear for Formula RX8 fans."
      products={products}    />
  );
}