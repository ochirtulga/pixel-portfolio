import React from 'react';
import { PixelButton } from '../../common';

const QuickConnectPanel = ({ onSocialClick }) => {
  const socialButtons = [
    { key: 'github', icon: '🐙', label: 'GitHub' },
    { key: 'linkedin', icon: '💼', label: 'LinkedIn' },
    { key: 'instagram', icon: '📸', label: 'Instagram' },
    { key: 'leetcode', icon: '🧩', label: 'LeetCode' }
  ];

  return (
    <div className="bg-gray-800 bg-opacity-95 pixel-border">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-3 border-b-2 border-blue-400">
        <h3 className="text-lg font-bold text-blue-400 font-mono flex items-center gap-2">
          ⚡ Quick Connect
        </h3>
      </div>
      <div className="p-4">
        <p className="text-gray-300 font-mono text-xs mb-4">
          Bypass dialogue for direct guild connections:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {socialButtons.map(button => (
            <PixelButton 
              key={button.key}
              onClick={() => onSocialClick(button.key)}
              className="text-xs py-2 hover:scale-105 transition-transform"
            >
              {button.icon} {button.label}
            </PixelButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickConnectPanel;