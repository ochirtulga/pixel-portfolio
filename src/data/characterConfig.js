// src/data/characterConfig.js
export const CHARACTER_CONFIG = {
    // Personal Information
    birthYear: 1998,
    birthMonth: 4, // 0-indexed (0 = January, 4 = May)
    birthDate: 19,
    name: 'OCHI',
    fullName: 'Ochirtulga Namjim',
    title: 'BACKEND ADVENTURER',
    specialization: 'MICROSERVICES & RESTFUL APIS',
    
    // Professional Career Information
    careerStartYear: 2018,
    careerStartMonth: 0, // January (0-indexed)
    careerStartDate: 1, // Approximate start date
    
    // Location
    location: 'AUSTIN, TX',
    
    // Character Stats (for AboutPage)
    stats: {
      apisDeployed: '67+',
      uptime: '99.996%',
      livesSaved: '2M+',
      highestDps: '100K per/second',
      experiencePoints: '28,750'
    }
  };
  
  // Utility function to calculate current level (years of professional experience)
  export const calculateCurrentLevel = () => {
    const currentDate = new Date();
    const careerStart = new Date(CHARACTER_CONFIG.careerStartYear, CHARACTER_CONFIG.careerStartMonth, CHARACTER_CONFIG.careerStartDate);
    
    // Calculate the difference in years
    const yearsDiff = currentDate.getFullYear() - careerStart.getFullYear();
    const monthsDiff = currentDate.getMonth() - careerStart.getMonth();
    const daysDiff = currentDate.getDate() - careerStart.getDate();
    
    // Adjust for months and days
    let totalYears = yearsDiff;
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      totalYears--;
    }
    
    return Math.max(1, totalYears); // Minimum level 1
  };
  
  // Utility function to calculate experience progress (career anniversary countdown)
  export const calculateExperienceData = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Create career anniversary for current year
    const anniversary = new Date(currentYear, CHARACTER_CONFIG.careerStartMonth, CHARACTER_CONFIG.careerStartDate);
    
    // If anniversary has passed this year, calculate for next year
    if (today > anniversary) {
      anniversary.setFullYear(currentYear + 1);
    }
    
    // Calculate last anniversary
    const lastAnniversary = new Date(anniversary);
    lastAnniversary.setFullYear(anniversary.getFullYear() - 1);
    
    // Calculate progress
    const totalDaysInYear = Math.ceil((anniversary - lastAnniversary) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today - lastAnniversary) / (1000 * 60 * 60 * 24));
    const daysUntilAnniversary = Math.ceil((anniversary - today) / (1000 * 60 * 60 * 24));
    
    const percentage = Math.min((daysPassed / totalDaysInYear) * 100, 100);
    
    // Calculate current experience level and next level
    const currentLevel = calculateCurrentLevel();
    const nextLevel = currentLevel + 1;
    
    return {
      percentage: percentage,
      daysUntilAnniversary: daysUntilAnniversary,
      currentLevel: currentLevel,
      nextLevel: nextLevel
    };
  };
  
  // Utility function to get career milestone information
  export const getCareerMilestones = () => {
    const currentLevel = calculateCurrentLevel();
    const startYear = CHARACTER_CONFIG.careerStartYear;
    
    return {
      careerStart: `${startYear}`,
      currentLevel: currentLevel,
      experienceYears: `${currentLevel}+ years`,
      nextMilestone: `Level ${currentLevel + 1}`,
      careerPhase: currentLevel >= 7 ? 'Senior' : currentLevel >= 4 ? 'Mid-level' : currentLevel >= 2 ? 'Junior+' : 'Junior'
    };
  };
  
  // Export individual utilities for convenience
  export { CHARACTER_CONFIG as default };