import React from 'react';

const AboutPage = () => (
  <div className="py-12 animate-fade-in">
    <h2 className="text-4xl font-bold text-green-400 font-mono mb-8 pixel-glow">
      📜 CHARACTER INFO
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gray-800 bg-opacity-80 p-6 pixel-border">
        <h3 className="text-2xl text-green-400 font-mono mb-4">STATS</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-mono">EXP POINTS:</span>
            <span className="text-green-400 font-mono font-bold">22,850</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-mono">APIS DEPLOYED:</span>
            <span className="text-green-400 font-mono font-bold">70+</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-mono">UPTIME ACHIEVED:</span>
            <span className="text-green-400 font-mono font-bold">99.9%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-mono">COORDINATES:</span>
            <span className="text-green-400 font-mono font-bold">30.272937, -97.736121</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 bg-opacity-80 p-6 pixel-border">
        <h3 className="text-2xl text-green-400 font-mono mb-4">BACKSTORY</h3>
        <p className="text-gray-300 font-mono leading-relaxed">
          A seasoned Level 27 Backend Developer who has mastered the arcane arts 
          of microservices architecture and RESTful API design. Known throughout 
          the digital realm for crafting scalable systems and optimizing server 
          performance in the most challenging environments.
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;