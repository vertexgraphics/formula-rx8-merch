import { useEffect, useState } from "react";
import CategoryPage from "../components/CategoryPage";
import { getRX8ProductsByType } from "../shopify";

export default function Hats() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getRX8ProductsByType("Hat").then(setProducts).catch(console.error);
  }, []);

  return (
    <CategoryPage
      title="Hats"
      description="Trackside headwear for Formula RX8 fans."
      products={products}    />
  );
}