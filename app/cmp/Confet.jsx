"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function AutoConfetti() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const timer = setTimeout(() => {
      setDimensions({ width: 0, height: 0 }); // Stop confetti after 3 seconds
    },8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {dimensions.width > 0 && <Confetti width={dimensions.width} height={dimensions.height} />}
    </div>
  );
}
