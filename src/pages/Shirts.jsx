import CategoryPage from "../components/CategoryPage";

function Shirts() {
  const products = [
    {
      name: "Classic Formula RX8 Black T-Shirt",
      price: "$40.00",
      image: "/images/products/classic-formula-rx8-black",
      description: "Classic Formula RX8 Black T-Shirt",
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