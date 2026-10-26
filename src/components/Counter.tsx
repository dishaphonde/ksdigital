"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
  value: string;
  numValue?: number | null;
  label: string;
}

export default function Counter({ value, numValue, label }: CounterProps) {
  // Extract number if numValue not explicitly passed
  const targetNumber = numValue ?? parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  const [count, setCount] = useState<number>(targetNumber || 0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetNumber || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = targetNumber / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= targetNumber) {
              setCount(targetNumber);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetNumber, hasAnimated]);

  return (
    <div ref={ref} className="text-center p-6 glass-card">
      <div className="font-heading text-4xl sm:text-5xl font-extrabold gradient-text mb-2 tracking-tight">
        {/* Server renders real targetNumber for SEO, animates client-side */}
        <span>{count}</span>
        {suffix && <span>{suffix}</span>}
      </div>
      <p className="text-sm font-medium text-muted uppercase tracking-wider">{label}</p>
    </div>
  );
}
