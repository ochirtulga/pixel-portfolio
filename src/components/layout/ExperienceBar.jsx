import React, { useState, useEffect } from 'react';
import { calculateExperienceData, getCareerMilestones } from '../../data/characterConfig';

const ExperienceBar = () => {
  const [experienceData, setExperienceData] = useState({ 
    percentage: 0, 
    daysUntilAnniversary: 0, 
    currentLevel: 0,
    nextLevel: 0
  });
  const [careerMilestones, setCareerMilestones] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateExperienceData = () => {
      const data = calculateExperienceData();
      const milestones = getCareerMilestones();
      setExperienceData(data);
      setCareerMilestones(milestones);
    };

    updateExperienceData();
    const interval = setInterval(updateExperienceData, 1000 * 60 * 60);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-gray-900 bg-opacity-95 border-t-2 border-green-400">
      <div className="max-w-6xl mx-auto p-2 md:p-3">
        {isMobile ? (
          // Mobile: Enhanced layout with progress bar + status
          <div className="space-y-2">
            {/* Top row: Level and progress bar */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-green-400 font-mono font-bold text-xs">
                  LVL {experienceData.currentLevel}
                </span>
                <span className="text-purple-300 font-mono text-xs">
                  {careerMilestones.careerPhase}
                </span>
              </div>
              
              {/* Mobile Progress Bar */}
              <div className="w-full h-3 bg-gray-800 rounded overflow-hidden mb-1">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-orange-400 transition-all duration-1000 ease-out"
                  style={{ width: `${experienceData.percentage}%` }}
                />
              </div>
              
              <div className="text-yellow-400 font-mono text-xs">
                {Math.floor(experienceData.percentage)}% to LVL {experienceData.nextLevel}
              </div>
            </div>

            {/* Bottom row: Status indicators */}
            <div className="flex items-center justify-between px-2 pt-1 border-t border-gray-600">
              {/* Online Status */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-xs font-bold">ONLINE</span>
              </div>
              
              {/* Available Status */}
              <div className="text-center">
                <span className="text-yellow-400 font-mono text-xs font-bold">
                  Available for New Quests
                </span>
              </div>
            </div>
          </div>
        ) : (
          // Desktop: Original horizontal layout with added status
          <div className="space-y-2">
            {/* Main experience bar row */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="text-green-400 font-mono font-bold text-sm">
                  LVL {experienceData.currentLevel}
                </div>
                
                <div className="bg-purple-900 px-2 py-1 border border-purple-400 rounded">
                  <span className="text-purple-300 font-mono text-xs font-bold">
                    {careerMilestones.careerPhase}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-96 h-4 bg-gray-800 pixel-border relative overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-400 to-orange-400 transition-all duration-1000 ease-out"
                      style={{ width: `${experienceData.percentage}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white-900 font-bold font-mono text-sm">
                      {Math.floor(experienceData.percentage)}% to LVL {experienceData.nextLevel}
                    </div>
                  </div>
                </div>
                
                <div className="text-yellow-400 font-mono text-xs">
                  {experienceData.daysUntilAnniversary} exp to reach next level
                </div>
              </div>
            </div>

            {/* Desktop status row */}
            <div className="flex items-center justify-between gap-6 pt-1 border-t border-gray-600">
              
              {/* Online Status */}
              {/* Available Status */}
              <div className="flex justify-center text-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-xs font-bold">ONLINE -</span>
                <span className="text-yellow-400 font-mono text-xs font-bold">
                  Available for New Quests
                </span>
              </div>
              <div>
                <span className="text-yellow-400 font-mono text-xs font-bold">
                  Built with ❤️ and lots of ☕ by Ochirtulga Namjim
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceBar;