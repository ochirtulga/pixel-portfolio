import React, { useState, useEffect } from 'react';
import { PixelButton } from '../common';
import { achievements } from '../../data/achievements';
import { characterStats } from '../../data/characterStatistics';
import { calculateCurrentLevel, CHARACTER_CONFIG, getCareerMilestones } from '../../data/characterConfig';

const AboutPage = ({ onNavigate }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showCurrentStatus, setShowCurrentStatus] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const currentLevel = calculateCurrentLevel();
  const careerMilestones = getCareerMilestones();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fullText = `A seasoned Backend Adventurer with ${currentLevel} years of professional experience, who has mastered the arcane arts of microservices architecture and RESTful API design since beginning the coding journey in 2018. Known throughout the digital realm for crafting scalable systems and optimizing server performance in the most challenging environments. This ${careerMilestones.careerPhase}-level developer has earned legendary status among peers for delivering robust, high-performance solutions that stand the test of time.`;

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
      // Show stats after typing completes
      setTimeout(() => setShowStats(true), 500);
      setTimeout(() => setShowAchievements(true), 1000);
      setTimeout(() => setShowCurrentStatus(true), 1300);
    }
  }, [currentIndex, fullText]);

  // Skip typewriter function
  const handleSkipTypewriter = () => {
    if (!isTypingComplete) {
      setDisplayedText(fullText);
      setCurrentIndex(fullText.length);
      setIsTypingComplete(true);
      setShowStats(true);
      setShowAchievements(true);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400 border-yellow-400 bg-yellow-900';
      case 'epic': return 'text-purple-400 border-purple-400 bg-purple-900';
      case 'rare': return 'text-blue-400 border-blue-400 bg-blue-900';
      default: return 'text-gray-400 border-gray-400 bg-gray-900';
    }
  };

  const handleStatHover = (stat) => {
    setSelectedStat(stat);
  };

  if (isMobile) {
    // Mobile Layout: Backstory first, then stats, then achievements
    return (
      <div className="py-4 animate-fade-in">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3 animate-bounce">👨🏻‍💻</div>
          <h2 className="text-2xl font-bold text-green-400 font-mono mb-3 pixel-glow">
            📜 CHARACTER PROFILE
          </h2>
          <div className="flex justify-center items-center gap-2 mb-3">
            <div className="bg-gray-800 px-3 py-1 pixel-border">
              <span className="text-green-400 font-mono font-bold text-xs">LVL {currentLevel}</span>
            </div>
            <div className="bg-gray-800 px-3 py-1 pixel-border">
              <span className="text-blue-400 font-mono font-bold text-xs">{CHARACTER_CONFIG.title}</span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="bg-purple-900 px-2 py-1 border border-purple-400 rounded">
              <span className="text-purple-300 font-mono text-xs font-bold">{careerMilestones.careerPhase}</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Online"></div>
          </div>
        </div>

        {/* Mobile Backstory Section - First */}
        <div className="mb-6">
          <div className="bg-gray-800 bg-opacity-90 pixel-border">
            <div className="bg-gradient-to-r from-purple-900 to-purple-800 px-4 py-3 border-b-2 border-purple-400">
              <h3 className="text-lg font-bold text-purple-400 font-mono">📜 BACKSTORY</h3>
            </div>
            
            <div className="p-4">
              <div 
                className="bg-gray-900 p-4 rounded-lg border-2 border-green-400 min-h-32 relative cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={handleSkipTypewriter}
              >
                <div className="absolute -top-1 left-4 w-3 h-3 bg-gray-900 border-l-2 border-t-2 border-green-400 transform rotate-45"></div>
                
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🗣️</div>
                  <div className="flex-1">
                    <div className="text-green-400 font-mono font-bold text-xs mb-2">
                      Adventurer {CHARACTER_CONFIG.name} says:
                    </div>
                    <p className="text-gray-300 font-mono leading-relaxed text-xs min-h-[60px]">
                      {displayedText}
                      {!isTypingComplete && (
                        <span className="animate-blink text-green-400 ml-1">|</span>
                      )}
                    </p>
                  </div>
                </div>
                
                {!isTypingComplete && (
                  <div className="absolute top-2 right-3">
                    <span className="text-gray-500 font-mono text-xs opacity-60 animate-pulse">Click to skip</span>
                  </div>
                )}
                
                {isTypingComplete && (
                  <div className="absolute bottom-2 right-3 animate-bounce">
                    <span className="text-green-400 font-mono text-xs">✨</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Character Stats */}
        <div className={`mb-6 transition-all duration-500 ${showStats ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
          <div className="bg-gray-800 bg-opacity-90 pixel-border">
            <div className="bg-gradient-to-r from-green-900 to-green-800 px-4 py-3 border-b-2 border-green-400">
              <h3 className="text-lg font-bold text-green-400 font-mono">📊 CHARACTER STATS</h3>
            </div>
            <div className="p-4 space-y-3">
              {characterStats.map((stat, index) => (
                <div 
                  key={stat.key}
                  className={`p-3 bg-gray-900 bg-opacity-50 pixel-border hover:bg-opacity-70 transition-all duration-300 cursor-pointer animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => handleStatHover(stat)}
                  onMouseLeave={() => setSelectedStat(null)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{stat.icon}</span>
                      <span className="text-gray-300 font-mono text-xs">{stat.label}:</span>
                    </div>
                    <span className="text-green-400 font-mono font-bold text-xs">{stat.value}</span>
                  </div>
                  {selectedStat?.key === stat.key && (
                    <div className="mt-2 text-gray-400 font-mono text-xs animate-fade-in">
                      {stat.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Achievements */}
        <div className={`mb-6 transition-all duration-700 ${showAchievements ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
          <div className="bg-gray-800 bg-opacity-90 pixel-border">
            <div className="bg-gradient-to-r from-yellow-900 to-yellow-800 px-4 py-3 border-b-2 border-yellow-400">
              <h3 className="text-lg font-bold text-yellow-400 font-mono flex items-center justify-between">
                🏆 ACHIEVEMENTS
                <span className="text-sm text-yellow-300">{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
              </h3>
            </div>
            
            <div className="p-4">
              <div className="grid gap-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={achievement.id}
                    className={`p-3 rounded-lg border-2 ${getRarityColor(achievement.rarity)} bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="flex items-start gap-2">
                      <div className="text-lg">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className={`font-mono font-bold text-xs mb-1 ${getRarityColor(achievement.rarity).split(' ')[0]}`}>
                          {achievement.name}
                        </h4>
                        <p className="text-gray-300 font-mono text-xs leading-relaxed">
                          {achievement.description}
                        </p>
                        <div className="mt-2">
                          <span className={`text-xs font-mono px-2 py-1 rounded border ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Current Status */}
        <div className={`mb-6 transition-all duration-900 ${showCurrentStatus ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
          <div className="bg-gray-800 bg-opacity-90 pixel-border">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-3 border-b-2 border-blue-400">
              <h3 className="text-lg font-bold text-blue-400 font-mono">⚡ CURRENT STATUS</h3>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-gray-900 bg-opacity-50 pixel-border">
                  <div className="text-lg mb-1">🎯</div>
                  <h4 className="text-green-400 font-mono font-bold text-xs mb-1">QUEST</h4>
                  <p className="text-gray-300 font-mono text-xs">Building Systems</p>
                </div>
                
                <div className="text-center p-3 bg-gray-900 bg-opacity-50 pixel-border">
                  <div className="text-lg mb-1">🔥</div>
                  <h4 className="text-orange-400 font-mono font-bold text-xs mb-1">STREAK</h4>
                  <p className="text-gray-300 font-mono text-xs">365 Days</p>
                </div>
                
                <div className="text-center p-3 bg-gray-900 bg-opacity-50 pixel-border">
                  <div className="text-lg mb-1">🚀</div>
                  <h4 className="text-purple-400 font-mono font-bold text-xs mb-1">PROGRESS</h4>
                  <p className="text-gray-300 font-mono text-xs">{careerMilestones.careerPhase}</p>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-3">
                  <span className="text-gray-400 font-mono text-xs">Ready to collaborate on your next adventure?</span>
                </div>
                <div className="flex flex-col gap-2">
                  <PixelButton className="w-full justify-center" onClick={() => onNavigate('projects')}>
                    ⚔️ VIEW QUESTS
                  </PixelButton>
                  <PixelButton className="w-full justify-center" onClick={() => onNavigate('contact')}>
                    🤝 START COLLABORATION
                  </PixelButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout: Main content on left, stats on right (switched positions)
  return (
    <div className="py-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-bounce">👨🏻‍💻</div>
        <h2 className="text-4xl font-bold text-green-400 font-mono mb-4 pixel-glow">
          📜 CHARACTER PROFILE
        </h2>
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="bg-gray-800 px-4 py-2 pixel-border">
            <span className="text-green-400 font-mono font-bold">LVL {currentLevel}</span>
          </div>
          <div className="bg-gray-800 px-4 py-2 pixel-border">
            <span className="text-blue-400 font-mono font-bold">{CHARACTER_CONFIG.title}</span>
          </div>
          <div className="bg-purple-900 px-3 py-1 border border-purple-400 rounded">
            <span className="text-purple-300 font-mono text-xs font-bold">{careerMilestones.careerPhase}</span>
          </div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" title="Online"></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area - NOW ON LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Backstory Section with Skippable Typewriter */}
          <div className="bg-gray-800 bg-opacity-90 pixel-border">
            <div className="bg-gradient-to-r from-purple-900 to-purple-800 px-6 py-4 border-b-2 border-purple-400">
              <h3 className="text-2xl text-purple-400 font-mono font-bold">📜 BACKSTORY</h3>
            </div>
            
            <div className="p-6">
              <div 
                className="bg-gray-900 p-6 rounded-lg border-2 border-green-400 min-h-48 relative cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={handleSkipTypewriter}
              >
                <div className="absolute -top-2 left-6 w-4 h-4 bg-gray-900 border-l-2 border-t-2 border-green-400 transform rotate-45"></div>
                
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🗣️</div>
                  <div className="flex-1">
                    <div className="text-green-400 font-mono font-bold text-sm mb-2">
                      Adventurer {CHARACTER_CONFIG.name} says:
                    </div>
                    <p className="text-gray-300 font-mono leading-relaxed text-sm min-h-[100px]">
                      {displayedText}
                      {!isTypingComplete && (
                        <span className="animate-blink text-green-400 ml-1">|</span>
                      )}
                    </p>
                  </div>
                </div>
                
                {!isTypingComplete && (
                  <div className="absolute top-2 right-3">
                    <span className="text-gray-500 font-mono text-xs opacity-60 animate-pulse">Click to skip</span>
                  </div>
                )}
                
                {isTypingComplete && (
                  <div className="absolute bottom-3 right-4 animate-bounce">
                    <span className="text-green-400 font-mono text-xs">✨</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className={`transition-all duration-700 ${showAchievements ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <div className="bg-gray-800 bg-opacity-90 pixel-border">
              <div className="bg-gradient-to-r from-yellow-900 to-yellow-800 px-6 py-4 border-b-2 border-yellow-400">
                <h3 className="text-2xl text-yellow-400 font-mono font-bold flex items-center justify-between">
                  🏆 ACHIEVEMENTS UNLOCKED
                  <span className="text-sm text-yellow-300">{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
                </h3>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 ${getRarityColor(achievement.rarity)} bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className={`font-mono font-bold text-sm mb-1 ${getRarityColor(achievement.rarity).split(' ')[0]}`}>
                            {achievement.name}
                          </h4>
                          <p className="text-gray-300 font-mono text-xs leading-relaxed">
                            {achievement.description}
                          </p>
                          <div className="mt-2">
                            <span className={`text-xs font-mono px-2 py-1 rounded border ${getRarityColor(achievement.rarity)}`}>
                              {achievement.rarity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Current Status & Actions */}
          
          <div className={`transition-all duration-900 ${showAchievements ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <div className="bg-gray-800 bg-opacity-90 pixel-border">
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 border-b-2 border-blue-400">
                <h3 className="text-2xl text-blue-400 font-mono font-bold">⚡ CURRENT STATUS</h3>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-900 bg-opacity-50 pixel-border">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="text-green-400 font-mono font-bold text-sm mb-2">ACTIVE QUEST</h4>
                    <p className="text-gray-300 font-mono text-xs">Building Scalable Systems</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-900 bg-opacity-50 pixel-border">
                    <div className="text-2xl mb-2">🔥</div>
                    <h4 className="text-orange-400 font-mono font-bold text-sm mb-2">STREAK</h4>
                    <p className="text-gray-300 font-mono text-xs">365 Days Coding</p>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-900 bg-opacity-50 pixel-border">
                    <div className="text-2xl mb-2">🚀</div>
                    <h4 className="text-purple-400 font-mono font-bold text-sm mb-2">CAREER PROGRESSION</h4>
                    <p className="text-gray-300 font-mono text-xs">2018 → {careerMilestones.careerPhase}</p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <div className="mb-4">
                    <span className="text-gray-400 font-mono text-sm">Ready to collaborate on your next adventure?</span>
                  </div>
                  <div className="flex justify-center gap-4">
                    <PixelButton onClick={() => onNavigate('projects')}>
                      ⚔️ VIEW QUESTS
                    </PixelButton>
                    <PixelButton onClick={() => onNavigate('contact')}>
                      🤝 START COLLABORATION
                    </PixelButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Character Stats Panel - NOW ON RIGHT */}
        <div className={`lg:col-span-1 transition-all duration-500 ${showStats ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
          <div className="bg-gray-800 bg-opacity-90 pixel-border">
            <div className="bg-gradient-to-r from-green-900 to-green-800 px-6 py-4 border-b-2 border-green-400">
              <h3 className="text-2xl text-green-400 font-mono font-bold flex items-center gap-2">
                📊 CHARACTER STATS
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {characterStats.map((stat, index) => (
                <div 
                  key={stat.key}
                  className={`p-3 bg-gray-900 bg-opacity-50 pixel-border hover:bg-opacity-70 transition-all duration-300 cursor-pointer animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => handleStatHover(stat)}
                  onMouseLeave={() => setSelectedStat(null)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-gray-300 font-mono text-sm">{stat.label}:</span>
                    </div>
                    <span className="text-green-400 font-mono font-bold text-sm">{stat.value}</span>
                  </div>
                  {selectedStat?.key === stat.key && (
                    <div className="mt-2 text-gray-400 font-mono text-xs animate-fade-in">
                      {stat.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 