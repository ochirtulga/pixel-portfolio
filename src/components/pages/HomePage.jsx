import React, { useState, useEffect } from 'react';
import { PixelButton } from '../common';
import { calculateCurrentLevel, CHARACTER_CONFIG } from '../../data/characterConfig';

const HomePage = ({ onNavigate }) => {
  const currentLevel = calculateCurrentLevel();
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // The welcome message to be typed out (shorter for mobile)
  const welcomeText = isMobile 
    ? `TO A PROFILE OF LEVEL ${currentLevel} ${CHARACTER_CONFIG.title}
SPECIALIZING IN ${CHARACTER_CONFIG.specialization}
${currentLevel} YEARS OF EXPERIENCE`
    : `TO A PROFILE OF LEVEL ${currentLevel} ${CHARACTER_CONFIG.title}
SPECIALIZING IN ${CHARACTER_CONFIG.specialization}
${currentLevel} YEARS OF PROFESSIONAL EXPERIENCE`;

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < welcomeText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(welcomeText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, isMobile ? 30 : 50); // Faster typing on mobile

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
      // Show buttons after a short delay when typing is complete
      setShowButtons(true);
    }
  }, [currentIndex, welcomeText, isMobile]);

  // Reset animation when level changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTypingComplete(false);
    setShowButtons(false);
  }, [currentLevel]);

  return (
    <div className="text-center py-8 md:py-20 animate-fade-in px-4">
      {/* Animated Gaming Icon - Responsive size */}
      <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-bounce">🎮</div>
      
      {/* Main Welcome Title - Responsive size */}
      <h2 className="text-4xl md:text-6xl font-bold text-green-400 font-mono mb-3 md:mb-4 pixel-glow">
        WELCOME
      </h2>
      
      {/* Typewriter Welcome Message - Mobile optimized */}
      <div className="text-sm md:text-xl text-gray-300 font-mono mb-6 md:mb-8 max-w-2xl mx-auto min-h-[3rem] md:min-h-[4rem] flex items-center justify-center px-2">
        <div className="relative">
          <p className="leading-relaxed text-center">
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
      
      {/* Action Buttons - Mobile stack, Desktop row */}
      <div className={`
        flex flex-col md:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8 
        transition-all duration-500 
        ${showButtons ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
      `}>
        <PixelButton 
          onClick={() => onNavigate('projects')}
          className={`
            w-full md:w-auto text-sm md:text-base px-6 py-3
            animate-delay-100 ${showButtons ? 'animate-fade-in-up' : ''}
          `}
        >
          ⚔️ VIEW QUESTS
        </PixelButton>
        <PixelButton 
          onClick={() => onNavigate('contact')}
          className={`
            w-full md:w-auto text-sm md:text-base px-6 py-3
            animate-delay-150 ${showButtons ? 'animate-fade-in-up' : ''}
          `}
        >
          📮 SEND MESSAGE
        </PixelButton>
      </div>

      {/* Quick Navigation Grid - Mobile Only */}
      {isMobile && showButtons && (
        <div className="animate-fade-in animate-delay-300 mb-6">
          <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
            <PixelButton 
              onClick={() => onNavigate('about')}
              className="text-xs py-2 px-3"
            >
              👤 ABOUT
            </PixelButton>
            <PixelButton 
              onClick={() => onNavigate('skills')}
              className="text-xs py-2 px-3"
            >
              💪 SKILLS
            </PixelButton>
          </div>
        </div>
      )}
      
      {/* Retro Terminal Effects - Responsive text */}
      {isTypingComplete && (
        <div className="animate-fade-in animate-delay-500">
          <div className="text-xs md:text-xs text-gray-500 font-mono mb-2">
            SYSTEM READY • LVL {currentLevel} ADVENTURER ONLINE • SINCE 2018
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">CONNECTED</span>
          </div>

          {/* Mobile-specific status indicators */}
          {isMobile && (
            <div className="mt-4 animate-fade-in animate-delay-700">
              <div className="flex justify-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-green-400">READY</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400">ONLINE</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-400">ACTIVE</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile Character Stats Preview */}
      {isMobile && isTypingComplete && (
        <div className="mt-6 animate-fade-in animate-delay-1000">
          <div className="bg-gray-800 bg-opacity-80 rounded-lg border-2 border-green-400 p-4 max-w-sm mx-auto">
            <div className="text-green-400 font-mono font-bold text-sm mb-3 text-center">
              📊 QUICK STATS
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="text-center">
                <div className="text-green-400 font-bold">{CHARACTER_CONFIG.stats.apisDeployed}</div>
                <div className="text-gray-400">APIS</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-bold">{CHARACTER_CONFIG.stats.uptime}</div>
                <div className="text-gray-400">UPTIME</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold">{CHARACTER_CONFIG.stats.livesSaved}</div>
                <div className="text-gray-400">USERS</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold">{CHARACTER_CONFIG.stats.experiencePoints}</div>
                <div className="text-gray-400">XP</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skip typing hint for mobile */}
      {isMobile && !isTypingComplete && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="text-xs text-gray-500 font-mono animate-pulse">
            Tap anywhere to skip
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 767px) {
          /* Mobile-specific optimizations */
          .pixel-glow {
            text-shadow: 0 0 8px var(--pixel-green);
          }
          
          /* Improve text readability on mobile */
          .font-mono {
            letter-spacing: 0.05em;
          }
          
          /* Better touch targets */
          button {
            min-height: 44px;
            touch-action: manipulation;
          }
          
          /* Optimize animations for mobile */
          .animate-bounce {
            animation-duration: 2.5s;
          }
        }
        
        /* Tap to skip functionality for mobile */
        @media (max-width: 767px) {
          .typewriter-container {
            cursor: pointer;
            user-select: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;