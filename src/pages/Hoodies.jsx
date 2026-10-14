import { useEffect, useState } from "react";
import CategoryPage from "../components/CategoryPage";
import { getRX8ProductsByType } from "../shopify";

export default function Hoodies() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getRX8ProductsByType("Hoodie").then(setProducts).catch(console.error);
  }, []);

  return (
    <CategoryPage
      title="Hoodies"
      description="Premium Formula RX8 hoodies for cooler race weekends."
      products={products}
    />
  );
}
