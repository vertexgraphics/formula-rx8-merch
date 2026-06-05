import CategoryPage from "../components/CategoryPage";

function Hats() {
  const products = [
    {
      name: "Black Formula RX8 Trucker Cap",
      price: "$25.00",
      image: "/images/products/black-trucker-cap.webp",
      description: "Black Formula RX8 Trucker Cap.",
      link: "https://vertexgraphics.com.au/products/black-formula-rx8-trucker-cap",
    },
    {
      name: "Red Formula RX8 Trucker Cap",
      price: "$25.00",
      image: "/images/products/red-trucker-cap.webp",
      description: "Red Formula RX8 Trucker Cap.",
      link: "https://vertexgraphics.com.au/products/red-formula-rx8-trucker-cap",
    },
  ];

  return (
    <CategoryPage
      title="Hats"
      description="Trackside headwear for Formula RX8 fans."
      products={products}
    />
  );
}

export default Hats;