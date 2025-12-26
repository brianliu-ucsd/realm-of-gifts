import React from "react";

type Product = {
  title: string;
  price: number;
  imageUrl: string;
  affiliateUrl: string;
  category: string;
};

type Props = {
  product: Product;
};

const CARD_WIDTH = 600;
const CARD_HEIGHT = 400; // fixed card height

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        border: "1px solid #ccc",
        borderRadius: 8,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* Image */}
      <div
        style={{
          width: "100%",
          flexShrink: 0,
          flexGrow: 0,
          height: "50%", // image takes 50% of card
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 4,
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Title */}
      <h2
        style={{
          margin: "8px 0 4px 0",
          fontSize: "1.1rem",
          fontWeight: 600,
          textAlign: "center",
          display: "-webkit-box",
          WebkitLineClamp: 2, // max 2 lines
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          flexShrink: 0,
        }}
        title={product.title} // tooltip for full title
      >
        {product.title}
      </h2>

      {/* Price */}
      <p
        style={{
          margin: "4px 0",
          fontWeight: "bold",
          fontSize: "1.05rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          color: "green",
          flexShrink: 0,
        }}
      >
        ${product.price.toFixed(2)}
      </p>

      {/* Button */}
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          width: "95%",
          textAlign: "center",
          padding: "10px 0",
          fontSize: "1.1rem",
          fontWeight: "600",
          backgroundColor: "#FF9900",
          color: "white",
          borderRadius: 4,
          textDecoration: "none",
          flexShrink: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        View on Amazon
      </a>
    </div>
  );
};

export default ProductCard;
