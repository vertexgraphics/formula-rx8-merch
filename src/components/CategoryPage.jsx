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
        </div>
      </section>

      <Navbar />
        <h3>Orders to be delivered at the Formula RX8 Nationals (One Raceway, 20-21 June, 2026)</h3>
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