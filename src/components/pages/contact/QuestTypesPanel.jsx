import React from 'react';

const QuestTypesPanel = ({ questTypes }) => {
  const defaultQuestTypes = [
    { icon: '🤝', name: 'Collaboration Quests', status: 'OPEN', statusColor: 'text-green-400' },
    { icon: '🎓', name: 'Mentoring Sessions', status: 'AVAILABLE', statusColor: 'text-blue-400' },
    { icon: '💼', name: 'Job Opportunities', status: 'SELECTIVE', statusColor: 'text-yellow-400' },
    { icon: '🌐', name: 'Networking Events', status: 'ACTIVE', statusColor: 'text-green-400' }
  ];

  const quests = questTypes || defaultQuestTypes;

  return (
    <div className="bg-gray-800 bg-opacity-95 pixel-border">
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 px-4 py-3 border-b-2 border-purple-400">
        <h3 className="text-lg font-bold text-purple-400 font-mono flex items-center gap-2">
          🎯 Available Quests
        </h3>
      </div>
      <div className="p-4 space-y-2 text-xs font-mono">
        {quests.map((quest, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>{quest.icon}</span>
            <span className="text-gray-300">{quest.name}</span>
            <span className={`${quest.statusColor} ml-auto`}>{quest.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestTypesPanel;