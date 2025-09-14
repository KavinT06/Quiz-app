"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function AutoConfetti() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Start attractive fade out after 5 seconds
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 5000);

    // Completely hide after fade animation completes
    const hideTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!showConfetti) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ 
        opacity,
        transition: 'opacity 3s ease-out'
      }}
    >
      <Confetti 
        width={dimensions.width} 
        height={dimensions.height}
        numberOfPieces={200}
        recycle={true}
        gravity={0.3}
      />
    </div>
  );
}
