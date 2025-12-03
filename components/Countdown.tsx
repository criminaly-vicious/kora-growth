/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Countdown Component - Timer for urgency
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate?: Date;
  onComplete?: () => void;
  className?: string;
  showLabels?: boolean;
  compact?: boolean;
}

const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  onComplete,
  className = '',
  showLabels = true,
  compact = false,
}) => {
  // Default: end of current month
  const defaultTarget = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  }, []);

  const target = targetDate || defaultTarget;

  const calculateTimeLeft = (): TimeLeft => {
    const difference = target.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [target, onComplete]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <motion.div
      className={`countdown-unit ${compact ? 'p-2 min-w-[50px]' : ''}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      key={value}
    >
      <motion.span
        className={`countdown-value ${compact ? 'text-xl' : ''}`}
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {formatNumber(value)}
      </motion.span>
      {showLabels && (
        <span className="countdown-label">{label}</span>
      )}
    </motion.div>
  );

  const Separator: React.FC = () => (
    <span className="text-2xl font-bold text-[#6A6FF0] mx-1 self-start mt-4">:</span>
  );

  return (
    <div className={`flex items-center justify-center gap-2 md:gap-4 ${className}`}>
      <TimeUnit value={timeLeft.days} label="Dias" />
      <Separator />
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <Separator />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <Separator />
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
};

export default Countdown;

