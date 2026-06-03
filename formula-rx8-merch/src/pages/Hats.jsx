import CategoryPage from "../components/CategoryPage";

function Hats() {
  const products = [
    {
      name: "Logo Cap",
      price: "$29.95",
      image: "/images/products/hat-logo.jpg",
      description: "Classic Formula RX8 embroidered cap.",
    },
    {
      name: "Pit Lane Cap",
      price: "$29.95",
      image: "/images/products/hat-pitlane.jpg",
      description: "Motorsport styling inspired by the paddock.",
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