"use client"

import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import Confetti from "react-confetti";
import styles from "../styles/Page.module.css";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [numPieces, setNumPieces] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [availableIndices, setAvailableIndices] = useState<number[]>(() =>
    Array.from({ length: products.length }, (_, i) => i)
  );

  // Detect mobile/tablet screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // Tablet breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      setNumPieces(250);
      const steps = [150, 80, 0];
      steps.forEach((n, i) => setTimeout(() => setNumPieces(n), (i + 1) * 1000));
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [showConfetti]);

  const handleSpin = (skipAnimation = false) => {
    if (isSpinning) return;
    setIsSpinning(true);

    let pool = [...availableIndices];
    const randomIdxInPool = Math.floor(Math.random() * pool.length);
    const productIdx = pool[randomIdxInPool]!;

    const lastIdx = pool.length - 1;
    [pool[randomIdxInPool], pool[lastIdx]] = [pool[lastIdx]!, pool[randomIdxInPool]!];
    pool = pool.slice(0, lastIdx);

    if (pool.length === 0) {
      pool = new Array(products.length - 1);
      let j = 0;
        for (let i = 0; i < products.length; i++) {
          if (i !== productIdx) pool[j++] = i;
        }
    }

    setAvailableIndices(pool);

    const segmentAngle = 360 / products.length;
    const randomExtraTurns = 4 + Math.random() * 2;
    const newRotation = rotation + randomExtraTurns * 360 + (segmentAngle * productIdx + segmentAngle / 2);
    setRotation(newRotation);

    const showResult = () => {
      setSelectedProduct(products[productIdx]!);
      setIsSpinning(false);
      setShowConfetti(true);
    };

    if (skipAnimation) {
      // Instant result for mobile "Spin Again"
      showResult();
    } else {
      // Full animation for initial wheel spin
      setTimeout(showResult, 3000);
    }
  };

  return (
    <div className={styles.fullHeightContainer}>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight - 85} // Match container height
          numberOfPieces={numPieces}
          gravity={0.4}
          recycle={false}
          className={styles.confetti}
        />
      )}

      {/* MAIN CONTENT */}
      {isMobile && selectedProduct ? (
        // Mobile/Tablet: Single view after spin
        <main className={styles.mainContent}>
          <div className={styles.productSection}>
            <ProductCard product={selectedProduct} />
          </div>
          <button
            onClick={() => handleSpin(true)}
            disabled={isSpinning}
            className={styles.spinButton}
          >
            {isSpinning ? "Spinning..." : "Spin Again"}
          </button>
        </main>
      ) : (
        // Desktop or before spin: Show wheel with optional card
        <main className={selectedProduct ? styles.mainContentHorizontal : styles.mainContent}>
          {/* Left side: Wheel + Button */}
          <div className={styles.wheelSection}>
            <div className={styles.wheelContainer}>
              <img
                src="/images/wheel.png"
                fetchPriority="high"
                alt="Wheel of Gifts"
                className={`${styles.wheel} ${isSpinning ? styles.wheelSpinning : ''}`}
                style={{ transform: `rotate(${rotation}deg)` }}
              />
              <img
                src="/images/pointer.png"
                fetchPriority="high"
                alt="Wheel Pointer"
                className={styles.pointer}
              />
            </div>

            <button
              onClick={() => handleSpin(false)}
              disabled={isSpinning}
              className={styles.spinButton}
            >
              {isSpinning ? "Spinning..." : "Spin the Wheel!"}
            </button>
          </div>

          {/* Right side: Product Card (desktop only) */}
          {selectedProduct && !isMobile && (
            <div className={styles.productSection}>
              <ProductCard product={selectedProduct} />
            </div>
          )}
        </main>
      )}

    </div>
  );
}
