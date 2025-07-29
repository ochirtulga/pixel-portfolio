import React from 'react';
import '../../styles/components.css';

const HealthBar = ({ value, max = 100, color = 'green' }) => {
  const colorMap = {
    green: '#4ade80',
    red: '#ef4444',
    blue: '#3b82f6',
    yellow: '#eab308'
  };

  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <div className="health-bar pixel-border">
        <div 
          className="health-bar__fill"
          style={{ 
            width: `${(value / max) * 100}%`,
            backgroundColor: colorMap[color] || colorMap.green
          }}
        />
        <div className="health-bar__text">
          {value}%
        </div>
      </div>
    </div>
  );
};

export default HealthBar;