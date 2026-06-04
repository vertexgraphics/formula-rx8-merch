import CategoryPage from "../components/CategoryPage";

function Hoodies() {
  const products = [
    {
      name: "Classic Formula RX8 Black/White Hoodie",
      price: "$55.00",
      image: "/images/products/formula-rx8-hoodie-black-white.png",
      description: "Classic Formula RX8 Black/White Hoodie",
      link: "https://vertexgraphics.com.au/products/classic-formula-rx8-black-white-hoody",
    },
{
      name: "Special Edition Mirror Gold Formula RX8 Black/Gold Hoodie",
      price: "$60.00",
      image: "/images/products/formula-rx8-hoodie-black-gold.png",
      description: "Classic Formula RX8 Black/Gold Hoodie",
      link: "https://vertexgraphics.com.au/products/classic-formula-rx8-black-gold-hoodie",
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