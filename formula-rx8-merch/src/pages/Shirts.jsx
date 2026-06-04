import CategoryPage from "../components/CategoryPage";

function Shirts() {
  const products = [
    {
      name: "RX8 Logo Tee",
      price: "$39.95",
      image: "/images/products/shirt-logo.jpg",
      description: "Classic Formula RX8 supporter tee.",
    },
    {
      name: "Race Day Tee",
      price: "$39.95",
      image: "/images/products/shirt-race-day.jpg",
      description: "Track-inspired fanwear for race weekends.",
    },
  ];

  return (
    <CategoryPage
      title="Shirts"
      description="Official Formula RX8 shirts for fans, crews and trackside weekends."
      products={products}
    />
  );
}

export default Shirts;