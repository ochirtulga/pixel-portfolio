import React from 'react';

const CharacterStatusPanel = ({ 
  status = 'ONLINE',
  location = 'Austin, TX',
  responseTime = '~24 Hours',
  languages = 'EN, MN'
}) => {
  return (
    <div className="bg-gray-800 bg-opacity-95 pixel-border">
      <div className="bg-gradient-to-r from-green-900 to-green-800 px-4 py-3 border-b-2 border-green-400">
        <h3 className="text-lg font-bold text-green-400 font-mono flex items-center gap-2">
          📊 Character Status
        </h3>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-mono text-xs">Status:</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-mono font-bold text-xs">{status}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-mono text-xs">Location:</span>
          <span className="text-blue-400 font-mono font-bold text-xs">{location}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-mono text-xs">Response Time:</span>
          <span className="text-yellow-400 font-mono font-bold text-xs">{responseTime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-mono text-xs">Languages:</span>
          <span className="text-purple-400 font-mono font-bold text-xs">{languages}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterStatusPanel;