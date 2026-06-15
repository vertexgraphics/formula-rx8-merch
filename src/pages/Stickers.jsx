import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import PageLayout from "../components/PageLayout";
import {
  getProductsByCollectionHandle,
  createShopifyCart,
} from "../shopify";

function Stickers() {
  const { user, loading } = useAuth();

  const [approvedLogos, setApprovedLogos] = useState([]);
  const [shopifyStickerProducts, setShopifyStickerProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Stickers | Formula RX8 Merch";
  }, []);

  useEffect(() => {
    const fetchApprovedLogos = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("approved_logos")
        .select("*")
        .eq("status", "approved")
        .order("logo_name", { ascending: true });

      if (error) {
        setMessage(error.message);
        return;
      }

      const logosWithPreviews = await Promise.all(
        (data || []).map(async (logo) => {
          const { data: signedUrlData } = await supabase.storage
            .from("logos")
            .createSignedUrl(logo.logo_file_path, 300);

          return {
            ...logo,
            previewUrl: signedUrlData?.signedUrl || null,
          };
        })
      );

      setApprovedLogos(logosWithPreviews);
    };

    fetchApprovedLogos();
  }, [user]);

  useEffect(() => {
    const fetchStickerProducts = async () => {
      try {
        const products = await getProductsByCollectionHandle("stickers");
        console.log("Sticker products:", products);
        setShopifyStickerProducts(products);
      } catch (error) {
        console.error("Sticker collection error:", error);
        setMessage("Could not load sticker products from Shopify.");
      }
    };

    fetchStickerProducts();
  }, []);

  const findSelectedVariant = () => {
    for (const product of shopifyStickerProducts) {
      for (const { node: variant } of product.variants.edges) {
        if (variant.id === selectedProduct) {
          return {
            product,
            variant,
          };
        }
      }
    }

    return null;
  };

  const handleAddItem = () => {
    setMessage("");

    if (!selectedProduct) {
      setMessage("Please select a sticker product.");
      return;
    }

    if (!selectedLogo) {
      setMessage("Please select an approved logo.");
      return;
    }

    if (quantity < 1) {
      setMessage("Quantity must be at least 1.");
      return;
    }

    const selected = findSelectedVariant();

    if (!selected) {
      setMessage("Selected sticker product could not be found.");
      return;
    }

    const logo = approvedLogos.find((item) => item.id === selectedLogo);

    if (!logo) {
      setMessage("Selected logo could not be found.");
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),

      variantId: selected.variant.id,
      productTitle: selected.product.title,
      variantTitle: selected.variant.title,
      productPrice: selected.variant.price.amount,
      currencyCode: selected.variant.price.currencyCode,

      logoId: logo.id,
      logoName: logo.logo_name,
      logoPreviewUrl: logo.previewUrl,

      quantity,
    };

    setOrderItems((current) => [...current, newItem]);

    setSelectedProduct("");
    setSelectedLogo("");
    setQuantity(1);
  };

  const handleRemoveItem = (itemId) => {
    setOrderItems((current) => current.filter((item) => item.id !== itemId));
  };

const handleCheckout = async () => {
  setMessage("");

  if (orderItems.length === 0) {
    setMessage("Please add at least one sticker item before checkout.");
    return;
  }

  try {
    const lines = orderItems.map((item) => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
      attributes: [
        {
          key: "Approved Logo ID",
          value: item.logoId,
        },
        {
          key: "Approved Logo Name",
          value: item.logoName,
        },
        {
          key: "Logo Source",
          value: "Approved Supabase Logo",
        },
      ],
    }));

    const cart = await createShopifyCart(lines);

    window.location.href = cart.checkoutUrl;
  } catch (error) {
    console.error("Checkout error:", error);
    setMessage(error.message || "Could not create Shopify checkout.");
  }
};

  if (loading) {
    return <div className="page">Loading...</div>;
  }

