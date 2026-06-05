import CategoryPage from "../components/CategoryPage";

function StubbyCoolers() {
  const products = [
    {
      name: "Formula RX8 Stubby Cooler - Black/White",
      price: "$10.00",
      image: "/images/products/black-white-stubby-cooler.png",
      description: "Formula RX8 Stubby Cooler - Black/White.",
      link: "https://vertexgraphics.com.au/products/formula-rx8-stubby-cooler-black-white",
    },
    {
      name: "Formula RX8 Stubby Cooler - Red/White",
      price: "$10.00",
      image: "/images/products/red-white-stubby-cooler.png",
      description: "Formula RX8 Stubby Cooler - Red/White.",
      link: "https://vertexgraphics.com.au/products/formula-rx8-stubby-cooler-red-white",
    },
     {
      name: "Formula RX8 Stubby Cooler - Black/gold",
      price: "$10.00",
      image: "/images/products/black-gold-stubby-cooler.png",
      description: "Formula RX8 Stubby Cooler - Black/Gold.",
      link: "https://vertexgraphics.com.au/products/formula-rx8-stubby-cooler-black-gold",
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