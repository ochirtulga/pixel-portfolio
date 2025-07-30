import React, { useState, useEffect } from 'react';

// Separate Page Components
const HomePage = ({ onNavigate }) => (
  <div className="text-center py-20 animate-fade-in">
    <div className="text-8xl mb-6 animate-bounce">🎮</div>
    <h2 className="text-6xl font-bold text-green-400 font-mono mb-4 pixel-glow">
      WELCOME
    </h2>
    <p className="text-xl text-gray-300 font-mono mb-8 max-w-2xl mx-auto">
      LEVEL 27 BACKEND DEVELOPER<br/>
      SPECIALIZING IN MICROSERVICES & RESTFUL APIS
    </p>
    <div className="flex justify-center gap-4">
      <PixelButton onClick={() => onNavigate('projects')}>
        VIEW QUESTS
      </PixelButton>
      <PixelButton onClick={() => onNavigate('contact')}>
        SEND MESSAGE
      </PixelButton>
    </div>
  </div>
);

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
            <span className="text-green-400 font-mono font-bold">127</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 font-mono">UPTIME ACHIEVED:</span>
            <span className="text-green-400 font-mono font-bold">99.9%</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 bg-opacity-80 p-6 pixel-border">
        <h3 className="text-2xl text-green-400 font-mono mb-4">BACKSTORY</h3>
        <p className="text-gray-300 font-mono leading-relaxed">
          A seasoned Level 27 Backend Adventurer who has mastered the arcane arts 
          of microservices architecture and RESTful API design. Known throughout 
          the digital realm for crafting scalable systems and optimizing server 
          performance in the most challenging environments.
        </p>
      </div>
    </div>
  </div>
);

