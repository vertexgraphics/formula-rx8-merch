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
      image: "/images/shirts.png",
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
      image: "/images/hat.png",
      description: "Trackside headwear for Formula RX8 fans.",
    },
    {
      name: "Coolers",
      path: "/stubbycoolers",
      image: "/images/stubby-cooler.png",
      description: "Trackside essentials for every Formula RX8 supporter.",
    },  
        {
      name: "Beanies",
      path: "/beanies",
      image: "/images/beanie.png",
      description: "Built for early starts and cold pit lanes.",
    },  
  ];

  return (
    <main className="page">
      <section className="hero">

      </section>

      <Navbar />
        <h3>Orders to be delivered at the Formula RX8 Nationals (Sydney Motorsport Park, 17-18 July, 2026)</h3>
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