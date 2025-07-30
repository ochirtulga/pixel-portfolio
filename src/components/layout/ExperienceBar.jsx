import React, { useState, useEffect } from 'react';

const ExperienceBar = () => {
  const [experienceData, setExperienceData] = useState({ 
    percentage: 0, 
    daysUntilBirthday: 0, 
    currentAge: 0,
    nextLevel: 0
  });

  // Calculate experience based on birthday progress
  useEffect(() => {
    const calculateExperience = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      
      // Set your birthday here (month is 0-indexed, so January = 0, December = 11)
      const birthday = new Date(currentYear, 4, 19);
      const birthYear = 1998; 
      
      // If birthday has passed this year, calculate for next year
      if (today > birthday) {
        birthday.setFullYear(currentYear + 1);
      }
      
      // Calculate last birthday
      const lastBirthday = new Date(birthday);
      lastBirthday.setFullYear(birthday.getFullYear() - 1);
      
      // Calculate progress
      const totalDaysInYear = Math.ceil((birthday - lastBirthday) / (1000 * 60 * 60 * 24));
      const daysPassed = Math.ceil((today - lastBirthday) / (1000 * 60 * 60 * 24));
      const daysUntilBirthday = Math.ceil((birthday - today) / (1000 * 60 * 60 * 24));
      
      const percentage = Math.min((daysPassed / totalDaysInYear) * 100, 100);
      
      // Calculate current age and next level
      const currentAge = currentYear - birthYear;
      const nextLevel = currentAge + 1;
      
      setExperienceData({
        percentage: percentage,
        daysUntilBirthday: daysUntilBirthday,
        currentAge: currentAge,
        nextLevel: nextLevel
      });
    };

    calculateExperience();
    
    // Update every hour
    const interval = setInterval(calculateExperience, 1000 * 60 * 60);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-gray-900 bg-opacity-95 border-t-2 border-green-400 p-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center">
          
          {/* Level Info */}
          <div className="flex items-center gap-4">
            <div className="text-green-400 font-mono font-bold text-sm">
              LVL {experienceData.currentAge}
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
            
            {/* Days Until Birthday */}
            <div className="text-yellow-400 font-mono text-xs">
              {experienceData.daysUntilBirthday} exp to level up
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ExperienceBar;