/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GradientText - Premium animated gradient text
 */

import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  animated?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({ 
  text, 
  as: Component = 'span', 
  className = '',
  animated = true 
}) => {
  return (
    <Component className={`relative inline-block font-bold tracking-tight isolate ${className}`}>
      {/* Main Gradient Text - KORA Palette */}
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-white via-[#C8C9D9] via-50% via-[#6A6FF0] to-white bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position]"
        animate={animated ? {
          backgroundPosition: ['0% center', '200% center'],
        } : undefined}
        transition={animated ? {
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        } : undefined}
        aria-hidden="true"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {text}
      </motion.span>
      
      {/* Base layer for layout */}
      <span 
        className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 opacity-20"
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent' 
        }}
      >
        {text}
      </span>
      
      {/* Subtle Glow Effect */}
      <motion.span
        className="absolute inset-0 -z-10 block bg-gradient-to-r from-[#6A6FF0] via-[#8B5CF6] to-[#6A6FF0] bg-[length:200%_auto] bg-clip-text text-transparent blur-2xl"
        animate={animated ? {
          backgroundPosition: ['0% center', '200% center'],
          opacity: [0.15, 0.25, 0.15],
        } : undefined}
        transition={animated ? {
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        } : undefined}
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transform: 'translateZ(0)' 
        }}
      >
        {text}
      </motion.span>
    </Component>
  );
};

export default GradientText;
