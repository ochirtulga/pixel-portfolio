import React, { useState, useEffect } from 'react';

const Background = () => {
  const [stars, setStars] = useState([]);
  const [clouds, setClouds] = useState([]);

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

  return (
    <div className="absolute inset-0">
      {/* Stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full opacity-80 twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.twinkle}s`
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
      <div className="absolute inset-0 pixel-grid" />
    </div>
  );
};

export default Background;