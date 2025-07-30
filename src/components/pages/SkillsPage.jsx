import React, { useState } from 'react';
import { skillCategories } from '../../data/skillData';
import SkillNode from './SkillNode';
import SkillDetailPanel from './SkillDetailPanel';

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
    easy: allSkills.filter(skill => skill.tier === 'easy'),
    normal: allSkills.filter(skill => skill.tier === 'normal'),
    hard: allSkills.filter(skill => skill.tier === 'hard'),
    godlike: allSkills.filter(skill => skill.tier === 'godlike')
  };

  // Tier configurations
  const tierConfig = {
    easy: {
      name: 'EASY',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-400',
      textColor: 'text-green-800',
      headerBg: 'bg-green-200'
    },
    normal: {
      name: 'NORMAL',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-800',
      headerBg: 'bg-yellow-200'
    },
    hard: {
      name: 'HARD',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-400',
      textColor: 'text-orange-800',
      headerBg: 'bg-orange-200'
    },
    godlike: {
      name: 'GODLIKE',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-400',
      textColor: 'text-red-800',
      headerBg: 'bg-red-200'
    }
  };

  return (
    <div className="py-4 animate-fade-in">
      <h2 className="text-4xl font-bold text-green-400 font-mono mb-8 pixel-glow text-center">
        📗 SKILL GRIMOIRE
      </h2>
      
      {/* Book Container */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-lg shadow-2xl border-4 border-yellow-800 relative">
          {/* Book Spine Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-yellow-900 to-yellow-700 rounded-l-lg border-r-2 border-yellow-600"></div>
          
          {/* Category Bookmarks */}
          <div className="ml-6 flex border-b-4 border-yellow-800 overflow-x-auto">
            {Object.entries(skillCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCategory(key);
                  setSelectedSkill(null);
                }}
                className={`
                  px-3 py-2 font-bold font-mono text-sm flex items-center gap-2 border-r-2 border-yellow-800 transition-all duration-300 flex-shrink-0 min-w-max
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
                <div className="space-y-6">
                  {/* Easy Lane */}
                  <div className={`${tierConfig.easy.bgColor} ${tierConfig.easy.borderColor} border-2 rounded-lg p-3`}>
                    <div className={`${tierConfig.easy.headerBg} ${tierConfig.easy.textColor} px-3 py-2 rounded-md mb-3 text-center font-mono font-bold text-lg`}>
                      🟢 {tierConfig.easy.name} TIER
                    </div>
                    <div className="grid grid-cols-3 gap-4 place-items-center">
                      {skillsByTier.easy.map(skill => (
                        <div key={skill.id} className="flex flex-col items-center">
                          <SkillNode 
                            skill={skill}
                            selectedSkill={selectedSkill}
                            setSelectedSkill={setSelectedSkill}
                            arePrerequisitesMet={arePrerequisitesMet}
                          />
                          <div className="text-center mt-1">
                            <span className={`text-xs font-mono font-bold ${tierConfig.easy.textColor}`}>
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Normal Lane */}
                  <div className={`${tierConfig.normal.bgColor} ${tierConfig.normal.borderColor} border-2 rounded-lg p-3`}>
                    <div className={`${tierConfig.normal.headerBg} ${tierConfig.normal.textColor} px-3 py-2 rounded-md mb-3 text-center font-mono font-bold text-lg`}>
                      🟡 {tierConfig.normal.name} TIER
                    </div>
                    <div className="grid grid-cols-3 gap-4 place-items-center">
                      {skillsByTier.normal.map(skill => (
                        <div key={skill.id} className="flex flex-col items-center">
                          <SkillNode 
                            skill={skill}
                            selectedSkill={selectedSkill}
                            setSelectedSkill={setSelectedSkill}
                            arePrerequisitesMet={arePrerequisitesMet}
                          />
                          <div className="text-center mt-1">
                            <span className={`text-xs font-mono font-bold ${tierConfig.normal.textColor}`}>
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hard Lane */}
                  <div className={`${tierConfig.hard.bgColor} ${tierConfig.hard.borderColor} border-2 rounded-lg p-3`}>
                    <div className={`${tierConfig.hard.headerBg} ${tierConfig.hard.textColor} px-3 py-2 rounded-md mb-3 text-center font-mono font-bold text-lg`}>
                      🟠 {tierConfig.hard.name} TIER
                    </div>
                    <div className="grid grid-cols-3 gap-4 place-items-center">
                      {skillsByTier.hard.map(skill => (
                        <div key={skill.id} className="flex flex-col items-center">
                          <SkillNode 
                            skill={skill}
                            selectedSkill={selectedSkill}
                            setSelectedSkill={setSelectedSkill}
                            arePrerequisitesMet={arePrerequisitesMet}
                          />
                          <div className="text-center mt-1">
                            <span className={`text-xs font-mono font-bold ${tierConfig.hard.textColor}`}>
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Godlike Lane */}
                  <div className={`${tierConfig.godlike.bgColor} ${tierConfig.godlike.borderColor} border-2 rounded-lg p-3`}>
                    <div className={`${tierConfig.godlike.headerBg} ${tierConfig.godlike.textColor} px-3 py-2 rounded-md mb-3 text-center font-mono font-bold text-lg`}>
                      🔴 {tierConfig.godlike.name} TIER
                    </div>
                    <div className="grid grid-cols-3 gap-4 place-items-center">
                      {skillsByTier.godlike.map(skill => (
                        <div key={skill.id} className="flex flex-col items-center">
                          <SkillNode 
                            skill={skill}
                            selectedSkill={selectedSkill}
                            setSelectedSkill={setSelectedSkill}
                            arePrerequisitesMet={arePrerequisitesMet}
                          />
                          <div className="text-center mt-2">
                            <span className={`text-xs font-mono font-bold ${tierConfig.godlike.textColor}`}>
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