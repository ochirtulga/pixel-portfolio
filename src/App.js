import React, { useState } from 'react';
import { HomePage, AboutPage, QuestsPage, SkillsPage, ContactPage } from './components/pages';
import { Navigation, Background, HealthManaDisplay, ExperienceBar } from './components/layout';
import '../src/styles/globals.css';

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');

  const handleSectionChange = (sectionId) => {
    if (sectionId !== currentSection) {
      setCurrentSection(sectionId);
    }
  };

  const renderCurrentPage = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onNavigate={handleSectionChange} />;
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <QuestsPage />;
      case 'skills':
        return <SkillsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <Background />

      {/* Navigation */}
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={handleSectionChange} 
      />

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto p-6" style={{ paddingBottom: '80px' }}>
        {renderCurrentPage()}
      </main>

      {/* Floating Health/Mana bars */}
      <HealthManaDisplay />
      
      {/* Experience Bar at bottom */}
      <ExperienceBar />
    </div>
  );
};

export default App;