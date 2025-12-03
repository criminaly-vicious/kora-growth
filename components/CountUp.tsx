/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CountUp Component - Animated number counter
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  onComplete?: () => void;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  onComplete,
}) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>();

  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  const animate = useCallback(() => {
    const startTime = performance.now();
    const startValue = start;
    const endValue = end;
    const totalDuration = duration * 1000;

    setIsAnimating(true);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setCount(endValue);
        setIsAnimating(false);
        onComplete?.();
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [start, end, duration, onComplete]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setTimeout(animate, delay * 1000);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [animate, delay, hasStarted]);

  const formatNumber = (num: number): string => {
    return num.toFixed(decimals);
  };

  return (
    <motion.span
      ref={ref}
      className={`count-up-number ${isAnimating ? 'animating' : ''} ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={hasStarted ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.span>
  );
};

export default CountUp;
