import CategoryPage from "../components/CategoryPage";

function Beanies() {
  const products = [
    {
      name: "Classic Logo Beanie",
      price: "$24.95",
      image: "/images/products/beanie-logo.jpg",
      description: "Embroidered Formula RX8 logo beanie.",
    },
    {
      name: "Trackside Beanie",
      price: "$24.95",
      image: "/images/products/beanie-trackside.jpg",
      description: "Perfect for early race mornings and winter rounds.",
    },
  ];

  return (
    <CategoryPage
      title="Beanies"
      description="Stay warm while supporting Formula RX8."
      products={products}
    />
  );
}

export default Beanies;