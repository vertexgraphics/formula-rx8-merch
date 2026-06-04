function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <div className="product-card" key={index}>
          <img src={product.image} alt={product.name} />

          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.price}</p>

            <button>View Product</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;