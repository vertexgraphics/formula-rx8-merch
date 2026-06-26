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
        <h3>Orders to be delivered at the Formula RX8 Nationals (Sydney Motorsport Park, 17-18 July, 2026)</h3>
      <section className="categories">
        <p className="eyebrow">Shop {title}</p>
        <h2>{title}</h2>

        <div className="grid">
{products.map((product) => (
  <a
    key={product.id}
href={`https://${import.meta.env.VITE_SHOPIFY_PUBLIC_DOMAIN}/products/${product.handle}`}
    className="motorsport-card product-tile"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="card-content">
      <h3>{product.title}</h3>
      <div className="card-line"></div>
      <p>{product.description}</p>
      <p className="price">
        ${Number(product.variants.edges[0].node.price.amount).toFixed(2)}
      </p>
    </div>

    {product.featuredImage?.url && (
      <img
        src={product.featuredImage.url}
        alt={product.featuredImage.altText || product.title}
        className="card-image"
      />
    )}
  </a>
))}
        </div>
      </section>
    </main>
  );
}

export default CategoryPage;