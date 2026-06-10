import { useEffect, useState } from "react";
import CategoryPage from "../components/CategoryPage";
import { getProductsByCollection } from "../shopify";

export default function Shirts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByCollection("shirts").then(setProducts).catch(console.error);
  }, []);

  return (
    <CategoryPage
      title="Shirts"
      description="Everyday fanwear with a race-inspired edge."
      products={products}
    />
  );
}