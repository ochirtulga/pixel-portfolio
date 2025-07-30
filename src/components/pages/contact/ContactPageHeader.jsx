import React from 'react';

const ContactPageHeader = ({ 
  title = "NPC INTERACTION TERMINAL",
  subtitle = "Initiate dialogue sequence with Adventurer Ochi to begin your quest.",
  characterEmoji = "👨🏻‍💻"
}) => {
  return (
    <div className="text-center mb-8">
      <div className="text-6xl mb-4 animate-bounce">{characterEmoji}</div>
      <h2 className="text-4xl font-bold text-green-400 font-mono mb-4 pixel-glow">
        {title}
      </h2>
      <p className="text-gray-300 font-mono text-sm max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default ContactPageHeader;