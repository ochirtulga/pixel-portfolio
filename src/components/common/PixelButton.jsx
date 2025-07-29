import React, { useState } from 'react';
import '../../styles/components.css';

const PixelButton = ({ children, onClick, active = false, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  const getButtonClass = () => {
    let baseClass = 'pixel-button';
    if (active) {
      baseClass += ' pixel-button--active';
    } else if (isHovered) {
      baseClass += ' pixel-button--hover';
    } else {
      baseClass += ' pixel-button--inactive';
    }
    return `${baseClass} ${className}`;
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={getButtonClass()}
      type="button"
    >
      {children}
    </button>
  );
};

export default PixelButton;