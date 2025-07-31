import React, { useState } from 'react';
import { skillCategories } from '../../data/skillData';
import { SkillNode, SkillDetailPanel } from './skills';

const SkillsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('fundamentals');
  const [selectedSkill, setSelectedSkill] = useState(null);

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
              
              {/* Skill Lanes Container */}
              <div className="bg-yellow-50 p-6 rounded border-2 border-yellow-600 shadow-inner">
                <div className="space-y-2">
                  {/* novice Lane */}
                  <div className={`${tierConfig.novice.bgColor} ${tierConfig.novice.borderColor} border-2 rounded-lg p-3`}>
                    <div className={`${tierConfig.novice.headerBg} ${tierConfig.novice.textColor} px-3 py-2 rounded-md mb-3 text-center font-mono font-bold text-lg`}>
                      🟢 {tierConfig.novice.name} TIER
                    </div>
                    <div className="grid grid-cols-3 gap-4 place-items-center">
                      {skillsByTier.novice.map(skill => (
                        <div key={skill.id} className="flex flex-col items-center">
                          <SkillNode 
                            skill={skill}
                            selectedSkill={selectedSkill}
                            setSelectedSkill={setSelectedSkill}
                            arePrerequisitesMet={arePrerequisitesMet}
                          />
                          <div className="text-center mt-1">
                            <span className={`text-xs font-mono font-bold ${tierConfig.novice.textColor}`}>
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* apprentice Lane */}
                  <div className={`${tierConfig.apprentice.bgColor} ${tierConfig.apprentice.borderColor} border-2 rounded-lg p-3`}>
                    <div className={`${tierConfig.apprentice.headerBg} ${tierConfig.apprentice.textColor} px-3 py-2 rounded-md mb-3 text-center font-mono font-bold text-lg`}>
                      🟡 {tierConfig.apprentice.name} TIER
                    </div>
                    <div className="grid grid-cols-3 gap-4 place-items-center">
                      {skillsByTier.apprentice.map(skill => (
                        <div key={skill.id} className="flex flex-col items-center">
                          <SkillNode 
                            skill={skill}
                            selectedSkill={selectedSkill}
                            setSelectedSkill={setSelectedSkill}
                            arePrerequisitesMet={arePrerequisitesMet}
                          />
                          <div className="text-center mt-1">
                            <span className={`text-xs font-mono font-bold ${tierConfig.apprentice.textColor}`}>
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* adept Lane */}
                  <div className={`${tierConfig.adept.bgColor} ${tierConfig.adept.borderColor} border-2 rounded-lg p-3`}>
                    <div className={`${tierConfig.adept.headerBg} ${tierConfig.adept.textColor} px-3 py-2 rounded-md mb-3 text-center font-mono font-bold text-lg`}>
                      🟠 {tierConfig.adept.name} TIER
                    </div>
                    <div className="grid grid-cols-3 gap-4 place-items-center">
                      {skillsByTier.adept.map(skill => (
                        <div key={skill.id} className="flex flex-col items-center">
                          <SkillNode 
                            skill={skill}
                            selectedSkill={selectedSkill}
                            setSelectedSkill={setSelectedSkill}
                            arePrerequisitesMet={arePrerequisitesMet}
                          />
                          <div className="text-center mt-1">
                            <span className={`text-xs font-mono font-bold ${tierConfig.adept.textColor}`}>
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* master Lane */}
                  <div className={`${tierConfig.master.bgColor} ${tierConfig.master.borderColor} border-2 rounded-lg p-3`}>
                    <div className={`${tierConfig.master.headerBg} ${tierConfig.master.textColor} px-3 py-2 rounded-md mb-3 text-center font-mono font-bold text-lg`}>
                      🔴 {tierConfig.master.name} TIER
                    </div>
                    <div className="grid grid-cols-3 gap-4 place-items-center">
                      {skillsByTier.master.map(skill => (
                        <div key={skill.id} className="flex flex-col items-center">
                          <SkillNode 
                            skill={skill}
                            selectedSkill={selectedSkill}
                            setSelectedSkill={setSelectedSkill}
                            arePrerequisitesMet={arePrerequisitesMet}
                          />
                          <div className="text-center mt-2">
                            <span className={`text-xs font-mono font-bold ${tierConfig.master.textColor}`}>
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skill Details Panel */}
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