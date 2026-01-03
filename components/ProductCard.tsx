import React from "react";
import styles from "../styles/ProductCard.module.css";
import Image from "next/image";

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

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles.imageContainer}>
        <img
          src={product.imageUrl}
          width={500}
          height={500}
          alt={product.title}
          className={styles.image}
        />
      </div>

      {/* Title */}
      <h2
        className={styles.title}
        title={product.title} // tooltip for full title
      >
        {product.title}
      </h2>

      {/* Price */}
      <p className={styles.price}>
        ${product.price.toFixed(2)}
      </p>

      {/* Button */}
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        View on Amazon
      </a>
    </div>
  );
};

export default ProductCard;
