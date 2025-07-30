import React, { useState } from 'react';
import { PixelButton } from '../common';

const ContactPage = () => {
  const [currentDialogue, setCurrentDialogue] = useState('main');
  const [selectedContactType, setSelectedContactType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    contactType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Dialogue tree structure
  const dialogueTree = {
    main: {
      speaker: "Developer Ochi",
      text: "Greetings, fellow adventurer! I am Ochi, a Level 26 Backend Developer. What brings you to my digital realm today?",
      options: [
        { id: 'collaboration', text: "🤝 I seek a collaboration quest!", next: 'collaboration' },
        { id: 'mentoring', text: "🎓 I require mentoring guidance!", next: 'mentoring' },
        { id: 'hiring', text: "💼 I have a job opportunity!", next: 'hiring' },
        { id: 'networking', text: "🌐 I wish to expand my network!", next: 'networking' }
      ]
    },
    collaboration: {
      speaker: "Developer Ochi",
      text: "Excellent! I'm always excited about new collaborative quests. Whether it's building microservices, crafting APIs, or conquering distributed systems, I'm ready for the challenge!",
      info: "💡 Best for: Joint projects, open source contributions, technical partnerships",
      options: [
        { id: 'form', text: "📝 Let's discuss the details!", next: 'form', type: 'collaboration' },
        { id: 'main', text: "⬅️ Actually, let me reconsider...", next: 'main' }
      ]
    },
    mentoring: {
      speaker: "Developer Ochi",
      text: "Ah, a fellow seeker of knowledge! I'd be honored to share my experience in the mystical arts of backend development. From junior developer quests to senior architect challenges, I can guide your journey.",
      info: "🎯 Best for: Code reviews, career guidance, technical skill development",
      options: [
        { id: 'form', text: "🏆 Request mentoring session!", next: 'form', type: 'mentoring' },
        { id: 'main', text: "⬅️ Let me explore other options...", next: 'main' }
      ]
    },
    hiring: {
      speaker: "Developer Ochi",
      text: "Intriguing! You have a quest that requires my particular set of skills? I specialize in backend sorcery, microservices architecture, and API crafting. Tell me about this legendary opportunity!",
      info: "⚔️ Best for: Full-time roles, contract work, technical consulting",
      options: [
        { id: 'form', text: "💼 Share the opportunity details!", next: 'form', type: 'hiring' },
        { id: 'main', text: "⬅️ Perhaps another time...", next: 'main' }
      ]
    },
    networking: {
      speaker: "Developer Ochi",
      text: "Welcome to the guild! Networking is essential for any successful adventurer. I'm always happy to connect with fellow developers, share experiences, and build lasting professional relationships.",
      info: "🌟 Best for: Professional connections, tech discussions, community building",
      options: [
        { id: 'form', text: "🎪 Let's connect and chat!", next: 'form', type: 'networking' },
        { id: 'main', text: "⬅️ Let me browse other options...", next: 'main' }
      ]
    }
  };

  const handleDialogueChoice = (choice) => {
    if (choice.next === 'form') {
      setSelectedContactType(choice.type);
      setFormData({ ...formData, contactType: choice.type });
      setShowForm(true);
    } else {
      setCurrentDialogue(choice.next);
      setShowForm(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Quest received! Thank you for choosing the ${selectedContactType} path! 🎉`);
      setFormData({ name: '', message: '', contactType: '' });
      setCurrentDialogue('main');
      setShowForm(false);
    }, 2000);
  };

  // Function to handle social media links
  const handleSocialClick = (platform) => {
    const socialLinks = {
      github: 'https://github.com/ochirtulga',
      linkedin: 'https://linkedin.com/in/ochirtulga-namjim',
      instagram: 'https://instagram.com/_ochrono_',
      leetcode: 'https://leetcode.com/ochirtulga'
    };

    const url = socialLinks[platform];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const currentNode = dialogueTree[currentDialogue];

  return (
    <div className="py-8 animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-bounce">👨‍💻</div>
        <h2 className="text-4xl font-bold text-green-400 font-mono mb-4 pixel-glow">
          NPC INTERACTION TERMINAL
        </h2>
        <p className="text-gray-300 font-mono text-sm max-w-2xl mx-auto">
          Initiate dialogue sequence with Developer Ochi to begin your quest.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Dialogue Box */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 bg-opacity-95 pixel-border relative min-h-96">
            {/* Character Portrait */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gray-900 border-4 border-green-400 rounded-full flex items-center justify-center text-2xl z-10">
              👨‍💻
            </div>

            {/* Dialogue Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 border-b-2 border-green-400">
              <h3 className="text-xl font-bold text-green-400 font-mono flex items-center gap-2">
                💬 {currentNode.speaker}
                <div className="flex gap-1 ml-auto">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </h3>
            </div>

            {/* Dialogue Content */}
            <div className="p-6 space-y-6">
              {/* NPC Speech */}
              <div className="bg-gray-900 p-4 rounded-lg border-2 border-green-400 relative">
                <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-900 border-l-2 border-t-2 border-green-400 transform rotate-45"></div>
                <p className="text-gray-300 font-mono text-sm leading-relaxed">
                  {currentNode.text}
                </p>
                {currentNode.info && (
                  <div className="mt-3 p-3 bg-blue-900 bg-opacity-50 rounded border border-blue-400">
                    <p className="text-blue-300 font-mono text-xs">{currentNode.info}</p>
                  </div>
                )}
              </div>

              {/* Dialogue Options */}
              {!showForm && (
                <div className="space-y-3">
                  <h4 className="text-green-400 font-mono font-bold text-sm">Choose your response:</h4>
                  {currentNode.options.map((option, index) => (
                    <PixelButton
                      key={option.id}
                      onClick={() => handleDialogueChoice(option)}
                      className="w-full text-left justify-start p-4 hover:bg-green-600 hover:text-white transition-all duration-300"
                    >
                      <span className="text-sm">{option.text}</span>
                    </PixelButton>
                  ))}
                </div>
              )}

              {/* Contact Form */}
              {showForm && (
                <div className="space-y-4">
                  <div className="bg-yellow-900 bg-opacity-30 p-4 rounded border border-yellow-400">
                    <h4 className="text-yellow-400 font-mono font-bold text-sm mb-2">
                      📋 Quest Details Form - {selectedContactType.toUpperCase()}
                    </h4>
                    <p className="text-yellow-300 font-mono text-xs">
                      Please provide the following information to proceed with your quest:
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-green-400 font-mono font-bold mb-2 text-sm">
                        👤 Adventurer Name:
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700 focus:border-green-300 transition-all duration-300"
                        placeholder="Enter your character name..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-green-400 font-mono font-bold mb-2 text-sm">
                        📜 Quest Description:
                      </label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700 focus:border-green-300 resize-none transition-all duration-300"
                        placeholder={`Describe your ${selectedContactType} quest in detail...`}
                        required
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <PixelButton 
                        className="flex-1 justify-center py-3"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? '⏳ Sending...' : '🚀 Submit Quest'}
                      </PixelButton>
                      <PixelButton 
                        className="px-6 py-3"
                        onClick={() => {
                          setShowForm(false);
                          setCurrentDialogue('main');
                        }}
                      >
                        ❌ Cancel
                      </PixelButton>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Quick Connect */}
          <div className="bg-gray-800 bg-opacity-95 pixel-border">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-3 border-b-2 border-blue-400">
              <h3 className="text-lg font-bold text-blue-400 font-mono flex items-center gap-2">
                ⚡ Quick Connect
              </h3>
            </div>
            <div className="p-4">
              <p className="text-gray-300 font-mono text-xs mb-4">
                Bypass dialogue for direct guild connections:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <PixelButton 
                  onClick={() => handleSocialClick('github')}
                  className="text-xs py-2 hover:scale-105 transition-transform"
                >
                  🐙 GitHub
                </PixelButton>
                <PixelButton 
                  onClick={() => handleSocialClick('linkedin')}
                  className="text-xs py-2 hover:scale-105 transition-transform"
                >
                  💼 LinkedIn
                </PixelButton>
                <PixelButton 
                  onClick={() => handleSocialClick('instagram')}
                  className="text-xs py-2 hover:scale-105 transition-transform"
                >
                  📸 Instagram
                </PixelButton>
                <PixelButton 
                  onClick={() => handleSocialClick('leetcode')}
                  className="text-xs py-2 hover:scale-105 transition-transform"
                >
                  🧩 LeetCode
                </PixelButton>
              </div>
            </div>
          </div>

          {/* Status Panel */}
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
                  <span className="text-green-400 font-mono font-bold text-xs">ONLINE</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-mono text-xs">Location:</span>
                <span className="text-blue-400 font-mono font-bold text-xs">Austin, TX</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-mono text-xs">Response Time:</span>
                <span className="text-yellow-400 font-mono font-bold text-xs">~24 Hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-mono text-xs">Languages:</span>
                <span className="text-purple-400 font-mono font-bold text-xs">EN, MN</span>
              </div>
            </div>
          </div>

          {/* Quest Types */}
          <div className="bg-gray-800 bg-opacity-95 pixel-border">
            <div className="bg-gradient-to-r from-purple-900 to-purple-800 px-4 py-3 border-b-2 border-purple-400">
              <h3 className="text-lg font-bold text-purple-400 font-mono flex items-center gap-2">
                🎯 Available Quests
              </h3>
            </div>
            <div className="p-4 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span>🤝</span>
                <span className="text-gray-300">Collaboration Quests</span>
                <span className="text-green-400 ml-auto">OPEN</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎓</span>
                <span className="text-gray-300">Mentoring Sessions</span>
                <span className="text-blue-400 ml-auto">AVAILABLE</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💼</span>
                <span className="text-gray-300">Job Opportunities</span>
                <span className="text-yellow-400 ml-auto">SELECTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌐</span>
                <span className="text-gray-300">Networking Events</span>
                <span className="text-green-400 ml-auto">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;