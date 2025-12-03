/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TrustBar Component - Client logos marquee
 */

import React from 'react';
import { motion } from 'framer-motion';

// Placeholder logos - stylized text as SVG-like elements
const LOGOS = [
  { name: 'CENTRA', width: 110 },
  { name: 'PERFORMIND', width: 140 },
  { name: 'ATRIA HEALTH', width: 140 },
  { name: 'SNACC', width: 90 },
  { name: 'PROMPTOS', width: 120 },
  { name: 'LINK SCHOOL', width: 130 },
];

interface LogoItemProps {
  name: string;
  width: number;
}

const LogoItem: React.FC<LogoItemProps> = ({ name, width }) => (
  <div
    className="trust-logo flex items-center justify-center px-8 py-4"
    style={{ minWidth: width + 40 }}
  >
    <span className="text-xl md:text-2xl font-heading font-bold tracking-wider text-white/40 hover:text-white transition-all duration-300">
      {name}
    </span>
  </div>
);

interface TrustBarProps {
  title?: string;
  subtitle?: string;
  speed?: number;
  className?: string;
}

const TrustBar: React.FC<TrustBarProps> = ({
  title = 'Trusted by',
  subtitle,
  speed = 30,
  className = '',
}) => {
  return (
    <section className={`relative py-16 md:py-20 bg-[#0C0D26] border-y border-white/5 overflow-hidden ${className}`}>
      {/* Title */}
      <div className="text-center mb-12 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs md:text-sm font-mono text-[#6A6FF0] tracking-[0.3em] uppercase mb-4"
        >
          {title}
        </motion.p>
        {subtitle && (
          <p className="text-[#C8C9D9] text-sm max-w-md mx-auto">{subtitle}</p>
        )}
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0C0D26] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0C0D26] to-transparent z-10 pointer-events-none" />

        {/* First Row - Left to Right */}
        <div className="flex overflow-hidden mb-4">
          <motion.div
            className="flex shrink-0"
            animate={{ x: '-50%' }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <LogoItem key={`row1-${i}`} {...logo} />
            ))}
          </motion.div>
        </div>

        {/* Second Row - Right to Left (Opposite Direction) */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex shrink-0"
            initial={{ x: '-50%' }}
            animate={{ x: '0%' }}
            transition={{
              duration: speed * 1.2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...LOGOS.slice().reverse(), ...LOGOS.slice().reverse()].map((logo, i) => (
              <LogoItem key={`row2-${i}`} {...logo} />
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default TrustBar;

