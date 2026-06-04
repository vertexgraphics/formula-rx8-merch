import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

function Home() {
   useEffect(() => {
    document.title = "Formula RX8 Merchandise";
  }, []);
  const categories = [
    {
      name: "Shirts",
      path: "/shirts",
      image: "/images/shirts.jpg",
      description: "Everyday fanwear with a race-inspired edge.",
    },
    {
      name: "Hoodies",
      path: "/hoodies",
      image: "/images/hoodies.png",
      description: "Heavyweight layers for cold paddocks and late starts.",
    },
    {
      name: "Hats",
      path: "/hats",
      image: "/images/hat.jpg",
      description: "Trackside headwear for Formula RX8 fans.",
    },
    {
      name: "Coolers",
      path: "/stubbycoolers",
      image: "/images/stubby-cooler.jpg",
      description: "Trackside essentials for every Formula RX8 supporter.",
    },

  ];

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-content">
          <h1>
            <span className="hero-white">Formula RX8</span>
            <span className="hero-red">Fan Merch</span>
          </h1>

          <p>
            For fans of Australia’s only not-for-profit,
            nationally televised one-make Mazda RX8 race series.
          </p>
        </div>
      </section>

      <Navbar />

      <section className="categories">
        <p className="eyebrow">Shop By Category</p>

        <h2>Official Formula RX8 Merchandise</h2>

<div className="grid">
  {categories.map((item) => (
    <Link
      key={item.name}
      to={item.path}
      className="motorsport-card"
    >
      <div className="card-content">
        <h3>{item.name}</h3>
        <div className="card-line"></div>
        <p>{item.description}</p>
      </div>

      <img
        className="card-image"
        src={item.image}
        alt={item.name}
      />
    </Link>
  ))}
</div>
      </section>
    </main>
  );
}

export default Home;