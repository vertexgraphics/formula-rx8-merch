import CategoryPage from "../components/CategoryPage";

function Shirts() {
  const products = [
    {
      name: "Classic Formula RX8 Black T-Shirt",
      price: "$40.00",
      image: "/images/products/classic-formula-rx8-black.png",
      description: "Classic Formula RX8 Black T-Shirt",
      link: "https://vertexgraphics.com.au/products/classic-formula-rx8-black-t-shirt",
    },
    {
      name: "Classic Formula RX8 Red T-Shirt",
      price: "$40.00",
      image: "/images/products/classic-formula-rx8-red.png",
      description: "Classic Formula RX8 Red T-Shirt.",
      link: "https://vertexgraphics.com.au/products/classic-formula-rx8-red-t-shirt",
    },

    {
      name: "Special Edition Mirror Gold Formula RX8 Black T-Shirt",
      price: "$45.00",
      image: "/images/products/special-edition-formula-rx8-gold.png",
      description: "Special Edition Mirror Gold Formula RX8 Black T-Shirt",
      link: "https://vertexgraphics.com.au/products/special-edition-mirror-gold-formula-rx8-black-t-shirt",
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