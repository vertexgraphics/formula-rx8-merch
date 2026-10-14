import { useEffect, useState } from "react";
import CategoryPage from "../components/CategoryPage";
import { getRX8ProductsByType } from "../shopify";

export default function Shirts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getRX8ProductsByType("T-Shirt").then(setProducts).catch(console.error);
  }, []);

  return (
    <CategoryPage
      title="Shirts"
      description="Everyday fanwear with a race-inspired edge."
      products={products}
    />
  );
}