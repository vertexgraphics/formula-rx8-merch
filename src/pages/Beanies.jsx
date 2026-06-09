import CategoryPage from "../components/CategoryPage";

function Beanies() {
  const products = [
    {
      name: "Formula RX8 Beanie - Red/Black",
      price: "$25.00",
      image: "/images/products/red-black-beanie.png",
      description: "Formula RX8 Beanie - Red/Black",
      link: "https://vertexgraphics.com.au/products/formula-rx8-beanie-red-black",
    },
    {
      name: "Formula RX8 Beanie - Red/White",
      price: "$25.00",
      image: "/images/products/red-white-beanie.png",
      description: "Formula RX8 Beanie - Red/White",
      link: "https://vertexgraphics.com.au/products/formula-rx8-beanie-red-white",
    },
    {
      name: "Formula RX8 Beanie - Red/Gold",
      price: "$25.00",
      image: "/images/products/red-gold-beanie.png",
      description: "Formula RX8 Beanie - Red/Gold",
      link: "https://vertexgraphics.com.au/products/formula-rx8-beanie-red-gold",
    },
        {
      name: "Formula RX8 Beanie - Black/Black",
      price: "$25.00",
      image: "/images/products/black-black-beanie.png",
      description: "Formula RX8 Beanie - Black/Black",
      link: "https://vertexgraphics.com.au/products/formula-rx8-beanie-black-black",
    },
    {
      name: "Formula RX8 Beanie - Black/White",
      price: "$25.00",
      image: "/images/products/black-white-beanie.png",
      description: "Formula RX8 Beanie - Black/White",
      link: "https://vertexgraphics.com.au/products/formula-rx8-beanie-black-white",
    },
        {
      name: "Formula RX8 Beanie - Black/Gold",
      price: "$25.00",
      image: "/images/products/black-gold-beanie.png",
      description: "Formula RX8 Beanie - Black/Gold",
      link: "https://vertexgraphics.com.au/products/formula-rx8-beanie-black-gold",
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