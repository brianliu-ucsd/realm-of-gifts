"use client"

import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import Confetti from "react-confetti";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [numPieces, setNumPieces] = useState(0);

  const [availableIndices, setAvailableIndices] = useState<number[]>(() =>
    Array.from({ length: products.length }, (_, i) => i)
  );

  useEffect(() => {
    if (showConfetti) {
      setNumPieces(250);
      const steps = [150, 80, 0];
      steps.forEach((n, i) => setTimeout(() => setNumPieces(n), (i + 1) * 1000));
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [showConfetti]);

  const handleSpin = () => {
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

    setTimeout(() => {
      setSelectedProduct(products[productIdx]!);
      setIsSpinning(false);
      setShowConfetti(true);
    }, 3000);
  };

  return (
    <div
      style={{
        height: "calc(100vh - 85px)", // Subtract navbar height (~83px) + small buffer
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: "white",
        overflow: "hidden" // Changed from "clip" to "hidden"
      }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight - 85} // Match container height
          numberOfPieces={numPieces}
          gravity={0.4}
          recycle={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: selectedProduct ? "row" : "column", // horizontal after spin
          alignItems: "center",
          justifyContent: selectedProduct ? "space-evenly" : "center",
          width: "100%",
          padding: "2vh",
          boxSizing: "border-box",
        }}
      >
        {/* Left side: Wheel + Button */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2vh",
            minWidth: "28vh", // ensures wheel doesn't shrink
          }}
        >
          <div style={{ position: "relative", width: "28vh", height: "28vh" }}>
            <img
              src="/images/wheel.png"
              alt="Wheel"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning
                  ? "transform 3s cubic-bezier(0.25, 0.8, 0.25, 1)"
                  : "none",
              }}
            />
            <img
              src="/images/pointer.png"
              alt="Pointer"
              style={{
                position: "absolute",
                top: "-2vh",
                left: "50%",
                transform: "translateX(-50%)",
                width: "6vh",
              }}
            />
          </div>

          <button
            onClick={handleSpin}
            disabled={isSpinning}
            style={{
              padding: "1.2vh 3vh",
              fontSize: "2vh",
              fontWeight: 600,
              cursor: isSpinning ? "not-allowed" : "pointer",
              borderRadius: "1vh",
              backgroundColor: isSpinning ? "#d1d5db" : "#f59e0b",
              color: "white",
              border: "none",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              transition: "background 0.3s",
            }}
          >
            {isSpinning ? "Spinning..." : "Spin the Wheel!"}
          </button>
        </div>

        {/* Right side: Product Card */}
        {selectedProduct && (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "40vh",
              maxHeight: "70vh",
              minHeight: "22vh",
              boxSizing: "border-box",
            }}
          >
            <ProductCard product={selectedProduct} />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer
        style={{
          height: "60px", // Fixed height instead of percentage
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.9rem",
          color: "#78350f",
          backgroundColor: "#f8f4e8",
          borderTop: "1px solid #e5dfd3",
          flexShrink: 0, // Don't shrink
        }}
      >
        ⚠️ Disclaimer: These are Amazon affiliate links. As an Amazon Associate, we may earn from qualifying purchases.
      </footer>
    </div>
  );
}
