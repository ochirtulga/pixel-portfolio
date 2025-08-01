import React, { useState, useEffect } from 'react';
import { PixelButton } from '../common';
import { enhancedQuests } from '../../data/projects';

const QuestsPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedQuest, setExpandedQuest] = useState(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY': 
        return 'text-green-300 border-green-400 bg-green-900 shadow-green-400/20';
      case 'NORMAL': 
        return 'text-blue-300 border-blue-400 bg-blue-900 shadow-blue-400/20';
      case 'HARD': 
        return 'text-purple-300 border-purple-400 bg-purple-900 shadow-purple-400/20';
      case 'EXTREME': 
        return 'text-yellow-300 border-yellow-400 bg-yellow-900 shadow-yellow-400/20';
      default: 
        return 'text-gray-300 border-gray-400 bg-gray-900 shadow-gray-400/20';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'EASY': return '🟢';
      case 'NORMAL': return '🔵';
      case 'HARD': return '🟣';
      case 'EXTREME': return '🟡';
      default: return '⚪';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETE': return 'bg-green-400 text-gray-900';
      case 'IN PROGRESS': return 'bg-yellow-400 text-gray-900';
      case 'PLANNED': return 'bg-gray-600 text-gray-300';
      default: return 'bg-gray-600 text-gray-300';
    }
  };

  const toggleQuestExpansion = (questId) => {
    setExpandedQuest(expandedQuest === questId ? null : questId);
  };

  if (isMobile) {
    return (
      <div className="py-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-green-400 font-mono mb-2 pixel-glow text-center">
          ⚔️ QUEST LOG
        </h2>
        
        {/* Inspirational Quote */}
        <div className="mb-4 text-center">
          <p className="text-gray-400 font-mono italic text-sm max-w-xl mx-auto">
            “In the realm of code, every bug is a boss battle, and every feature is a quest completed.” – Ochi
          </p>
        </div>
        {/* Mobile Quest Cards */}
        <div className="space-y-4 px-2">
          {enhancedQuests.map((quest) => (
            <div key={quest.id} className="bg-gray-800 bg-opacity-90 rounded-lg border-2 border-green-400">
              {/* Mobile Quest Header - Always Visible */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleQuestExpansion(quest.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-green-400 font-mono flex-1 mr-2">
                    {quest.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-mono font-bold rounded ${getStatusColor(quest.status)}`}>
                      {quest.status}
                    </span>
                    <span className="text-green-400 font-bold text-lg">
                      {expandedQuest === quest.id ? '−' : '+'}
                    </span>
                  </div>
                </div>
                
                {/* Difficulty Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`
                    px-2 py-1 text-xs font-mono font-bold border-2 rounded
                    ${getDifficultyColor(quest.difficulty)} 
                    bg-opacity-20 border-opacity-80 flex items-center gap-1
                  `}>
                    <span>{getDifficultyIcon(quest.difficulty)}</span>
                    <span>{quest.difficulty}</span>
                  </div>
                </div>
                
                {/* Tech Stack - Always Visible */}
                <p className="text-gray-400 font-mono text-xs mb-2">{quest.tech}</p>
                
                {/* Tap to expand hint */}
                <div className="text-xs text-gray-500 font-mono text-center">
                  {expandedQuest === quest.id ? 'Tap to collapse' : 'Tap to view details'}
                </div>
              </div>
              
              {/* Mobile Expanded Content */}
              {expandedQuest === quest.id && (
                <div className="border-t-2 border-gray-700 p-4 space-y-3">
                  {/* Quest Metadata */}
                  <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">📍 LOCATION:</span>
                      <span className="text-yellow-400">{quest.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">⏱️ DURATION:</span>
                      <span className="text-blue-400">{quest.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">👤 QUEST GIVER:</span>
                      <span className="text-purple-400">{quest.questGiver}</span>
                    </div>
                  </div>
                  
                  {/* Quest Lore */}
                  <div>
                    <h4 className="text-green-400 font-mono font-bold text-sm mb-2">QUEST LORE:</h4>
                    <p className="text-gray-300 font-mono text-xs italic leading-relaxed">{quest.lore}</p>
                  </div>
                  
                  {/* Achievement */}
                  <div>
                    <h4 className="text-green-400 font-mono font-bold text-sm mb-2">ACHIEVEMENT UNLOCKED:</h4>
                    <p className="text-gray-300 font-mono text-xs leading-relaxed">{quest.achievement}</p>
                  </div>
                  
                  {/* Rewards */}
                  <div>
                    <h4 className="text-green-400 font-mono font-bold text-sm mb-2">QUEST REWARDS:</h4>
                    <div className="bg-gray-900 bg-opacity-50 p-2 rounded border border-yellow-600">
                      <p className="text-yellow-400 font-mono text-xs">{quest.reward}</p>
                    </div>
                  </div>
                  
                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col gap-2 pt-2">
                    <PixelButton className="text-xs py-2 w-full justify-center">
                      📋 VIEW CODE
                    </PixelButton>
                    <div className="grid grid-cols-2 gap-2">
                      <PixelButton className="text-xs py-2 justify-center">
                        🌐 DEMO
                      </PixelButton>
                      {quest.status === 'COMPLETE' && (
                        <PixelButton className="text-xs py-2 justify-center">
                          🏆 CERT
                        </PixelButton>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Mobile Quest Statistics */}
        <div className="mt-6 px-2">
          <div className="bg-gray-800 bg-opacity-90 rounded-lg border-2 border-green-400 p-4">
            <h3 className="text-green-400 font-mono font-bold text-lg mb-4 text-center">
              📊 QUEST STATISTICS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-900 bg-opacity-50 rounded border border-gray-600">
                <div className="text-2xl mb-1">⚔️</div>
                <h4 className="text-green-400 font-mono font-bold text-xs mb-1">TOTAL</h4>
                <p className="text-white font-mono text-lg font-bold">{enhancedQuests.length}</p>
              </div>
              
              <div className="text-center p-3 bg-gray-900 bg-opacity-50 rounded border border-gray-600">
                <div className="text-2xl mb-1">✅</div>
                <h4 className="text-green-400 font-mono font-bold text-xs mb-1">COMPLETE</h4>
                <p className="text-green-400 font-mono text-lg font-bold">
                  {enhancedQuests.filter(q => q.status === 'COMPLETE').length}
                </p>
              </div>
              
              <div className="text-center p-3 bg-gray-900 bg-opacity-50 rounded border border-gray-600">
                <div className="text-2xl mb-1">⚡</div>
                <h4 className="text-green-400 font-mono font-bold text-xs mb-1">PROGRESS</h4>
                <p className="text-yellow-400 font-mono text-lg font-bold">
                  {enhancedQuests.filter(q => q.status === 'IN PROGRESS').length}
                </p>
              </div>
              
              <div className="text-center p-3 bg-gray-900 bg-opacity-50 rounded border border-gray-600">
                <div className="text-2xl mb-1">🏆</div>
                <h4 className="text-green-400 font-mono font-bold text-xs mb-1">XP EARNED</h4>
                <p className="text-purple-400 font-mono text-lg font-bold">5,700</p>
              </div>
            </div>
          </div>
          
          {/* Inspirational Quote */}
          <div className="mt-4 text-center">
            <p className="text-gray-400 font-mono italic text-sm max-w-xl mx-auto">
              “A hero is someone who has given their life to something bigger than oneself.” – Joseph Campbell
            </p>
          </div>
        </div>

        {/* Mobile Difficulty Legend */}
        <div className="mt-4 px-2">
          <div className="bg-gray-800 bg-opacity-90 rounded-lg border-2 border-green-400 p-4">
            <h4 className="text-green-400 font-mono font-bold text-sm mb-3 text-center">
              DIFFICULTY LEGEND
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span>🟢</span>
                <span className="text-green-300 font-mono font-bold">EASY</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔵</span>
                <span className="text-blue-300 font-mono font-bold">NORMAL</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🟣</span>
                <span className="text-purple-300 font-mono font-bold">HARD</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🟡</span>
                <span className="text-yellow-300 font-mono font-bold">EXTREME</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Original layout
  return (
    <div className="py-8 animate-fade-in">
      <h2 className="text-4xl font-bold text-green-400 font-mono mb-4 pixel-glow text-center">
        ⚔️ QUEST LOG
      </h2>
      {/* Inspirational Quote */}
      <div className="mb-4 text-center">
        <p className="text-gray-400 font-mono italic text-sm max-w-xl mx-auto">
          “In the realm of code, every bug is a boss battle, and every feature is a quest completed.” – Ochi
        </p>
      </div>
      <div className="grid gap-6">
        {enhancedQuests.map((quest) => (
          <div key={quest.id} className="bg-gray-800 bg-opacity-80 pixel-border hover:bg-opacity-90 transition-all">
            {/* Quest Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-green-400 font-mono">{quest.name}</h3>
                  <div className={`
                    px-3 py-1 text-xs font-mono font-bold border-2 rounded-md
                    ${getDifficultyColor(quest.difficulty)} 
                    bg-opacity-20 border-opacity-80 shadow-lg
                    flex items-center gap-2 whitespace-nowrap
                    hover:bg-opacity-30 hover:scale-105 transition-all duration-200
                  `}>
                    <span className="text-sm">{getDifficultyIcon(quest.difficulty)}</span>
                    <span>{quest.difficulty}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-mono font-bold pixel-border ${getStatusColor(quest.status)}`}>
                  {quest.status}
                </span>
              </div>
              
              {/* Quest Metadata */}
              <div className="grid md:grid-cols-3 gap-4 text-sm font-mono">
                <div>
                  <span className="text-gray-400">📍 LOCATION:</span>
                  <span className="text-yellow-400 ml-2">{quest.location}</span>
                </div>
                <div>
                  <span className="text-gray-400">⏱️ DURATION:</span>
                  <span className="text-blue-400 ml-2">{quest.duration}</span>
                </div>
                <div>
                  <span className="text-gray-400">👤 QUEST GIVER:</span>
                  <span className="text-purple-400 ml-2">{quest.questGiver}</span>
                </div>
              </div>
            </div>
            
            {/* Quest Content */}
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-green-400 font-mono font-bold text-sm mb-2">TECHNOLOGIES MASTERED:</h4>
                <p className="text-gray-400 font-mono text-sm">{quest.tech}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-green-400 font-mono font-bold text-sm mb-2">QUEST LORE:</h4>
                <p className="text-gray-300 font-mono text-sm italic leading-relaxed">{quest.lore}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-green-400 font-mono font-bold text-sm mb-2">ACHIEVEMENT UNLOCKED:</h4>
                <p className="text-gray-300 font-mono text-sm leading-relaxed">{quest.achievement}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-green-400 font-mono font-bold text-sm mb-2">QUEST REWARDS:</h4>
                <div className="bg-gray-900 bg-opacity-30 p-2 rounded border border-yellow-600">
                  <p className="text-yellow-400 font-mono text-sm">{quest.reward}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <PixelButton className="text-xs px-3 py-1">
                  📋 VIEW CODE
                </PixelButton>
                <PixelButton className="text-xs px-3 py-1">
                  🌐 LIVE DEMO
                </PixelButton>
                {quest.status === 'COMPLETE' && (
                  <PixelButton className="text-xs px-3 py-1">
                    🏆 CERTIFICATE
                  </PixelButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quest Statistics */}
      <div className="mt-8 mb-7 grid md:grid-cols-4 gap-4">
        <div className="bg-gray-800 bg-opacity-80 p-4 pixel-border text-center">
          <div className="text-2xl mb-2">⚔️</div>
          <h4 className="text-green-400 font-mono font-bold text-sm mb-2">TOTAL QUESTS</h4>
          <p className="text-white font-mono text-xl font-bold">{enhancedQuests.length}</p>
        </div>
        
        <div className="bg-gray-800 bg-opacity-80 p-4 pixel-border text-center">
          <div className="text-2xl mb-2">✅</div>
          <h4 className="text-green-400 font-mono font-bold text-sm mb-2">COMPLETED</h4>
          <p className="text-green-400 font-mono text-xl font-bold">
            {enhancedQuests.filter(q => q.status === 'COMPLETE').length}
          </p>
        </div>
        
        <div className="bg-gray-800 bg-opacity-80 p-4 pixel-border text-center">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="text-green-400 font-mono font-bold text-sm mb-2">IN PROGRESS</h4>
          <p className="text-yellow-400 font-mono text-xl font-bold">
            {enhancedQuests.filter(q => q.status === 'IN PROGRESS').length}
          </p>
        </div>
        
        <div className="bg-gray-800 bg-opacity-80 p-4 pixel-border text-center">
          <div className="text-2xl mb-2">🏆</div>
          <h4 className="text-green-400 font-mono font-bold text-sm mb-2">XP EARNED</h4>
          <p className="text-purple-400 font-mono text-xl font-bold">5,700</p>
        </div>
      </div>
      {/* Inspirational Quote */}
      <div className="text-center">
        <p className="text-gray-400 font-mono italic text-sm max-w-xl mx-auto">
          “A hero is someone who has given their life to something bigger than oneself.” – Joseph Campbell
        </p>
      </div>
    </div>
  );
};

export default QuestsPage;