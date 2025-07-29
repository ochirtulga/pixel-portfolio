import React from 'react';
import { HealthBar } from '../common';

const HealthManaDisplay = () => (
  <div className="fixed bottom-6 left-6 z-20 space-y-2">
    <div className="flex items-center gap-3">
      <span className="text-red-400 font-mono font-bold text-sm">HP</span>
      <HealthBar value={100} color="red" />
    </div>
    <div className="flex items-center gap-3">
      <span className="text-blue-400 font-mono font-bold text-sm">MP</span>
      <HealthBar value={85} color="blue" />
    </div>
  </div>
);

export default HealthManaDisplay;