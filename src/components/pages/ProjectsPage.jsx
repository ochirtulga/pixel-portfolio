import React from 'react';
import { PixelButton } from '../common';
import { projects } from '../../data/projects';

const ProjectsPage = () => (
  <div className="py-12 animate-fade-in">
    <h2 className="text-4xl font-bold text-green-400 font-mono mb-8 pixel-glow">
      ⚔️ COMPLETED QUESTS
    </h2>
    <div className="grid gap-6">
      {projects.map((project, i) => (
        <div key={i} className="bg-gray-800 bg-opacity-80 p-6 pixel-border hover:bg-opacity-90 transition-all">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-green-400 font-mono">{project.name}</h3>
            <span className={`px-3 py-1 text-xs font-mono font-bold pixel-border ${
              project.status === 'COMPLETE' ? 'bg-green-400 text-gray-900' :
              project.status === 'IN PROGRESS' ? 'bg-yellow-400 text-gray-900' :
              'bg-gray-600 text-gray-300'
            }`}>
              {project.status}
            </span>
          </div>
          <p className="text-gray-400 font-mono text-sm mb-3">{project.tech}</p>
          <div className="flex gap-2">
            <PixelButton className="text-xs px-3 py-1">VIEW CODE</PixelButton>
            <PixelButton className="text-xs px-3 py-1">LIVE DEMO</PixelButton>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProjectsPage;