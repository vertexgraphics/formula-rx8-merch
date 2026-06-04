import CategoryPage from "../components/CategoryPage";

function Hoodies() {
  const products = [
    {
      name: "Logo Hoodie",
      price: "$69.95",
      image: "/images/products/hoodie-logo.jpg",
      description: "Heavyweight hoodie featuring Formula RX8 branding.",
    },
    {
      name: "Race Team Hoodie",
      price: "$74.95",
      image: "/images/products/hoodie-raceteam.jpg",
      description: "Premium hoodie inspired by race crew apparel.",
    },
  ];

  return (
    <CategoryPage
      title="Hoodies"
      description="Premium Formula RX8 hoodies for cooler race weekends."
      products={products}
    />
  );
}

export default Hoodies;