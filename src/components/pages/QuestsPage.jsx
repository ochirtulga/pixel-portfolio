import React, { useState } from 'react';
import { PixelButton } from '../common';
import { projects } from '../../data/projects';

const ProjectsPage = () => {
  const [selectedQuest, setSelectedQuest] = useState(null);

  // Enhanced quest data with more RPG elements
  const enhancedQuests = [
    {
      id: 1,
      name: 'MICROSERVICE GATEWAY',
      tech: 'Node.js • Docker • Kubernetes',
      status: 'COMPLETE',
      difficulty: 'EPIC',
      location: 'Cloud Infrastructure Realm',
      duration: '3 months',
      reward: '+500 XP, API Mastery Badge',
      achievement: 'Built a scalable gateway handling 10K+ requests/sec, enabling seamless communication between 15+ microservices',
      lore: 'In the chaotic realm of distributed systems, a legendary gateway was forged to unite the scattered microservices...',
      questGiver: 'Senior Architect'
    },
    {
      id: 2,
      name: 'API ORCHESTRATOR',
      tech: 'Express • MongoDB • Redis',
      status: 'COMPLETE',
      difficulty: 'RARE',
      location: 'Database Dungeons',
      duration: '2 months',
      reward: '+350 XP, Data Harmony Rune',
      achievement: 'Created an intelligent orchestration system that reduced API response time by 40% and improved data consistency',
      lore: 'Deep within the Database Dungeons, chaos reigned as data flowed without order. A master orchestrator was needed...',
      questGiver: 'Lead Developer'
    },
    {
      id: 3,
      name: 'PAYMENT SERVICE',
      tech: 'Python • PostgreSQL • RabbitMQ',
      status: 'IN PROGRESS',
      difficulty: 'LEGENDARY',
      location: 'Transaction Valley',
      duration: '4 months (ongoing)',
      reward: '+750 XP, Financial Security Shield',
      achievement: 'Developing a PCI-compliant payment system with advanced fraud detection and multi-currency support',
      lore: 'In the treacherous Transaction Valley, where digital gold flows like rivers, a secure vault must be constructed...',
      questGiver: 'Product Manager'
    },
    {
      id: 4,
      name: 'AUTH MICROSERVICE',
      tech: 'JWT • OAuth2 • MySQL',
      status: 'COMPLETE',
      difficulty: 'EPIC',
      location: 'Security Citadel',
      duration: '2.5 months',
      reward: '+450 XP, Guardian Seal',
      achievement: 'Implemented zero-trust authentication system securing 50+ internal services with 99.99% uptime',
      lore: 'The Security Citadel needed an impenetrable guardian to protect the realm from unauthorized invaders...',
      questGiver: 'Security Lead'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'COMMON': return 'text-gray-400 border-gray-400';
      case 'RARE': return 'text-blue-400 border-blue-400';
      case 'EPIC': return 'text-purple-400 border-purple-400';
      case 'LEGENDARY': return 'text-yellow-400 border-yellow-400';
      default: return 'text-gray-400 border-gray-400';
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

  return (
    <div className="py-12 animate-fade-in">
      <h2 className="text-4xl font-bold text-green-400 font-mono mb-8 pixel-glow text-center">
        ⚔️ QUEST LOG
      </h2>
      
      <div className="grid gap-6">
        {enhancedQuests.map((quest) => (
          <div key={quest.id} className="bg-gray-800 bg-opacity-80 pixel-border hover:bg-opacity-90 transition-all">
            {/* Quest Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-green-400 font-mono">{quest.name}</h3>
                  <span className={`px-2 py-1 text-xs font-mono font-bold border ${getDifficultyColor(quest.difficulty)} rounded`}>
                    {quest.difficulty}
                  </span>
                </div>
                <span className={`px-3 py-1 text-xs font-mono font-bold pixel-border ${getStatusColor(quest.status)}`}>
                  {quest.status}
                </span>
              </div>
              
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
                <div className="bg-gray-900 p-3 rounded border border-yellow-600">
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
      <div className="mt-8 grid md:grid-cols-4 gap-4">
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
          <p className="text-purple-400 font-mono text-xl font-bold">2,050</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;