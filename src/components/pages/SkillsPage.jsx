import React from 'react';
import { HealthBar } from '../common';
import { skills } from '../../data/skills';

const SkillsPage = () => (
  <div className="py-12 animate-fade-in">
    <h2 className="text-4xl font-bold text-green-400 font-mono mb-8 pixel-glow">
      🎯 SKILL TREE
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {skills.map((skill, i) => (
        <div key={i} className="bg-gray-800 bg-opacity-80 p-6 pixel-border">
          <div className="flex justify-between items-center mb-3">
            <span className="text-green-400 font-mono font-bold">{skill.name}</span>
            <span className="text-gray-400 font-mono text-sm">LVL {Math.floor(skill.level / 10)}</span>
          </div>
          <HealthBar value={skill.level} />
        </div>
      ))}
    </div>
  </div>
);

export default SkillsPage;