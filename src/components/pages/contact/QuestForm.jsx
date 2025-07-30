import React, { useState } from 'react';
import { PixelButton, GameNotification } from '../../common';
import { sendContactEmail, sendMailtoEmail } from '../../../services/emailService';

const QuestForm = ({ 
  formData, 
  selectedContactType, 
  isSubmitting,
  onInputChange, 
  onSubmit, 
  onCancel 
}) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [gameNotification, setGameNotification] = useState(null);
  const [isLocalSubmitting, setIsLocalSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!', { formData }); // Debug log
    
    // Validate form
    if (!formData.name.trim() || !formData.message.trim()) {
      console.log('Validation failed'); // Debug log
      setSubmitStatus({ success: false, message: 'Please fill in all required fields!' });
      setGameNotification({
        type: 'error',
        title: 'Quest Failed!',
        message: 'Please fill in all required fields to proceed with your quest.',
        xp: 0
      });
      return;
    }

    console.log('Opening email client...'); // Debug log
    setIsLocalSubmitting(true);

    try {
      // Use mailto method
      const result = sendMailtoEmail(formData);
      console.log('Mailto result:', result); // Debug log
      
      setSubmitStatus(result);
      setIsLocalSubmitting(false);
      
      if (result.success) {
        setGameNotification({
          type: 'success',
          title: 'Email Client Launched!',
          message: 'Your default email application has been opened with your quest details pre-filled. Please send the message to complete your quest!',
          xp: 25,
          achievement: 'Communication Initiated'
        });
      } else {
        setGameNotification({
          type: 'error',
          title: 'Email Client Error!',
          message: result.message || 'Could not open your email client. Please try again.',
          xp: 0
        });
      }
      
      // Reset form after a short delay
      setTimeout(() => {
        setSubmitStatus(null);
        onCancel(); // Return to dialogue
      }, 5000);
      
    } catch (error) {
      console.error('Email client error:', error);
      setIsLocalSubmitting(false);
      const errorMessage = 'Failed to open email client. Please try again.';
      setSubmitStatus({ 
        success: false, 
        message: errorMessage 
      });
      
      setGameNotification({
        type: 'error',
        title: 'System Error!',
        message: 'Could not launch your email application. Please check your system settings.',
        xp: 0
      });
    }
  };

  const currentlySubmitting = isSubmitting || isLocalSubmitting;

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

      {/* Info Message */}
      <div className="bg-blue-900 bg-opacity-30 p-3 rounded border border-blue-400">
        <h5 className="text-blue-400 font-mono font-bold text-xs mb-2">📧 EMAIL METHOD:</h5>
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

      {/* Status Message */}
      {submitStatus && (
        <div className={`p-4 rounded border font-mono text-sm ${
          submitStatus.success 
            ? 'bg-green-900 bg-opacity-50 border-green-400 text-green-300'
            : 'bg-red-900 bg-opacity-50 border-red-400 text-red-300'
        }`}>
          <div className="flex items-center gap-2">
            <span>{submitStatus.success ? '✅' : '❌'}</span>
            <span>{submitStatus.message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={currentlySubmitting}
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
            disabled={currentlySubmitting}
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
            disabled={currentlySubmitting}
          />
        </div>
        
        <div className="flex gap-3">
          <PixelButton 
            className="flex-1 justify-center py-3"
            type="submit"
            disabled={currentlySubmitting}
          >
            {currentlySubmitting ? '⏳ Sending...' : '🚀 Submit Quest'}
          </PixelButton>
          <PixelButton 
            className="px-6 py-3"
            onClick={onCancel}
            type="button"
            disabled={currentlySubmitting}
          >
            ❌ Cancel
          </PixelButton>
        </div>
      </form>
    </div>

    {/* Game Notification Overlay */}
    <GameNotification 
      notification={gameNotification}
      onClose={() => setGameNotification(null)}
      duration={4000}
    />
  </>
  );
};

export default QuestForm;