import React from 'react';
import { HealthBar } from '../common';

const HealthManaDisplay = () => (
  <div className="fixed bottom-20 left-6 z-20 space-y-3 bg-gray-900 bg-opacity-90 p-4 pixel-border rounded-lg shadow-lg">
    {/* Header */}
    <div className="text-center mb-2">
      <span className="text-green-400 font-mono font-bold text-xs">
        ⚡ STATUS
      </span>
    </div>
    
    {/* Health Bar */}
    <div className="flex-center items-start gap-3">
      <span className="text-red-400 font-mono font-bold text-sm min-w-[24px] mt-0.5">HP</span>
      <div className="flex-1">
        <HealthBar 
          value={100} 
          color="red" 
          status="Ready for Action"
          showGlow={true}
        />
      </div>
    </div>
    
    {/* Mana Bar */}
    <div className="flex-center items-start gap-3">
      <span className="text-blue-400 font-mono font-bold text-sm min-w-[24px] mt-0.5">MP</span>
      <div className="flex-1">
        <HealthBar 
          value={100} 
          color="blue" 
          status="High Focus"
          showGlow={true}
        />
      </div>
    </div>

    {/* Skill Bar */}
    <div className="flex-center items-start gap-3">
      <span className="text-green-400 font-mono font-bold text-sm min-w-[24px] mt-0.5">XP</span>
      <div className="flex-1">
        <HealthBar 
          value={100} 
          color="green" 
          status="Peak Performance"
          showGlow={true}
        />
      </div>
    </div>

    {/* Availability Bar */}
    <div className="flex-center items-start gap-3">
      <span className="text-yellow-400 font-mono font-bold text-sm min-w-[24px] mt-0.5">AV</span>
      <div className="flex-1">
        <HealthBar 
          value={100} 
          color="yellow" 
          status="Open for Quests"
          showGlow={true}
        />
      </div>
    </div>

    {/* Online Status */}
    <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-600">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <span className="text-green-400 font-mono text-xs font-bold">ONLINE</span>
    </div>
  </div>
);

export default HealthManaDisplay;