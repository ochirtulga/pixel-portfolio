import React from 'react';

const SkillNode = ({ skill, selectedSkill, setSelectedSkill, arePrerequisitesMet }) => {
  const isUnlocked = skill.unlocked;
  const canUnlock = !isUnlocked && arePrerequisitesMet(skill);
  const isSelected = selectedSkill?.id === skill.id;

  const getTierColor = (tier) => {
    switch (tier) {
      case 'novice': return 'bg-green-200 border-green-600';
      case 'apprentice': return 'bg-blue-200 border-blue-600';
      case 'adept': return 'bg-purple-200 border-purple-600';
      case 'master': return 'bg-orange-200 border-orange-600';
      default: return 'bg-gray-200 border-gray-600';
    }
  };

  const tierColor = getTierColor(skill.tier);
  const lockedColor = 'bg-gray-300 border-gray-600 opacity-50';

  return (
    <div
      className={`
        w-16 h-16 rounded border-2 cursor-pointer transition-all duration-300 transform
        flex items-center justify-center text-2xl font-bold relative
        ${isUnlocked 
          ? `${tierColor} hover:scale-110 shadow-lg` 
          : canUnlock 
            ? `${tierColor} hover:scale-105 animate-pulse shadow-md opacity-75` 
            : `${lockedColor} cursor-not-allowed shadow-inner`
        }
        ${isSelected ? 'ring-4 ring-white scale-110' : ''}
      `}
      onClick={() => setSelectedSkill(skill)}
      onMouseEnter={() => !selectedSkill && setSelectedSkill(skill)}
      onMouseLeave={() => !selectedSkill && setSelectedSkill(null)}
    >
      <span className="drop-shadow-sm">{skill.icon}</span>
      
      {/* Professional rank indicator */}
      {isUnlocked && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-xs text-white font-bold border border-purple-800">
          {Math.floor(skill.level / 10)}
        </div>
      )}
      
      {/* Tier indicator dot */}
      <div className={`absolute -bottom-1 -left-1 w-3 h-3 rounded-full border ${
        skill.tier === 'novice' ? 'bg-green-500 border-green-700' :
        skill.tier === 'apprentice' ? 'bg-blue-500 border-blue-700' :
        skill.tier === 'adept' ? 'bg-purple-500 border-purple-700' :
        skill.tier === 'master' ? 'bg-orange-500 border-orange-700' :
        'bg-gray-500 border-gray-700'
      }`}></div>
    </div>
  );
};

export default SkillNode;