import CategoryPage from "../components/CategoryPage";

function StubbyCoolers() {
  const products = [
    {
      name: "Classic Stubby Cooler",
      price: "$9.95",
      image: "/images/products/stubby-classic.jpg",
      description: "Keep your drink cold while supporting the series.",
    },
    {
      name: "Race Day Stubby Cooler",
      price: "$9.95",
      image: "/images/products/stubby-raceday.jpg",
      description: "Perfect for race meetings and BBQ weekends.",
    },
  ];

  return (
    <CategoryPage
      title="Coolers"
      description="Trackside essentials for every Formula RX8 supporter."
      products={products}
    />
  );
}

export default StubbyCoolers;