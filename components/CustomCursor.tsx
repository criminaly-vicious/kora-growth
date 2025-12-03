/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CustomCursor - Premium cursor with multiple states
 */

import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'click' | 'text' | 'hidden';

const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(true);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Cursor size based on state
  const getCursorSize = useCallback(() => {
    switch (cursorState) {
      case 'hover':
        return { width: 60, height: 60 };
      case 'click':
        return { width: 8, height: 8 };
      case 'text':
        return { width: 4, height: 30 };
      case 'hidden':
        return { width: 0, height: 0 };
      default:
        return { width: 12, height: 12 };
    }
  }, [cursorState]);

  // Cursor styles based on state
  const getCursorStyles = useCallback(() => {
    const baseStyles = {
      borderRadius: cursorState === 'text' ? '2px' : '50%',
      backgroundColor: cursorState === 'hover' ? 'transparent' : 'white',
      border: cursorState === 'hover' ? '2px solid rgba(255, 255, 255, 0.8)' : 'none',
      mixBlendMode: cursorState === 'hover' ? 'normal' as const : 'difference' as const,
    };
    return baseStyles;
  }, [cursorState]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for clickable elements
      const isClickable = target.closest('button') || 
                          target.closest('a') || 
                          target.closest('[data-hover="true"]') ||
                          target.closest('input') ||
                          target.closest('textarea');
      
      // Check for text elements
      const isText = target.closest('p') ||
                     target.closest('span') ||
                     target.closest('h1') ||
                     target.closest('h2') ||
                     target.closest('h3');

      if (isClickable) {
        setCursorState('hover');
      } else if (isText && !isClickable) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseDown = () => {
      setCursorState(prev => prev === 'hover' ? 'click' : prev);
    };

    const handleMouseUp = () => {
      setCursorState(prev => prev === 'click' ? 'hover' : prev);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  const size = getCursorSize();
  const styles = getCursorStyles();

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
        style={{ 
          x, 
          y, 
          translateX: '-50%', 
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{
            width: size.width,
            height: size.height,
            ...styles,
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 25,
            mass: 0.5 
          }}
          style={{
            boxShadow: cursorState === 'hover' 
              ? '0 0 20px rgba(106, 111, 240, 0.5)' 
              : 'none',
          }}
        >
          {/* Inner dot for hover state */}
          {cursorState === 'hover' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          )}
        </motion.div>
      </motion.div>

      {/* Trailing cursor for extra premium feel */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{ 
          x: useSpring(mouseX, { damping: 40, stiffness: 200 }), 
          y: useSpring(mouseY, { damping: 40, stiffness: 200 }), 
          translateX: '-50%', 
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible && cursorState !== 'hidden' ? 0.3 : 0,
        }}
      >
        <motion.div
          className="rounded-full bg-[#6A6FF0]"
          animate={{
            width: cursorState === 'hover' ? 80 : 20,
            height: cursorState === 'hover' ? 80 : 20,
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 200, 
            damping: 30 
          }}
          style={{
            filter: 'blur(10px)',
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
