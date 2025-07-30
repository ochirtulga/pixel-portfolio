import React from 'react';

const SkillNode = ({ skill, selectedSkill, setSelectedSkill, arePrerequisitesMet }) => {
  const isUnlocked = skill.unlocked;
  const canUnlock = !isUnlocked && arePrerequisitesMet(skill);
  const isSelected = selectedSkill?.id === skill.id;

  const getTierColor = (tier) => {
    switch (tier) {
      case 'easy': return 'bg-green-200 border-green-600';
      case 'normal': return 'bg-yellow-200 border-yellow-600';
      case 'hard': return 'bg-orange-200 border-orange-600';
      case 'godlike': return 'bg-red-200 border-red-600';
      default: return 'bg-gray-200 border-gray-600';
    }
  };

  const tierColor = getTierColor(skill.tier);
  const lockedColor = 'bg-blue-300 border-blue-600 opacity-50';

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
      
      {/* Skill level indicator */}
      {isUnlocked && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-xs text-white font-bold border border-purple-800">
          {Math.floor(skill.level / 10)}
        </div>
      )}
    </div>
  );
};

export default SkillNode;