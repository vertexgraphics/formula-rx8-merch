import "./App.css";

const categories = [
  {
    name: "Shirts",
    image: "/images/shirts.jpg",
    description: "Everyday fanwear with a race-inspired edge.",
  },
  {
    name: "Hoodies",
    image: "/images/hoodies.jpg",
    description: "Heavyweight layers for cold paddocks and late starts.",
  },
  {
    name: "Beanies",
    image: "/images/beanie.jpg",
    description: "Small accessory, big motorsport identity.",
  },
  {
    name: "Stubby Coolers",
    image: "/images/stubby-cooler.jpg",
    description: "Trackside essential with room for bold graphics.",
  },
  {
    name: "Hats",
    image: "/images/hat.jpg",
    description: "Easy staple for fans who want subtle branding.",
  },
  {
    name: "Support The Series",
    image: "/images/support-the-series.jpg",
    description:
      "Every purchase helps keep RX8 racing alive.",
  },
];

function App() {
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

      <section className="categories">
        <p className="eyebrow">Shop By Category</p>

        <h2>Official Formula RX8 Merchandise</h2>

        <div className="grid">
          {categories.map((item) => (
            <div
  key={item.name}
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
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;