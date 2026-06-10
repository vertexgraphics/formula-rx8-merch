import { useEffect, useState } from "react";
import CategoryPage from "../components/CategoryPage";
import { getProductsByCollection } from "../shopify";

export default function Hoodies() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByCollection("hoodies").then(setProducts).catch(console.error);
  }, []);

  return (
    <CategoryPage
      title="Hoodies"
      description="Premium Formula RX8 hoodies for cooler race weekends."
      products={products}
    />
  );
}
