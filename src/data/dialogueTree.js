// src/data/dialogueTree.js
import { calculateCurrentLevel, CHARACTER_CONFIG } from './characterConfig';

// Generate dynamic dialogue with current level
const getCurrentLevel = () => calculateCurrentLevel();

export const dialogueTreeData = {
    main: {
      speaker: `Adventurer ${CHARACTER_CONFIG.name}`,
      text: `Greetings, fellow adventurer! I am ${CHARACTER_CONFIG.name}, a Level ${getCurrentLevel()} ${CHARACTER_CONFIG.title}. What brings you to my digital realm today?`,
      options: [
        { id: 'collaboration', text: "🤝 I seek a collaboration quest!", next: 'collaboration' },
        { id: 'mentoring', text: "🎓 I require mentoring guidance!", next: 'mentoring' },
        { id: 'hiring', text: "💼 I have a job opportunity!", next: 'hiring' },
        { id: 'networking', text: "🌐 I wish to expand my network!", next: 'networking' }
      ]
    },
    collaboration: {
      speaker: `Adventurer ${CHARACTER_CONFIG.name}`,
      text: "Excellent! I'm always excited about new collaborative quests. Whether it's building microservices, crafting APIs, or conquering distributed systems, I'm ready for the challenge!",
      info: "💡 Best for: Joint projects, open source contributions, technical partnerships",
      options: [
        { id: 'form', text: "📝 Let's discuss the details!", next: 'form', type: 'collaboration' },
        { id: 'main', text: "⬅️ Actually, let me reconsider...", next: 'main' }
      ]
    },
    mentoring: {
      speaker: `Adventurer ${CHARACTER_CONFIG.name}`,
      text: "Ah, a fellow seeker of knowledge! I'd be honored to share my experience in the mystical arts of backend development. From junior adventurer quests to senior architect challenges, I can guide your journey.",
      info: "🎯 Best for: Code reviews, career guidance, technical skill development",
      options: [
        { id: 'form', text: "🏆 Request mentoring session!", next: 'form', type: 'mentoring' },
        { id: 'main', text: "⬅️ Let me explore other options...", next: 'main' }
      ]
    },
    hiring: {
      speaker: `Adventurer ${CHARACTER_CONFIG.name}`,
      text: "Intriguing! You have a quest that requires my particular set of skills? I specialize in backend sorcery, microservices architecture, and API crafting. Tell me about this legendary opportunity!",
      info: "⚔️ Best for: Full-time roles, contract work, technical consulting",
      options: [
        { id: 'form', text: "💼 Share the opportunity details!", next: 'form', type: 'hiring' },
        { id: 'main', text: "⬅️ Perhaps another time...", next: 'main' }
      ]
    },
    networking: {
      speaker: `Adventurer ${CHARACTER_CONFIG.name}`,
      text: "Welcome to the guild! Networking is essential for any successful adventurer. I'm always happy to connect with fellow adventurers, share experiences, and build lasting professional relationships.",
      info: "🌟 Best for: Professional connections, tech discussions, community building",
      options: [
        { id: 'form', text: "🎪 Let's connect and chat!", next: 'form', type: 'networking' },
        { id: 'main', text: "⬅️ Let me browse other options...", next: 'main' }
      ]
    }
  };