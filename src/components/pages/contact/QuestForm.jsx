import React, { useState } from 'react';
import { PixelButton, GameNotification } from '../../common';

const QuestForm = ({ 
  formData, 
  selectedContactType, 
  onInputChange, 
  onCancel 
}) => {
  const [gameNotification, setGameNotification] = useState(null);

  const openEmailApp = () => {
    // Validate form
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Please fill in your name and message before submitting!');
      return;
    }

    // Create email content
    const subject = encodeURIComponent(`${selectedContactType} Quest from ${formData.name}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Contact Type: ${selectedContactType}
Email: ${formData.email || 'Not provided'}

Message:
${formData.message}

---
Sent from your Pixel Portfolio contact form
    `);
    
    // Open email app
    const mailtoLink = `mailto:ochirtulgan@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Show success notification
    setGameNotification({
      type: 'success',
      title: 'Email Client Launched!',
      message: 'Your default email application has been opened with your quest details pre-filled. Please send the message to complete your quest!',
      xp: 25,
      achievement: 'Communication Initiated'
    });
    
    // Don't auto-return - let user click continue button
  };

  return (
    <>
      <div className="space-y-4">
        <div className="bg-yellow-900 bg-opacity-30 p-4 rounded border border-yellow-400">
          <h4 className="text-yellow-400 font-mono font-bold text-sm mb-2">
            📋 Quest Details Form - {selectedContactType?.toUpperCase()}
          </h4>
          <p className="text-yellow-300 font-mono text-xs">
            Please provide the following information to proceed with your quest:
          </p>
        </div>

        <div className="bg-blue-900 bg-opacity-30 p-3 rounded border border-blue-400">
          <div className="flex items-center gap-2">
            <span className="text-lg">📧</span>
            <div>
              <div className="text-blue-300 font-mono font-bold text-sm">Your Email App</div>
              <div className="text-blue-300 font-mono text-xs opacity-75">
                Opens your default email application with quest details pre-filled
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-green-400 font-mono font-bold mb-2 text-sm">
              👤 Adventurer Name: <span className="text-red-400">*</span>
            </label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={onInputChange}
              className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700 focus:border-green-300 transition-all duration-300"
              placeholder="Enter your character name..."
              required
            />
          </div>

          <div>
            <label className="block text-green-400 font-mono font-bold mb-2 text-sm">
              📧 Email Address: <span className="text-gray-500">(optional)</span>
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email || ''}
              onChange={onInputChange}
              className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700 focus:border-green-300 transition-all duration-300"
              placeholder="your.email@domain.com"
            />
          </div>
          
          <div>
            <label className="block text-green-400 font-mono font-bold mb-2 text-sm">
              📜 Quest Description: <span className="text-red-400">*</span>
            </label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={onInputChange}
              rows="4"
              className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700 focus:border-green-300 resize-none transition-all duration-300"
              placeholder={`Describe your ${selectedContactType} quest in detail...`}
              required
            />
          </div>
          
          <div className="flex gap-3">
            <PixelButton 
              className="flex-1 justify-center py-3"
              onClick={openEmailApp}
            >
              🚀 Submit Quest
            </PixelButton>
            <PixelButton 
              className="px-6 py-3"
              onClick={onCancel}
            >
              ❌ Cancel
            </PixelButton>
          </div>
        </div>
      </div>

      <GameNotification 
        notification={gameNotification}
        onClose={() => setGameNotification(null)}
        duration={4000}
      />
    </>
  );
};

export default QuestForm;