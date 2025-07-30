import React from 'react';
import { PixelButton } from '../common';
import { calculateCurrentLevel, CHARACTER_CONFIG } from '../../data/characterConfig';

const HomePage = ({ onNavigate }) => {
  const currentLevel = calculateCurrentLevel();

  return (
    <div className="text-center py-20 animate-fade-in">
      <div className="text-8xl mb-6 animate-bounce">🎮</div>
      <h2 className="text-6xl font-bold text-green-400 font-mono mb-4 pixel-glow">
        WELCOME
      </h2>
      <p className="text-xl text-gray-300 font-mono mb-8 max-w-2xl mx-auto">
        I AM A LEVEL {currentLevel} {CHARACTER_CONFIG.title}<br/>
        SPECIALIZING IN {CHARACTER_CONFIG.specialization}
      </p>
      <div className="flex justify-center gap-4">
        <PixelButton onClick={() => onNavigate('projects')}>
          VIEW QUESTS
        </PixelButton>
        <PixelButton onClick={() => onNavigate('contact')}>
          SEND MESSAGE
        </PixelButton>
      </div>
    </div>
  );
};

export default HomePage;