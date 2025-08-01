// Enhanced character stats with descriptions
import { calculateCurrentLevel, CHARACTER_CONFIG, getCareerMilestones } from './characterConfig';

const currentLevel = calculateCurrentLevel();
const careerMilestones = getCareerMilestones();
export const characterStats = [
    {
      key: 'class',
      label: 'CLASS',
      value: CHARACTER_CONFIG.title,
      description: 'Specialized in server-side magic and system architecture',
      icon: '⚔️'
    },
    {
      key: 'level',
      label: 'EXPERIENCE LEVEL',
      value: `${currentLevel} Years`,
      description: `${currentLevel} years of professional development since 2018`,
      icon: '⭐'
    },
    {
      key: 'phase',
      label: 'CAREER PHASE',
      value: careerMilestones.careerPhase,
      description: `Current professional development phase: ${careerMilestones.careerPhase}`,
      icon: '🎯'
    },
    {
      key: 'location',
      label: 'BASE',
      value: CHARACTER_CONFIG.location,
      description: 'Current headquarters in the heart of Texas tech scene',
      icon: '🏰'
    },
    {
      key: 'apis',
      label: 'APIS FORGED',
      value: CHARACTER_CONFIG.stats.apisDeployed,
      description: 'RESTful services crafted and deployed to production',
      icon: '🔧'
    },
    {
      key: 'uptime',
      label: 'UPTIME MASTERY',
      value: CHARACTER_CONFIG.stats.uptime,
      description: 'System reliability achieved through careful engineering',
      icon: '🛡️'
    },
    {
      key: 'impact',
      label: 'USERS SERVED',
      value: CHARACTER_CONFIG.stats.livesSaved,
      description: 'Lives improved through scalable backend solutions',
      icon: '👥'
    },
    {
      key: 'xp',
      label: 'EXPERIENCE POINTS',
      value: CHARACTER_CONFIG.stats.experiencePoints,
      description: 'Total accumulated knowledge and expertise',
      icon: '💎'
    }
  ];