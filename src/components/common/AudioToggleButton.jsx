import React, { useState, useEffect } from 'react';
import audioService from '../../services/audioService';

const AudioToggleButton = ({ className = '', position = 'fixed' }) => {
  const [isEnabled, setIsEnabled] = useState(audioService.isEnabled());
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Update state when audio service enabled state changes
    const handleAudioChange = (enabled) => {
      setIsEnabled(enabled);
    };

    audioService.onEnabledChange(handleAudioChange);

    // Check current state on mount
    setIsEnabled(audioService.isEnabled());
  }, []);

  const handleToggle = () => {
    const newState = audioService.toggle();
    setIsEnabled(newState);
    
    // Trigger callback if it exists
    audioService.triggerEnabledChange();
  };

  const positionClass = position === 'fixed' 
    ? 'fixed top-7 right-6 z-30' 
    : '';

  return (
    <div className={`${positionClass} ${className}`}>
      <div className="relative">
        <button
          onClick={handleToggle}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`
            w-12 h-12 rounded-lg border-2 font-mono font-bold text-lg
            transition-all duration-300 hover:scale-110 active:scale-95
            flex items-center justify-center relative overflow-hidden
            ${isEnabled 
              ? 'bg-green-900 border-green-400 text-green-400 shadow-lg animate-pulse' 
              : 'bg-gray-900 border-gray-600 text-gray-500 hover:border-gray-500'
            }
          `}
          title={isEnabled ? 'Audio: ON' : 'Audio: OFF'}
          style={{
            imageRendering: 'pixelated',
            boxShadow: isEnabled 
              ? '0 0 10px rgba(74, 222, 128, 0.3)' 
              : 'none'
          }}
        >
          {/* Sound wave animation for enabled state */}
          {isEnabled && (
            <>
              <div className="absolute inset-0 bg-green-400 opacity-10 animate-ping"></div>
              <div className="absolute inset-2 border border-green-400 opacity-30 animate-pulse rounded"></div>
            </>
          )}
          
          {/* Icon */}
          <span className="relative z-10">
            {isEnabled ? '🔊' : '🔇'}
          </span>
          
          {/* Shine effect on hover */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300"
            style={{
              transform: 'skewX(-20deg) translateX(-100%)',
              animation: isEnabled ? 'shine 2s ease-in-out infinite' : 'none'
            }}
          />
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 border-2 border-green-400 rounded text-xs font-mono text-green-400 whitespace-nowrap animate-fade-in">
            <div className="absolute bottom-full right-3 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-green-400"></div>
            {isEnabled ? '🎵 Audio: ON' : '🔇 Audio: OFF'}
          </div>
        )}

        {/* Status indicator */}
        <div className={`
          absolute -top-1 -right-1 w-3 h-3 rounded-full border border-gray-900
          ${isEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}
        `} />
      </div>

      <style jsx>{`
        @keyframes shine {
          0% { transform: skewX(-20deg) translateX(-100%); }
          100% { transform: skewX(-20deg) translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default AudioToggleButton;