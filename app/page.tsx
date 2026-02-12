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
  const [spinJustFinished, setSpinJustFinished] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

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

  // Detect mobile screens
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
    setSpinJustFinished(false);

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
      setSpinJustFinished(true);
      setTimeout(() => setSpinJustFinished(false), 700);
    };

    if (skipAnimation) {
      showResult();
    } else {
      setTimeout(showResult, 3000);
    }
  };

  // Determine classes
  const containerClasses = [
    styles.wheelContainer,
    !isSpinning && !selectedProduct ? styles.wheelIdle : '',
  ].filter(Boolean).join(' ');

  const wheelClasses = [
    styles.wheel,
    isSpinning ? styles.wheelSpinning : '',
  ].filter(Boolean).join(' ');

  const pointerClasses = [
    styles.pointer,
    spinJustFinished ? styles.pointerBounce : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.fullHeightContainer}>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={numPieces}
          gravity={0.4}
          recycle={false}
          className={styles.confetti}
        />
      )}

      {/* Filter Sidebar */}
      <aside className={`${styles.filterSidebar} ${filterOpen ? styles.filterSidebarOpen : ''}`}>
        <button
          className={styles.sidebarClose}
          onClick={() => setFilterOpen(false)}
          aria-label="Close filters"
        >
          &times;
        </button>
        <h2 className={styles.sidebarTitle}>Filters</h2>
        <p className={styles.sidebarPlaceholder}>
          Filter by age range, gender, interests, and price range. Coming soon!
        </p>
      </aside>

      {/* Backdrop */}
      <div
        className={`${styles.filterBackdrop} ${filterOpen ? styles.filterBackdropVisible : ''}`}
        onClick={() => setFilterOpen(false)}
      />

      {/* MAIN CONTENT */}
      {isMobile && selectedProduct ? (
        // Mobile: Single view after spin
        <main className={styles.mainContent}>
          <div className={styles.productSection}>
            <ProductCard product={selectedProduct} />
          </div>
          <div className={styles.buttonRow}>
            <button className={styles.filterToggle} onClick={() => setFilterOpen(true)} aria-label="Open filters">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
                <circle cx="8" cy="6" r="2" fill="currentColor" />
                <circle cx="16" cy="12" r="2" fill="currentColor" />
                <circle cx="10" cy="18" r="2" fill="currentColor" />
              </svg>
            </button>
            <button
              onClick={() => handleSpin(true)}
              disabled={isSpinning}
              className={styles.spinButton}
            >
              {isSpinning ? "Spinning..." : "Spin Again"}
            </button>
          </div>
        </main>
      ) : (
        // Desktop or before spin
        <main className={selectedProduct ? styles.mainContentHorizontal : styles.mainContent}>
          {/* Landing text (pre-spin only) */}
          {!selectedProduct && (
            <>
              <h1 className={styles.landingHeadline}>
                Discover Your Next <span>Gift</span>
              </h1>
              <p className={styles.landingSubtitle}>
                Not sure what to buy? Spin the wheel and let us surprise you with a random Amazon product.
              </p>
            </>
          )}

          {/* Wheel + Button */}
          <div className={styles.wheelSection}>
            <div className={containerClasses}>
              <img
                src="/images/wheel.png"
                fetchPriority="high"
                alt="Wheel of Gifts"
                className={wheelClasses}
                style={{ transform: `rotate(${rotation}deg)` }}
              />
              <img
                src="/images/pointer.png"
                fetchPriority="high"
                alt="Wheel Pointer"
                className={pointerClasses}
              />
            </div>

            <div className={styles.buttonRow}>
              <button className={styles.filterToggle} onClick={() => setFilterOpen(true)} aria-label="Open filters">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                  <circle cx="8" cy="6" r="2" fill="currentColor" />
                  <circle cx="16" cy="12" r="2" fill="currentColor" />
                  <circle cx="10" cy="18" r="2" fill="currentColor" />
                </svg>
              </button>
              <button
                onClick={() => handleSpin(false)}
                disabled={isSpinning}
                className={styles.spinButton}
              >
                {isSpinning ? "Spinning..." : "Spin the Wheel!"}
              </button>
            </div>
          </div>

          {/* Product Card (desktop only) */}
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
