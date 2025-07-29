import React from 'react';
import { PixelButton } from '../common';
import { navItems } from '../../data/navItems';

const Navigation = ({ currentSection, onSectionChange }) => (
  <nav className="relative z-10 p-6 border-b-2 border-green-400 bg-gray-900 bg-opacity-90">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <h1 className="text-3xl font-bold text-green-400 font-mono tracking-wider pixel-glow">
        &lt;OCHI&gt;
      </h1>
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

export default Navigation;