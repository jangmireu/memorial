"use client";
import React, { useEffect, useState } from 'react';

export default function TearBackground() {
  const [tears, setTears] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTears((prev) => [...prev, Date.now()]);
      setTimeout(() => {
        setTears((prev) => prev.slice(1));
      }, 3000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="teardropContainer">
      {tears.map((id) => (
        <div
          key={id}
          className="teardrop"
          style={{ left: `${Math.random() * 100}vw` }}
        />
      ))}
    </div>
  );
}
