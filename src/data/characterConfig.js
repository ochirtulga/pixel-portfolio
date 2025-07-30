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
    
    // Location
    location: 'AUSTIN, TX',
    
    // Character Stats (for AboutPage)
    stats: {
      apisDeployed: '67+',
      uptime: '99.99%',
      livesSaved: '1.5M+',
      experiencePoints: '28,750'
    }
  };
  
  // Utility function to calculate current level (age)
  export const calculateCurrentLevel = () => {
    const currentYear = new Date().getFullYear();
    return currentYear - CHARACTER_CONFIG.birthYear;
  };
  
  // Utility function to calculate experience progress (birthday countdown)
  export const calculateExperienceData = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Create birthday for current year
    const birthday = new Date(currentYear, CHARACTER_CONFIG.birthMonth, CHARACTER_CONFIG.birthDate);
    
    // If birthday has passed this year, calculate for next year
    if (today > birthday) {
      birthday.setFullYear(currentYear + 1);
    }
    
    // Calculate last birthday
    const lastBirthday = new Date(birthday);
    lastBirthday.setFullYear(birthday.getFullYear() - 1);
    
    // Calculate progress
    const totalDaysInYear = Math.ceil((birthday - lastBirthday) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today - lastBirthday) / (1000 * 60 * 60 * 24));
    const daysUntilBirthday = Math.ceil((birthday - today) / (1000 * 60 * 60 * 24));
    
    const percentage = Math.min((daysPassed / totalDaysInYear) * 100, 100);
    
    // Calculate current age and next level
    const currentAge = calculateCurrentLevel();
    const nextLevel = currentAge + 1;
    
    return {
      percentage: percentage,
      daysUntilBirthday: daysUntilBirthday,
      currentAge: currentAge,
      nextLevel: nextLevel
    };
  };
  
  // Export individual utilities for convenience
  export { CHARACTER_CONFIG as default };