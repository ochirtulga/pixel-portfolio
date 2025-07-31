import React, { useState, useEffect } from 'react';
import { PixelButton } from '../common';
import { calculateCurrentLevel, CHARACTER_CONFIG } from '../../data/characterConfig';

const HomePage = ({ onNavigate }) => {
  const currentLevel = calculateCurrentLevel();
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  // The welcome message to be typed out
  const welcomeText = `TO A PROFILE OF LVL ${currentLevel} ${CHARACTER_CONFIG.title}
SPECIALIZING IN ${CHARACTER_CONFIG.specialization}
${currentLevel}+ YEARS OF PROFESSIONAL EXPERIENCE`;

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < welcomeText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(welcomeText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // Adjust speed here (lower = faster)

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
      // Show buttons after a short delay when typing is complete
      setTimeout(() => {
        setShowButtons(true);
      }, 500);
    }
  }, [currentIndex, welcomeText]);

  // Reset animation when level changes (though unlikely during a session)
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTypingComplete(false);
    setShowButtons(false);
  }, [currentLevel]);

  return (
    <div className="text-center py-20 animate-fade-in">
      {/* Animated Gaming Icon */}
      <div className="text-8xl mb-6 animate-bounce">🎮</div>
      
      {/* Main Welcome Title */}
      <h2 className="text-6xl font-bold text-green-400 font-mono mb-4 pixel-glow">
        WELCOME
      </h2>
      
      {/* Typewriter Welcome Message */}
      <div className="text-xl text-gray-300 font-mono mb-8 max-w-2xl mx-auto min-h-[4rem] flex items-center justify-center">
        <div className="relative">
          <p className="leading-relaxed">
            {displayedText}
            {!isTypingComplete && (
              <span className="animate-blink text-green-400 ml-1">|</span>
            )}
          </p>
          
          {/* Retro computer terminal effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent opacity-5 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons with Staggered Animation */}
      <div className={`flex justify-center gap-4 transition-all duration-500 ${
        showButtons ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}>
        <PixelButton 
          onClick={() => onNavigate('projects')}
          className={`animate-delay-100 ${showButtons ? 'animate-fade-in-up' : ''}`}
        >
          ⚔️ VIEW QUESTS
        </PixelButton>
        <PixelButton 
          onClick={() => onNavigate('contact')}
          className={`animate-delay-200 ${showButtons ? 'animate-fade-in-up' : ''}`}
        >
          📮 SEND MESSAGE
        </PixelButton>
      </div>
      
      {/* Retro Terminal Effects */}
      {isTypingComplete && (
        <div className="mt-8 animate-fade-in animate-delay-500">
          <div className="text-xs text-gray-500 font-mono">
            SYSTEM READY • LVL {currentLevel} ADVENTURER ONLINE • SINCE 2018
          </div>
          <div className="flex justify-center items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">CONNECTED</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;