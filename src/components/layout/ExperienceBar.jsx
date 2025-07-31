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

  // Calculate experience based on career anniversary progress
  useEffect(() => {
    const updateExperienceData = () => {
      const data = calculateExperienceData();
      const milestones = getCareerMilestones();
      setExperienceData(data);
      setCareerMilestones(milestones);
    };

    // Initial calculation
    updateExperienceData();
    
    // Update every hour
    const interval = setInterval(updateExperienceData, 1000 * 60 * 60);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-gray-900 bg-opacity-95 border-t-2 border-green-400 p-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center">
          
          {/* Career Level Info */}
          <div className="flex items-center gap-4">
            <div className="text-green-400 font-mono font-bold text-sm">
              LVL {experienceData.currentLevel}
            </div>
            
            {/* Career Phase Badge */}
            <div className="bg-purple-900 px-2 py-1 border border-purple-400 rounded">
              <span className="text-purple-300 font-mono text-xs font-bold">
                {careerMilestones.careerPhase}
              </span>
            </div>
            
            {/* Experience Bar */}
            <div className="flex items-center gap-2">
              <div className="w-96 h-4 bg-gray-800 pixel-border relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-1000 ease-out"
                  style={{ width: `${experienceData.percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-gray-900 font-bold font-mono text-xs">
                  {Math.floor(experienceData.percentage)}% to LVL {experienceData.nextLevel}
                </div>
              </div>
            </div>
            
            {/* Days Until Career Anniversary */}
            <div className="text-yellow-400 font-mono text-xs">
              {experienceData.daysUntilAnniversary} days to anniversary
            </div>
            
            {/* Career Start Year */}
            <div className="text-blue-400 font-mono text-xs">
              Since 2018
            </div>
          </div>
          
        </div>
        
        {/* Additional Career Info on Hover */}
        <div className="text-center mt-1">
          <span className="text-gray-500 font-mono text-xs">
            Professional Developer • {careerMilestones.experienceYears} Experience
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceBar;