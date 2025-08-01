import React, { useState, useEffect } from 'react';

const Background = () => {
  const [stars, setStars] = useState([]);
  const [clouds, setClouds] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate background elements with mobile optimization
  useEffect(() => {
    const generateStars = () => {
      const starCount = isMobile ? 25 : 50; // Reduce stars on mobile
      const newStars = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (isMobile ? 2 : 3) + 1,
          twinkle: Math.random() * 2 + 1
        });
      }
      setStars(newStars);
    };

    const generateClouds = () => {
      const cloudCount = isMobile ? 4 : 8; // Reduce clouds on mobile
      const newClouds = [];
      for (let i = 0; i < cloudCount; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 120 - 20,
          y: Math.random() * 40 + 10,
          size: Math.random() * 0.5 + 0.5,
          speed: Math.random() * (isMobile ? 0.2 : 0.3) + 0.1 // Slower on mobile
        });
      }
      setClouds(newClouds);
    };

    generateStars();
    generateClouds();
  }, [isMobile]);

  // Animate clouds with mobile optimization
  useEffect(() => {
    const interval = setInterval(() => {
      setClouds(prevClouds => 
        prevClouds.map(cloud => ({
          ...cloud,
          x: cloud.x >= 120 ? -20 : cloud.x + cloud.speed
        }))
      );
    }, isMobile ? 200 : 100); // Slower animation interval on mobile

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="absolute inset-0">
      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className={`absolute bg-white rounded-full opacity-80 ${isMobile ? '' : 'twinkle'}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.twinkle}s`,
            animation: isMobile ? 'none' : `twinkle ${star.twinkle}s infinite alternate`
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
            fontSize: isMobile ? '18px' : '24px'
          }}
        >
          ☁️
        </div>
      ))}

      {/* Pixel Grid Overlay - Lighter on mobile */}
      <div 
        className="absolute inset-0 pixel-grid" 
        style={{
          opacity: isMobile ? 0.02 : 0.05
        }}
      />
    </div>
  );
};

export default Background;