const ProjectsPage = () => {
  const projects = [
    { name: 'MICROSERVICE GATEWAY', tech: 'Node.js • Docker • Kubernetes', status: 'COMPLETE' },
    { name: 'API ORCHESTRATOR', tech: 'Express • MongoDB • Redis', status: 'COMPLETE' },
    { name: 'PAYMENT SERVICE', tech: 'Python • PostgreSQL • RabbitMQ', status: 'IN PROGRESS' },
    { name: 'AUTH MICROSERVICE', tech: 'JWT • OAuth2 • MySQL', status: 'COMPLETE' }
  ];

  return (
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
};

const SkillsPage = () => {
  const skills = [
    { name: 'Node.js', level: 95 },
    { name: 'Microservices', level: 90 },
    { name: 'RESTful APIs', level: 92 },
    { name: 'Docker/K8s', level: 85 },
    { name: 'Database Design', level: 88 },
    { name: 'System Architecture', level: 87 }
  ];

  const HealthBar = ({ value, max = 100, color = 'green' }) => (
    <div className="flex items-center gap-2 font-mono text-xs">
      <div className="w-32 h-4 bg-gray-800 pixel-border relative overflow-hidden">
        <div 
          className={`h-full bg-${color}-400 transition-all duration-500`}
          style={{ width: `${(value / max) * 100}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-gray-900 font-bold">
          {value}%
        </div>
      </div>
    </div>
  );

  return (
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
};

const ContactPage = () => (
  <div className="py-12 animate-fade-in">
    <h2 className="text-4xl font-bold text-green-400 font-mono mb-8 pixel-glow">
      📮 SEND MESSAGE
    </h2>
    <div className="max-w-2xl mx-auto bg-gray-800 bg-opacity-80 p-8 pixel-border">
      <div className="space-y-6">
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2">PLAYER NAME:</label>
          <input 
            type="text" 
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700"
            placeholder="Enter your name..."
          />
        </div>
        
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2">EMAIL ADDRESS:</label>
          <input 
            type="email" 
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700"
            placeholder="your.email@domain.com"
          />
        </div>
        
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2">MESSAGE:</label>
          <textarea 
            rows="6"
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700 resize-none"
            placeholder="Type your message here..."
          />
        </div>
        
        <PixelButton className="w-full justify-center">
          📤 SEND MESSAGE
        </PixelButton>
      </div>
    </div>
    
    <div className="text-center mt-8 space-y-2">
      <p className="text-gray-400 font-mono">OR FIND ME ON:</p>
      <div className="flex justify-center gap-4">
        <PixelButton>🐙 GITHUB</PixelButton>
        <PixelButton>💼 LINKEDIN</PixelButton>
        <PixelButton>🐦 TWITTER</PixelButton>
      </div>
    </div>
  </div>
);

// Reusable PixelButton Component
const PixelButton = ({ children, onClick, active = false, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '2px solid #4ade80',
        padding: '8px 16px',
        fontFamily: 'monospace',
        fontSize: '14px',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        cursor: 'pointer',
        userSelect: 'none',
        imageRendering: 'pixelated',
        touchAction: 'manipulation',
        textTransform: 'uppercase',
        backgroundColor: active ? '#4ade80' : (isHovered ? '#22c55e' : '#1f2937'),
        color: active ? '#1f2937' : (isHovered ? '#1f2937' : '#4ade80'),
        borderColor: active ? '#22c55e' : '#4ade80',
        transition: 'none'
      }}
      type="button"
      className={className}
    >
      {children}
    </button>
  );
};

const PixelPortfolio = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [stars, setStars] = useState([]);
  const [clouds, setClouds] = useState([]);

  // Prevent any accidental state changes
  const handleSectionChange = (sectionId) => {
    if (sectionId !== currentSection) {
      setCurrentSection(sectionId);
    }
  };

  // Generate animated background elements
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          twinkle: Math.random() * 2 + 1
        });
      }
      setStars(newStars);
    };

    const generateClouds = () => {
      const newClouds = [];
      for (let i = 0; i < 8; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 120 - 20,
          y: Math.random() * 40 + 10,
          size: Math.random() * 0.5 + 0.5,
          speed: Math.random() * 0.3 + 0.1
        });
      }
      setClouds(newClouds);
    };

    generateStars();
    generateClouds();
  }, []);

  // Animate clouds
  useEffect(() => {
    const interval = setInterval(() => {
      setClouds(prevClouds => 
        prevClouds.map(cloud => ({
          ...cloud,
          x: cloud.x >= 120 ? -20 : cloud.x + cloud.speed
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME', icon: '🏠' },
    { id: 'about', label: 'ABOUT', icon: '👤' },
    { id: 'projects', label: 'PROJECTS', icon: '⚔️' },
    { id: 'skills', label: 'SKILLS', icon: '🎯' },
    { id: 'contact', label: 'CONTACT', icon: '📮' }
  ];

  const PixelButton = ({ children, onClick, active = false, className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onClick) {
        onClick();
      }
    };

    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          border: '2px solid #4ade80',
          padding: '8px 16px',
          fontFamily: 'monospace',
          fontSize: '14px',
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          cursor: 'pointer',
          userSelect: 'none',
          imageRendering: 'pixelated',
          touchAction: 'manipulation',
          textTransform: 'uppercase',
          backgroundColor: active ? '#4ade80' : (isHovered ? '#22c55e' : '#1f2937'),
          color: active ? '#1f2937' : (isHovered ? '#1f2937' : '#4ade80'),
          borderColor: active ? '#22c55e' : '#4ade80',
          transition: 'none'
        }}
        type="button"
        className={className}
      >
        {children}
      </button>
    );
  };

  const HealthBar = ({ value, max = 100, color = 'green' }) => (
    <div className="flex items-center gap-2 font-mono text-xs">
      <div className="w-32 h-4 bg-gray-800 pixel-border relative overflow-hidden">
        <div 
          className={`h-full bg-${color}-400 transition-all duration-500`}
          style={{ width: `${(value / max) * 100}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-gray-900 font-bold">
          {value}%
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Stars */}
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-80"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.twinkle}s infinite alternate`
            }}
          />
        ))}
        
        {/* Clouds */}
        {clouds.map(cloud => (
          <div
            key={cloud.id}
            className="absolute text-gray-400 opacity-30"
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              transform: `scale(${cloud.size})`,
              fontSize: '24px'
            }}
          >
            ☁️
          </div>
        ))}

        {/* Pixel Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #fff 1px, transparent 1px),
              linear-gradient(#fff 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 border-b-2 border-green-400 bg-gray-900 bg-opacity-90">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-400 font-mono tracking-wider pixel-glow">
            &lt;OCHI&gt;
          </h1>
          <div className="flex gap-2">
            {navItems.map(item => (
              <PixelButton
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                active={currentSection === item.id}
              >
                {item.icon} {item.label}
              </PixelButton>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto p-6">
        {currentSection === 'home' && <HomePage onNavigate={handleSectionChange} />}
        {currentSection === 'about' && <AboutPage />}
        {currentSection === 'projects' && <ProjectsPage />}
        {currentSection === 'skills' && <SkillsPage />}
        {currentSection === 'contact' && <ContactPage />}
      </main>

      {/* Floating Health/Mana bars */}
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

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pixel-border {
          border: 2px solid #4ade80;
          border-image: url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m0 0h100v100h-100z' fill='none' stroke='%234ade80' stroke-width='2'/%3e%3c/svg%3e") 2;
          image-rendering: pixelated;
        }
        
        .pixel-glow {
          text-shadow: 0 0 10px #4ade80, 0 0 20px #4ade80, 0 0 30px #4ade80;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        
        * {
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  );
};

export default PixelPortfolio;