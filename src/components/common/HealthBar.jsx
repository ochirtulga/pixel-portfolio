import React from 'react';
import '../../styles/components.css';

const HealthBar = ({ value, max = 100, color = 'green', status = null, showGlow = true }) => {
  const colorMap = {
    green: {
      bg: '#4ade80',
      glow: '0 0 10px #4ade80, 0 0 20px rgba(74, 222, 128, 0.3)',
      border: '#22c55e',
      text: '#4ade80'
    },
    red: {
      bg: '#ef4444',
      glow: '0 0 10px #ef4444, 0 0 20px rgba(239, 68, 68, 0.3)',
      border: '#dc2626',
      text: '#ef4444'
    },
    blue: {
      bg: '#3b82f6',
      glow: '0 0 10px #3b82f6, 0 0 20px rgba(59, 130, 246, 0.3)',
      border: '#2563eb',
      text: '#3b82f6'
    },
    yellow: {
      bg: '#eab308',
      glow: '0 0 10px #eab308, 0 0 20px rgba(234, 179, 8, 0.3)',
      border: '#ca8a04',
      text: '#eab308'
    }
  };

  const colors = colorMap[color] || colorMap.green;
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 font-mono text-xs">
        <div 
          className="health-bar pixel-border relative overflow-hidden"
          style={{ 
            borderColor: colors.border,
            boxShadow: showGlow ? colors.glow : 'none'
          }}
        >
          <div 
            className="health-bar__fill transition-all duration-1000 ease-out relative"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: colors.bg,
              boxShadow: showGlow ? `inset 0 0 10px rgba(255, 255, 255, 0.2)` : 'none'
            }}
          >
            {/* Animated shine effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              style={{
                width: '30px',
                animation: 'healthBarShine 3s ease-in-out infinite',
                transform: 'skewX(-20deg)'
              }}
            />
          </div>
          
          <div className="health-bar__text" style={{ color: '#1f2937', fontWeight: 'bold', textShadow: '1px 1px 0px rgba(255, 255, 255, 0.5)' }}>
            {value}%
          </div>

          {/* Progress indicator dots */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 h-full bg-black opacity-20"
                style={{ marginLeft: i === 0 ? '25%' : '16.66%' }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Status text */}
      {status && (
        <div 
          className="text-xs font-mono font-bold opacity-90 animate-pulse"
          style={{ color: colors.text }}
        >
          {status}
        </div>
      )}

      <style jsx>{`
        @keyframes healthBarShine {
          0% { 
            transform: translateX(-100%) skewX(-20deg); 
            opacity: 0;
          }
          50% { 
            opacity: 0.8;
          }
          100% { 
            transform: translateX(400%) skewX(-20deg); 
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HealthBar;