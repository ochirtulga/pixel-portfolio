import React, { useState, useRef } from 'react';
import audioService from '../../services/audioService';
import '../../styles/components.css';

const PixelButton = ({ 
  children, 
  onClick, 
  active = false, 
  className = '',
  disabled = false,
  enableAudio = true,
  variant = 'default' // default, primary, secondary
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;

    // Audio feedback
    if (enableAudio) {
      audioService.playClick();
    }

    // Visual click feedback
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 150);

    // Button click ripple effect
    createRippleEffect(e);

    if (onClick) {
      onClick(e);
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    
    setIsHovered(true);
    
    // Audio feedback for hover
    if (enableAudio) {
      audioService.playHover();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicking(false);
  };

  // Create ripple effect on click
  const createRippleEffect = (e) => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(74, 222, 128, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 0;
    `;

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  };

  const getButtonClass = () => {
    let baseClass = 'pixel-button';
    
    if (disabled) {
      baseClass += ' pixel-button--disabled';
    } else if (active) {
      baseClass += ' pixel-button--active';
    } else if (isClicking) {
      baseClass += ' pixel-button--clicking';
    } else if (isHovered) {
      baseClass += ' pixel-button--hover';
    } else {
      baseClass += ' pixel-button--inactive';
    }

    // Add variant classes
    if (variant !== 'default') {
      baseClass += ` pixel-button--${variant}`;
    }

    return `${baseClass} ${className}`;
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => !disabled && setIsClicking(true)}
      onMouseUp={() => setIsClicking(false)}
      className={getButtonClass()}
      disabled={disabled}
      type="button"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </span>

      {/* Add CSS for ripple animation */}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default PixelButton;