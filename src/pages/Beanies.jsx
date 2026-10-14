import { useEffect, useState } from "react";
import CategoryPage from "../components/CategoryPage";
import { getRX8ProductsByType } from "../shopify";

export default function Beanies() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getRX8ProductsByType("Beanie").then(setProducts).catch(console.error);
  }, []);

  return (
    <CategoryPage
      title="Beanies"
      description="Stay warm while supporting Formula RX8."
      products={products}
      />
  );
}