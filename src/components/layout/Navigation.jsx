import React, { useState, useEffect } from 'react';
import { navItems } from '../../data/navItems';
import { calculateCurrentLevel, CHARACTER_CONFIG } from '../../data/characterConfig';
import { AudioToggleButton, PixelButton } from '../common';
import audioService from '../../services/audioService'; 

const Navigation = ({ currentSection, onSectionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStatusBars, setShowStatusBars] = useState(false);
  const currentLevel = calculateCurrentLevel();

  // Load status bar preference
  useEffect(() => {
    const savedVisibility = localStorage.getItem('healthDisplayVisible');
    if (savedVisibility !== null) {
      setShowStatusBars(JSON.parse(savedVisibility));
    }
  }, []);

  const toggleMobileMenu = () => {
    // Play audio feedback
    audioService.playClick();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (sectionId) => {
    // Play audio feedback
    audioService.playClick();
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleStatusBars = () => {
    // Play audio feedback
    audioService.playClick();
    const newVisibility = !showStatusBars;
    setShowStatusBars(newVisibility);
    localStorage.setItem('healthDisplayVisible', JSON.stringify(newVisibility));
    
    // Dispatch custom event to notify HealthManaDisplay
    window.dispatchEvent(new CustomEvent('statusToggle', { 
      detail: { visible: newVisibility } 
    }));
  };

  const handleDesktopNavClick = (sectionId) => {
    // Play audio feedback
    audioService.playClick();
    onSectionChange(sectionId);
  };

  return (
    <nav className="navigation">
      <div className="navigation__container">
        {/* Mobile Layout */}
        <div className="navigation__mobile navigation__hide-desktop">
          <div className="navigation__mobile-header">
            {/* Character Info */}
            <div className="navigation__character-info">
              <div className="navigation__avatar">
                👨🏻‍💻
              </div>
              <div className="navigation__character-details">
                <div className="navigation__character-name">
                  &lt;{CHARACTER_CONFIG.name}&gt;
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="navigation__level-badge">
                    LVL {currentLevel}
                  </span>
                  <div className="navigation__status-dot"></div>
                </div>
              </div>
            </div>

            {/* Mobile Control Buttons */}
            <div className="navigation__mobile-controls">
              {/* Status Toggle Button */}
              <button
                onClick={toggleStatusBars}
                onMouseEnter={() => audioService.playHover()}
                className={`navigation__control-button ${
                  showStatusBars ? 'navigation__control-button--active' : ''
                }`}
                title={showStatusBars ? 'Hide Status Bars' : 'Show Status Bars'}
              >
                📊
              </button>

              {/* Audio Toggle Button */}
              <AudioToggleButton position="static" className="navigation__audio-button" />

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                onMouseEnter={() => audioService.playHover()}
                className={`navigation__menu-button ${
                  isMobileMenuOpen ? 'navigation__menu-button--active' : ''
                }`}
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`navigation__mobile-menu ${
              isMobileMenuOpen 
                ? 'navigation__mobile-menu--open' 
                : 'navigation__mobile-menu--closed'
            }`}
          >
            <div className="navigation__mobile-character">
              <div className="navigation__mobile-character-avatar">👨🏻‍💻</div>
              <div className="navigation__character-title">
                {CHARACTER_CONFIG.title}
              </div>
            </div>

            <div className="navigation__mobile-nav-grid">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleMobileNavClick(item.id)}
                  onMouseEnter={() => audioService.playHover()}
                  className={`navigation__mobile-nav-button ${
                    currentSection === item.id 
                      ? 'navigation__mobile-nav-button--active' 
                      : ''
                  }`}
                >
                  <span className="navigation__mobile-nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="navigation__mobile-stats">
              <div className="navigation__mobile-stat">
                <div className="navigation__mobile-stat-value navigation__mobile-stat-value--green">
                  {CHARACTER_CONFIG.stats.apisDeployed}
                </div>
                <div className="navigation__mobile-stat-label">APIS</div>
              </div>
              <div className="navigation__mobile-stat">
                <div className="navigation__mobile-stat-value navigation__mobile-stat-value--blue">
                  {CHARACTER_CONFIG.stats.uptime}
                </div>
                <div className="navigation__mobile-stat-label">UPTIME</div>
              </div>
            </div>

            {/* Mobile Settings Panel */}
            <div className="navigation__mobile-settings">
              <div className="navigation__mobile-settings-title">
                ⚙️ SETTINGS
              </div>
              <div className="navigation__mobile-settings-grid">
                <div className="navigation__mobile-setting">
                  <span className="navigation__mobile-setting-label">Status Bars:</span>
                  <button
                    onClick={toggleStatusBars}
                    onMouseEnter={() => audioService.playHover()}
                    className={`navigation__mobile-setting-toggle ${
                      showStatusBars ? 'navigation__mobile-setting-toggle--on' : ''
                    }`}
                  >
                    {showStatusBars ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="navigation__desktop navigation__hide-mobile">
          {/* Character Profile */}
          <div className="navigation__desktop-character">
            <div className="navigation__avatar navigation__avatar--desktop">
              👨🏻‍💻
            </div>
            
            <div className="navigation__character-details">
              <div className="navigation__desktop-character-info">
                <span className="navigation__character-name navigation__character-name--desktop">
                  &lt;{CHARACTER_CONFIG.name}&gt;
                </span>
                <span className="navigation__level-badge navigation__level-badge--desktop">
                  LVL {currentLevel}
                </span>
              </div>
              <div className="navigation__character-title">
                {CHARACTER_CONFIG.title} 
              </div>
            </div>
          </div>

          {/* Desktop Navigation Buttons - Using PixelButton for audio */}
          <div className="navigation__desktop-nav-buttons">
            {navItems.map(item => (
              <PixelButton
                key={item.id}
                onClick={() => handleDesktopNavClick(item.id)}
                active={currentSection === item.id}
                className="text-sm lg:text-base"
                enableAudio={true}
              >
                {item.icon} {item.label}
              </PixelButton>
            ))}
          </div>
          
          {/* Audio Toggle Button */}
          <AudioToggleButton position="static" className="navigation__audio-button" />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;