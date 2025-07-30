import React, { useState, useEffect } from 'react';

const AboutPage = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullText = "A seasoned Backend Adventurer who has mastered the arcane arts of microservices architecture and RESTful API design. Known throughout the digital realm for crafting scalable systems and optimizing server performance in the most challenging environments. With years of experience battling complex distributed systems, this developer has earned legendary status among peers for delivering robust, high-performance solutions that stand the test of time.";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30); // Adjust speed here (lower = faster)

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, fullText]);

  // Calculate current level dynamically
  const [currentLevel, setCurrentLevel] = useState(27);

  useEffect(() => {
    const calculateLevel = () => {
      const currentYear = new Date().getFullYear();
      const birthYear = 1998; // Change this to match your birth year
      const level = currentYear - birthYear;
      setCurrentLevel(level);
    };

    calculateLevel();
  }, []);

  return (
    <div className="py-12 animate-fade-in">
      <h2 className="text-4xl font-bold text-green-400 font-mono mb-8 pixel-glow">
        📜 CHARACTER INFO
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-800 bg-opacity-80 p-6 pixel-border">
          <h3 className="text-2xl text-green-400 font-mono mb-4">STATS</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-mono">CLASS:</span>
              <span className="text-green-400 font-mono font-bold">BACKEND DEV</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-mono">LEVEL:</span>
              <span className="text-green-400 font-mono font-bold">{currentLevel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-mono">LOCATION:</span>
              <span className="text-green-400 font-mono font-bold">AUSTIN, TX</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-mono">APIS DEPLOYED:</span>
              <span className="text-green-400 font-mono font-bold">67+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-mono">UPTIME ACHIEVED:</span>
              <span className="text-green-400 font-mono font-bold">99.99%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-mono">MOST LIVES SAVED:</span>
              <span className="text-green-400 font-mono font-bold">1.5M+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-mono">EXP POINTS:</span>
              <span className="text-green-400 font-mono font-bold">28,750</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 bg-opacity-80 p-6 pixel-border relative">
          <h3 className="text-2xl text-green-400 font-mono mb-4">BACKSTORY</h3>
          
          {/* Game-style dialogue box */}
          <div className="bg-gray-900 p-4 rounded border-2 border-green-400 min-h-48 relative">
            {/* Dialogue box arrow */}
            <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-900 border-l-2 border-t-2 border-green-400 transform rotate-45"></div>
            
            <p className="text-gray-300 font-mono leading-relaxed text-sm">
              {displayedText}
              {!isTypingComplete && (
                <span className="animate-pulse text-green-400">|</span>
              )}
            </p>
            
            {/* Continue indicator when typing is complete */}
            {isTypingComplete && (
              <div className="absolute bottom-2 right-3 animate-bounce">
                <span className="text-green-400 font-mono text-xs">▼</span>
              </div>
            )}
          </div>
          
          {/* Character portrait placeholder */}
          <div className="mt-4 text-center">
            <div className="text-6xl mb-2">👨‍💻</div>
            <span className="text-green-400 font-mono text-sm font-bold">LEVEL {currentLevel} ADVENTURER</span>
          </div>
        </div>
      </div>
      
      {/* Additional gaming elements */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800 bg-opacity-80 p-4 pixel-border text-center">
          <div className="text-2xl mb-2">🏆</div>
          <h4 className="text-green-400 font-mono font-bold text-sm mb-2">ACHIEVEMENTS</h4>
          <p className="text-gray-300 font-mono text-xs">15 Major Projects Completed</p>
        </div>
        
        <div className="bg-gray-800 bg-opacity-80 p-4 pixel-border text-center">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="text-green-400 font-mono font-bold text-sm mb-2">SPECIAL ABILITIES</h4>
          <p className="text-gray-300 font-mono text-xs">Microservices Mastery</p>
        </div>
        
        <div className="bg-gray-800 bg-opacity-80 p-4 pixel-border text-center">
          <div className="text-2xl mb-2">🎯</div>
          <h4 className="text-green-400 font-mono font-bold text-sm mb-2">CURRENT QUEST</h4>
          <p className="text-gray-300 font-mono text-xs">Building Scalable Systems</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;