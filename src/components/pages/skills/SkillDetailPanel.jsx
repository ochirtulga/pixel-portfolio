import React from 'react';

const SkillDetailPanel = ({ selectedSkill, getSkill, arePrerequisitesMet }) => {
  const getTierColor = (tier) => {
    switch (tier) {
      case 'novice': return 'bg-green-200 border-green-600';
      case 'apprentice': return 'bg-blue-200 border-blue-600';
      case 'adept': return 'bg-purple-200 border-purple-600';
      case 'master': return 'bg-orange-200 border-orange-600';
      default: return 'bg-gray-200 border-gray-600';
    }
  };

  const getTierTextColor = (tier) => {
    switch (tier) {
      case 'novice': return 'text-green-800';
      case 'apprentice': return 'text-blue-800';
      case 'adept': return 'text-purple-800';
      case 'master': return 'text-orange-800';
      default: return 'text-gray-800';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'novice': return '🟢';
      case 'apprentice': return '🔵';
      case 'adept': return '🟣';
      case 'master': return '🟠';
      default: return '⚪';
    }
  };

  const getTierDescription = (tier) => {
    switch (tier) {
      case 'novice': return 'Foundation skills - Starting your journey';
      case 'apprentice': return 'Intermediate skills - Building competency';
      case 'adept': return 'Advanced skills - Demonstrating mastery';
      case 'master': return 'Expert skills - Leading and innovating';
      default: return 'Unknown skill tier';
    }
  };

  return (
    <div className="w-80 bg-yellow-50 border-l-4 border-yellow-800 p-6">
      <div className="bg-white rounded border-2 border-yellow-600 p-4 shadow-inner min-h-96">
        {selectedSkill ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className={`
                w-12 h-12 rounded border-2 flex items-center justify-center text-2xl
                ${selectedSkill.unlocked 
                  ? getTierColor(selectedSkill.tier)
                  : 'bg-gray-200 border-gray-500'
                }
              `}>
                {selectedSkill.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-900 font-mono">{selectedSkill.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg">{getTierIcon(selectedSkill.tier)}</span>
                  <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${getTierColor(selectedSkill.tier)} ${getTierTextColor(selectedSkill.tier)}`}>
                    {selectedSkill.tier ? selectedSkill.tier.toUpperCase() : 'UNKNOWN'} TIER
                  </span>
                </div>
                {selectedSkill.unlocked && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-purple-600 font-mono text-sm font-bold">
                      RANK {Math.floor(selectedSkill.level / 10)}
                    </span>
                    <div className="flex-1 h-2 bg-gray-300 rounded overflow-hidden">
                      <div 
                        className="h-full bg-purple-600 transition-all duration-500"
                        style={{ width: `${selectedSkill.level}%` }}
                      />
                    </div>
                    <span className="text-purple-600 font-mono text-xs">{selectedSkill.level}%</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Tier Description */}
            <div className="mb-4 p-3 bg-yellow-100 rounded border border-yellow-400">
              <div className="text-yellow-800 font-mono text-xs font-bold mb-1">
                {getTierIcon(selectedSkill.tier)} {selectedSkill.tier?.toUpperCase()} TIER
              </div>
              <div className="text-yellow-700 font-mono text-xs">
                {getTierDescription(selectedSkill.tier)}
              </div>
            </div>
            
            <p className="text-yellow-800 font-mono text-sm leading-relaxed mb-4 bg-yellow-50 p-3 rounded border">
              {selectedSkill.description}
            </p>
            
            {selectedSkill.prerequisites && selectedSkill.prerequisites.length > 0 && (
              <div className="mb-4">
                <h4 className="text-yellow-900 font-mono font-bold text-sm mb-2">PREREQUISITES:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.prerequisites.map(prereqId => {
                    const prereq = getSkill(prereqId);
                    return (
                      <span 
                        key={prereqId}
                        className={`px-2 py-1 rounded font-mono text-xs border ${
                          prereq?.unlocked 
                            ? 'bg-green-200 text-green-800 border-green-400' 
                            : 'bg-red-200 text-red-800 border-red-400'
                        }`}
                      >
                        {prereq?.icon} {prereq?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className={`text-center py-2 px-4 rounded font-mono font-bold border-2 ${
              selectedSkill.unlocked 
                ? 'bg-green-200 text-green-800 border-green-600' 
                : arePrerequisitesMet(selectedSkill)
                  ? 'bg-blue-200 text-blue-800 border-blue-600'
                  : 'bg-gray-200 text-gray-600 border-gray-400'
            }`}>
              {selectedSkill.unlocked 
                ? '⭐ MASTERED' 
                : arePrerequisitesMet(selectedSkill)
                  ? '🔓 READY TO LEARN'
                  : '🔒 LOCKED'
              }
            </div>
          </>
        ) : (
          <div className="text-center text-yellow-600 font-mono h-full flex flex-col justify-center">
            <div className="text-4xl mb-4">📜</div>
            <p>Select a skill to view its details</p>
            <p className="mt-2 text-sm">Click on any skill icon in the grimoire</p>
          </div>
        )}
      </div>
      
      {/* Professional Tier Legend */}
      <div className="mt-4 space-y-2">
        <h4 className="text-yellow-900 font-mono font-bold text-sm">PROFESSIONAL TIERS:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 border border-green-600 rounded"></div>
            <span className="text-green-700 font-mono font-bold">NOVICE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 border border-blue-600 rounded"></div>
            <span className="text-blue-700 font-mono font-bold">APPRENTICE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-200 border border-purple-600 rounded"></div>
            <span className="text-purple-700 font-mono font-bold">ADEPT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-200 border border-orange-600 rounded"></div>
            <span className="text-orange-700 font-mono font-bold">MASTER</span>
          </div>
        </div>
        
        {/* Progression Path */}
        <div className="mt-3 p-2 bg-yellow-100 rounded border border-yellow-400">
          <div className="text-yellow-800 font-mono text-xs font-bold mb-1">PROGRESSION PATH:</div>
          <div className="text-yellow-700 font-mono text-xs">
            Novice → Apprentice → Adept → Master
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailPanel;