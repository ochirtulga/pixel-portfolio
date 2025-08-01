import React, { useState, useEffect } from 'react';
import { HealthBar } from '../common';

const HealthManaDisplay = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load saved state from localStorage
  useEffect(() => {
    const savedVisibility = localStorage.getItem('healthDisplayVisible');
    const savedMinimized = localStorage.getItem('healthDisplayMinimized');
    
    if (savedVisibility !== null) {
      setIsVisible(JSON.parse(savedVisibility));
    }
    if (savedMinimized !== null) {
      setIsMinimized(JSON.parse(savedMinimized));
    }
  }, []);

  // Listen for toggle events from Navigation component
  useEffect(() => {
    const handleStatusToggle = (event) => {
      const { visible } = event.detail;
      setIsVisible(visible);
      if (!visible) {
        setIsMinimized(false);
        localStorage.setItem('healthDisplayMinimized', JSON.stringify(false));
      }
    };

    window.addEventListener('statusToggle', handleStatusToggle);
    
    return () => {
      window.removeEventListener('statusToggle', handleStatusToggle);
    };
  }, []);

  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    localStorage.setItem('healthDisplayVisible', JSON.stringify(newVisibility));
    
    if (!newVisibility) {
      setIsMinimized(false);
      localStorage.setItem('healthDisplayMinimized', JSON.stringify(false));
    }
  };

  const toggleMinimize = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    localStorage.setItem('healthDisplayMinimized', JSON.stringify(newMinimized));
  };

  // Don't show anything on mobile - controls are now in navigation
  if (isMobile) {
    return null;
  }

  if (!isVisible) {
    // Show toggle button when hidden (desktop only)
    return (
      <button
        onClick={toggleVisibility}
        className="
          fixed bottom-20 left-6 z-20 bg-gray-900 bg-opacity-95 border-2 border-green-400 rounded-lg p-2 
          hover:bg-opacity-100 transition-all duration-300 hover:scale-105
        "
        title="Show Status Bars"
      >
        <div className="flex items-center gap-1">
          <span className="text-green-400 font-mono font-bold text-xs">📊 STATUS</span>
        </div>
      </button>
    );
  }

  // Desktop: Original left sidebar layout with toggle controls
  return (
    <div className="fixed bottom-20 left-6 z-20 space-y-3 bg-gray-900 bg-opacity-90 p-4 pixel-border rounded-lg shadow-lg">
      {/* Header with Controls */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-green-400 font-mono font-bold text-xs">
          ⚡ STATUS
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleMinimize}
            className="text-green-400 hover:text-white font-bold text-xs px-1 hover:bg-gray-700 rounded transition-colors"
            title={isMinimized ? "Expand Status Bars" : "Minimize Status Bars"}
          >
            {isMinimized ? '▼' : '▲'}
          </button>
          <button
            onClick={toggleVisibility}
            className="text-green-400 hover:text-white font-bold text-xs px-1 hover:bg-gray-700 rounded transition-colors"
            title="Hide Status Bars"
          >
            ✕
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          {/* Health Bar */}
          <div className="flex items-start gap-3">
            <span className="text-red-400 font-mono font-bold text-sm min-w-[24px] mt-0.5">HP</span>
            <div className="flex-1">
              <HealthBar 
                value={100} 
                color="red" 
                status="Ready for Action"
                showGlow={true}
              />
            </div>
          </div>
          
          {/* Mana Bar */}
          <div className="flex items-start gap-3">
            <span className="text-blue-400 font-mono font-bold text-sm min-w-[24px] mt-0.5">MP</span>
            <div className="flex-1">
              <HealthBar 
                value={100} 
                color="blue" 
                status="High Focus"
                showGlow={true}
              />
            </div>
          </div>

          {/* Skill Bar */}
          <div className="flex items-start gap-3">
            <span className="text-green-400 font-mono font-bold text-sm min-w-[24px] mt-0.5">XP</span>
            <div className="flex-1">
              <HealthBar 
                value={100} 
                color="green" 
                status="Peak Performance"
                showGlow={true}
              />
            </div>
          </div>

          {/* Availability Bar */}
          <div className="flex items-start gap-3">
            <span className="text-yellow-400 font-mono font-bold text-sm min-w-[24px] mt-0.5">AV</span>
            <div className="flex-1">
              <HealthBar 
                value={100} 
                color="yellow" 
                status="Open for Quests"
                showGlow={true}
              />
            </div>
          </div>

          {/* Online Status */}
          <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-600">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-mono text-xs font-bold">ONLINE</span>
          </div>
        </>
      )}
    </div>
  );
};

export default HealthManaDisplay;