const selectedProductDetails = findSelectedVariant();
  
  return (
    <PageLayout hero={<div className="auth-hero" />}>
      <div className="account-wrap">
        <div className="auth-card account-card">
          <h2>Custom Stickers</h2>
          <p>
            Build a sticker order using your approved logos. You can add
            multiple sticker sizes and logos before checkout.
          </p>
        </div>

        {!user ? (
          <div className="auth-card account-card">
            <h2>Login Required</h2>
            <p>Please login to view your approved logos and order stickers.</p>
            <Link to="/login" className="account-action">
              Login
            </Link>
          </div>
        ) : (
          <>
            <div className="auth-card account-card">
              <h2>Add Sticker Item</h2>

              <label>Sticker Product</label>
              <select
                className="auth-select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Select sticker product</option>

                {shopifyStickerProducts.flatMap((product) =>
                  product.variants.edges.map(({ node: variant }) => (
                    <option
  key={variant.id}
  value={variant.id}
  disabled={!variant.availableForSale}
>
  {product.title}
  {variant.title !== "Default Title"
    ? ` - ${variant.title}`
    : ""}
  {" - $"}
  {Number(variant.price.amount).toFixed(2)}
</option>
                  ))
                )}
              </select>
              
{selectedProductDetails?.product && (
  <div className="selected-product-preview">

  <div className="selected-product-gallery">
    {selectedProductDetails.product.images?.edges?.map(
      ({ node }, index) => (
        <img
          key={index}
          src={node.url}
          alt={
            node.altText ||
            selectedProductDetails.product.title
          }
        />
      )
    )}
  </div>

  <div>
    <h3>{selectedProductDetails.product.title}</h3>

    <p>
      {selectedProductDetails.variant.title !== "Default Title"
        ? selectedProductDetails.variant.title
        : "Standard"}
    </p>

    <p>
      $
      {Number(
        selectedProductDetails.variant.price.amount
      ).toFixed(2)}
    </p>
  </div>

</div>
)}

              <label>Approved Logo</label>

              {approvedLogos.length === 0 ? (
                <div className="empty-logo-state">
                  <p>You do not have any approved logos yet.</p>
                  <Link to="/stickers/upload-logo" className="account-action">
                    Upload New Logo
                  </Link>
                </div>
              ) : (
                <div className="logo-card-grid">
                  {approvedLogos.map((logo) => (
                    <button
                      type="button"
                      key={logo.id}
                      className={
                        selectedLogo === logo.id
                          ? "logo-select-card selected"
                          : "logo-select-card"
                      }
                      onClick={() => setSelectedLogo(logo.id)}
                    >
                      <div className="logo-thumb">
                        {logo.previewUrl ? (
                          <img src={logo.previewUrl} alt={logo.logo_name} />
                        ) : (
                          <span>No preview</span>
                        )}
                      </div>

                      <h3>{logo.logo_name}</h3>

                      {selectedLogo === logo.id && (
                        <span className="selected-badge">Selected</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />

              <button onClick={handleAddItem}>Add to Sticker Order</button>

              {message && <p className="auth-message">{message}</p>}
            </div>

            <div className="auth-card account-card">
              <h2>Current Sticker Order</h2>

              {orderItems.length === 0 ? (
                <p>No sticker items added yet.</p>
              ) : (
                <div className="sticker-order-list">
                  {orderItems.map((item) => (
                    <div className="sticker-order-item" key={item.id}>
                      <div className="sticker-order-logo">
                        {item.logoPreviewUrl ? (
                          <img src={item.logoPreviewUrl} alt={item.logoName} />
                        ) : (
                          <span>No preview</span>
                        )}
                      </div>

                      <div className="sticker-order-details">
                        <h3>{item.productTitle}</h3>
                        <p>{item.variantTitle}</p>
                        <p>
                          <strong>Logo:</strong> {item.logoName}
                        </p>
                        <p>
                          <strong>Qty:</strong> {item.quantity}
                        </p>
                        <p>
                          <strong>Price:</strong> ${item.productPrice}
                        </p>
                      </div>

                      <button
                        className="delete-logo-button"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button className="account-action" onClick={handleCheckout}>
                    Continue to Checkout
                  </button>
                </div>
              )}
            </div>

            <div className="auth-card account-card">
              <h2>Need to Use a New Logo?</h2>
              <p>
                Upload a new logo for approval before using it on a sticker
                order.
              </p>

              <Link to="/stickers/upload-logo" className="account-action">
                Upload New Logo
              </Link>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}

export default Stickers;