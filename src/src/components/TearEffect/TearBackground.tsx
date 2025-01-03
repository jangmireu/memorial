"use client";
import React, { useEffect, useState } from 'react';
import styles from './TearBackground.module.css';


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
    <div className={styles.teardropContainer}>
      {tears.map((id) => (
        <div
          key={id}
          className={styles.teardrop}
          style={{ left: `${Math.random() * 100}vw` }}
        />
      ))}
    </div>
  );
}
