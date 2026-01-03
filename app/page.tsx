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

  // Smart preloading system
  const [shuffledIndices, setShuffledIndices] = useState<number[]>(() => {
    const indices = Array.from({ length: products.length }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });
  const [currentShuffleIndex, setCurrentShuffleIndex] = useState(0);
  const [preloadedIndices, setPreloadedIndices] = useState<Set<number>>(new Set());

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

  // Smart preloading function
  const preloadProducts = (startIndex: number, count: number = 3) => {
    const newPreloaded = new Set(preloadedIndices);
    for (let i = 0; i < count; i++) {
      const productIndex = shuffledIndices[startIndex + i];
      if (productIndex !== undefined && !newPreloaded.has(productIndex)) {
        const img = new Image();
        img.src = products[productIndex].imageUrl;
        newPreloaded.add(productIndex);
      }
    }
    setPreloadedIndices(newPreloaded);
  };

  const handleSpin = (skipAnimation = false) => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Check if we've gone through all products, if so reshuffle
    let productIdx: number;
    let nextShuffleIndex = currentShuffleIndex;

    if (currentShuffleIndex >= shuffledIndices.length) {
      // Reshuffle and reset
      const newShuffledIndices = [...shuffledIndices];
      for (let i = newShuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newShuffledIndices[i], newShuffledIndices[j]] = [newShuffledIndices[j], newShuffledIndices[i]];
      }
      setShuffledIndices(newShuffledIndices);
      setPreloadedIndices(new Set()); // Reset preloaded set
      productIdx = newShuffledIndices[0];
      nextShuffleIndex = 1;
    } else {
      // Get next product from current shuffled order
      productIdx = shuffledIndices[currentShuffleIndex];
      nextShuffleIndex = currentShuffleIndex + 1;
    }

    // Preload next 3 products in the background
    preloadProducts(nextShuffleIndex, 3);

    const segmentAngle = 360 / products.length;
    const randomExtraTurns = 4 + Math.random() * 2;
    const newRotation = rotation + randomExtraTurns * 360 + (segmentAngle * productIdx + segmentAngle / 2);
    setRotation(newRotation);

    const showResult = () => {
      setSelectedProduct(products[productIdx]!);
      setCurrentShuffleIndex(nextShuffleIndex);
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
          {/* Description Text */}
          {!selectedProduct && (
            <div className={styles.descriptionText}>
              Not sure what to buy for your loved one or friend? Looking for a random product to buy?
              This Random Gift Generator will generate a random Amazon product to help inspire your purchase!
            </div>
          )}

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
