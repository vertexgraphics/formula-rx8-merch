import CategoryPage from "../components/CategoryPage";

function Hats() {
  const products = [
    {
      name: "Formula RX8 Trucker Cap - Black/White",
      price: "$25.00",
      image: "/images/products/black-white-trucker-cap.png",
      description: "Formula RX8 Trucker Cap - Black/White.",
      link: "https://vertexgraphics.com.au/products/formula-rx8-trucker-cap-black-white",
    },
    {
      name: "Formula RX8 Trucker Cap - Black/Black",
      price: "$25.00",
      image: "/images/products/black-black-trucker-cap.png",
      description: "Formula RX8 Trucker Cap - Black/Black.",
      link: "https://vertexgraphics.com.au/products/formula-rx8-trucker-cap-black-black",
    },
        {
      name: "Formula RX8 Trucker Cap - Black/Gold",
      price: "$25.00",
      image: "/images/products/black-gold-trucker-cap.png",
      description: "Formula RX8 Trucker Cap - Black/Gold.",
      link: "https://vertexgraphics.com.au/products/formula-rx8-trucker-cap-black-gold",
    },
        {
      name: "Formula RX8 Trucker Cap - Red/White",
      price: "$25.00",
      image: "/images/products/red-white-trucker-cap.png",
      description: "Formula RX8 Trucker Cap - Red/White.",
      link: "https://vertexgraphics.com.au/products/formula-rx8-trucker-cap-red-white",
    },
    {
      name: "Formula RX8 Trucker Cap - Red/Black",
      price: "$25.00",
      image: "/images/products/red-black-trucker-cap.png",
      description: "Formula RX8 Trucker Cap - Red/Black.",
      link: "https://vertexgraphics.com.au/products/formula-rx8-trucker-cap-red-black",
    },
        {
      name: "Formula RX8 Trucker Cap - Red/Gold",
      price: "$25.00",
      image: "/images/products/red-gold-trucker-cap.png",
      description: "Formula RX8 Trucker Cap - Red/Gold.",
      link: "https://vertexgraphics.com.au/products/formula-rx8-trucker-cap-red-gold",
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