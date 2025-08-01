import React, { useState, useEffect } from 'react';
import { skillCategories } from '../../data/skillData';
import { SkillNode, SkillDetailPanel } from './skills';

const SkillsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('fundamentals');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get current category data
  const currentCategory = skillCategories[selectedCategory];
  const allSkills = currentCategory.skills;

  // Get skill by ID
  const getSkill = (id) => allSkills.find(skill => skill.id === id);

  // Check if skill prerequisites are met
  const arePrerequisitesMet = (skill) => {
    return skill.prerequisites.every(prereqId => {
      const prereq = getSkill(prereqId);
      return prereq && prereq.unlocked;
    });
  };

  // Group skills by tier
  const skillsByTier = {
    novice: allSkills.filter(skill => skill.tier === 'novice'),
    apprentice: allSkills.filter(skill => skill.tier === 'apprentice'),
    adept: allSkills.filter(skill => skill.tier === 'adept'),
    master: allSkills.filter(skill => skill.tier === 'master')
  };

  // Tier configurations
  const tierConfig = {
    novice: {
      name: 'NOVICE',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-400',
      textColor: 'text-green-800',
      headerBg: 'bg-green-200'
    },
    apprentice: {
      name: 'APPRENTICE',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-800',
      headerBg: 'bg-yellow-200'
    },
    adept: {
      name: 'ADEPT',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-400',
      textColor: 'text-orange-800',
      headerBg: 'bg-orange-200'
    },
    master: {
      name: 'MASTER',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-400',
      textColor: 'text-red-800',
      headerBg: 'bg-red-200'
    }
  };

  // Handle skill selection on mobile
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    if (isMobile) {
      setShowMobilePanel(true);
    }
  };

  // Close mobile panel
  const closeMobilePanel = () => {
    setShowMobilePanel(false);
    setSelectedSkill(null);
  };

  if (isMobile) {
    return (
      <div className="py-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-green-400 font-mono mb-6 pixel-glow text-center">
          📗 SKILL GRIMOIRE
        </h2>
        
        {/* Mobile Category Selector */}
        <div className="mb-4 px-2">
          <div className="bg-yellow-100 rounded-lg border-2 border-yellow-800 p-2">
            <select 
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSkill(null);
                setShowMobilePanel(false);
              }}
              className="w-full bg-yellow-200 border-2 border-yellow-600 rounded p-2 font-mono font-bold text-yellow-900 text-sm"
            >
              {Object.entries(skillCategories).map(([key, category]) => (
                <option key={key} value={key}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Skills Grid */}
        <div className="px-2">
          <div className="bg-yellow-50 rounded-lg border-2 border-yellow-600 p-3">
            <h3 className="text-lg font-bold text-yellow-900 font-mono mb-4 text-center">
              {currentCategory.icon} {currentCategory.name}
            </h3>
            
            {/* Mobile Tier Sections - Collapsible */}
            <div className="space-y-3">
              {Object.entries(tierConfig).map(([tier, config]) => (
                <div key={tier} className="space-y-2">
                  <details className="group" open={tier === 'novice'}>
                    <summary className={`
                      ${config.headerBg} ${config.textColor} px-3 py-2 rounded-md cursor-pointer 
                      font-mono font-bold text-sm text-center list-none
                      group-open:rounded-b-none
                    `}>
                      <div className="flex items-center justify-center gap-2">
                        {tier === 'novice' && '🟢'}
                        {tier === 'apprentice' && '🟡'}
                        {tier === 'adept' && '🟠'}
                        {tier === 'master' && '🔴'}
                        <span>{config.name} TIER</span>
                        <span className="text-xs ml-auto group-open:rotate-180 transition-transform">▼</span>
                      </div>
                    </summary>
                    
                    <div className={`${config.bgColor} ${config.borderColor} border-2 border-t-0 rounded-b-md p-3`}>
                      <div className="grid grid-cols-3 gap-3">
                        {skillsByTier[tier].map(skill => (
                          <div key={skill.id} className="flex flex-col items-center">
                            <div 
                              onClick={() => handleSkillClick(skill)}
                              className="cursor-pointer"
                            >
                              <SkillNode 
                                skill={skill}
                                selectedSkill={selectedSkill}
                                setSelectedSkill={handleSkillClick}
                                arePrerequisitesMet={arePrerequisitesMet}
                              />
                            </div>
                            <div className="text-center mt-1">
                              <span className={`text-xs font-mono font-bold ${config.textColor} text-center leading-tight`}>
                                {skill.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Skill Detail Modal */}
        {showMobilePanel && selectedSkill && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-yellow-50 rounded-lg border-4 border-yellow-800 w-full max-w-md max-h-[80vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-yellow-200 border-b-2 border-yellow-600 p-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-yellow-900 font-mono">Skill Details</h3>
                <button 
                  onClick={closeMobilePanel}
                  className="text-yellow-900 font-bold text-xl hover:text-yellow-700"
                >
                  ✕
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-4">
                <SkillDetailPanel 
                  selectedSkill={selectedSkill}
                  getSkill={getSkill}
                  arePrerequisitesMet={arePrerequisitesMet}
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Legend */}
        <div className="mt-4 px-2">
          <div className="bg-gray-800 bg-opacity-80 rounded-lg border-2 border-green-400 p-3">
            <h4 className="text-green-400 font-mono font-bold text-sm mb-2 text-center">TIER LEGEND</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 border border-green-600 rounded"></div>
                <span className="text-green-300 font-mono font-bold">NOVICE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-200 border border-yellow-600 rounded"></div>
                <span className="text-yellow-300 font-mono font-bold">APPRENTICE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-200 border border-orange-600 rounded"></div>
                <span className="text-orange-300 font-mono font-bold">ADEPT</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-200 border border-red-600 rounded"></div>
                <span className="text-red-300 font-mono font-bold">MASTER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Original layout
  return (
    <div className="py-4 animate-fade-in">
      <h2 className="text-3xl font-bold text-green-400 font-mono mb-8 pixel-glow text-center">
        📗 SKILL GRIMOIRE
      </h2>
      
      {/* Book Container */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-lg shadow-2xl border-4 border-yellow-800 relative">
          {/* Book Spine Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-yellow-900 to-yellow-700 rounded-l-lg border-r-2 border-yellow-600"></div>
          
          {/* Category Bookmarks */}
          <div className="ml-3 flex border-b-4 border-yellow-800 overflow-x-auto">
            {Object.entries(skillCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCategory(key);
                  setSelectedSkill(null);
                }}
                className={`
                px-7 py-2 font-bold font-mono text-sm flex items-center gap-2 border-r-2 border-yellow-800 transition-all duration-300 flex-shrink-0 min-w-max
                  ${selectedCategory === key 
                    ? `bg-${category.color}-400 text-white shadow-inner` 
                    : 'bg-yellow-300 hover:bg-yellow-200 text-yellow-900'
                  }
                `}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
          
          <div className="flex">
            {/* Skills Grid */}
            <div className="flex-1 p-4">
              <h3 className="text-2xl font-bold text-yellow-900 font-mono mb-6 text-center">
                {currentCategory.icon} {currentCategory.name}
              </h3>
              
              {/* Desktop Skill Lanes */}
              <div className="bg-yellow-50 p-6 rounded border-2 border-yellow-600 shadow-inner">
                <div className="space-y-2">
                  {Object.entries(tierConfig).map(([tier, config]) => (
                    <div key={tier} className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg p-3`}>
                      <div className={`${config.headerBg} ${config.textColor} px-3 py-2 rounded-md mb-3 text-center font-mono font-bold text-lg`}>
                        {tier === 'novice' && '🟢'} 
                        {tier === 'apprentice' && '🟡'} 
                        {tier === 'adept' && '🟠'} 
                        {tier === 'master' && '🔴'} 
                        {config.name} TIER
                      </div>
                      <div className="grid grid-cols-3 gap-4 place-items-center">
                        {skillsByTier[tier].map(skill => (
                          <div key={skill.id} className="flex flex-col items-center">
                            <SkillNode 
                              skill={skill}
                              selectedSkill={selectedSkill}
                              setSelectedSkill={setSelectedSkill}
                              arePrerequisitesMet={arePrerequisitesMet}
                            />
                            <div className="text-center mt-1">
                              <span className={`text-xs font-mono font-bold ${config.textColor}`}>
                                {skill.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Desktop Skill Details Panel */}
            <SkillDetailPanel 
              selectedSkill={selectedSkill}
              getSkill={getSkill}
              arePrerequisitesMet={arePrerequisitesMet}
            />
          </div>
          
          {/* Book Bottom */}
          <div className="h-4 bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-800 rounded-b-lg border-t-2 border-yellow-600"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;