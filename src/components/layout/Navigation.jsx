import React from 'react';
import { PixelButton } from '../common';
import { navItems } from '../../data/navItems';
import { calculateCurrentLevel, CHARACTER_CONFIG } from '../../data/characterConfig';

const Navigation = ({ currentSection, onSectionChange }) => {
  const currentLevel = calculateCurrentLevel();

  return (
    <nav className="relative z-10 p-6 border-b-2 border-green-400 bg-gray-900 bg-opacity-90">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Player Profile Section */}
        <div className="flex items-center gap-4">
          {/* Character Avatar */}
          <div className="w-12 h-12 bg-gray-800 border-2 border-green-400 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer">
          👨🏻‍💻
          </div>
          
          {/* Player Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-mono font-bold text-lg pixel-glow">
                &lt;OCHI&gt;
              </span>
              <span className="text-yellow-400 font-mono text-xs bg-gray-800 px-2 py-1 rounded border border-yellow-600">
                LVL {currentLevel}
              </span>
            </div>
            <span className="text-gray-400 font-mono text-xs">
              {CHARACTER_CONFIG.title} 
            </span>
            <span className="text-gray-400 font-mono text-xs"> since 2018 </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          {navItems.map(item => (
            <PixelButton
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              active={currentSection === item.id}
            >
              {item.icon} {item.label}
            </PixelButton>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;