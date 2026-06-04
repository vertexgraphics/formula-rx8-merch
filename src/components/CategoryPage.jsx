import { useEffect } from "react";
import Navbar from "./Navbar";

function CategoryPage({ title, description, products }) {
   useEffect(() => {
  document.title = `${title} | Formula RX8 Official Merchandise`;
}, [title]);

  return (
    <main className="page">
      <section className="hero category-hero">
        <div className="hero-content">
          <h1>
            <span className="hero-white">Formula RX8</span>
            <span className="hero-red">{title}</span>
          </h1>

          <p>{description}</p>
        </div>
      </section>

      <Navbar />

      <section className="categories">
        <p className="eyebrow">Shop {title}</p>
        <h2>{title}</h2>

        <div className="grid">
          {products.map((product) => (
            <a
              key={product.name}
              href={product.link || "#"}
              className="motorsport-card product-tile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="card-content">
                <h3>{product.name}</h3>
                <div className="card-line"></div>
                <p>{product.description}</p>
                <p className="price">{product.price}</p>
              </div>

              <img
                className="card-image"
                src={product.image}
                alt={product.name}
              />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CategoryPage;