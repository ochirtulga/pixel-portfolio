import React from 'react';
import { PixelButton } from '../../common';

const QuestForm = ({ 
  formData, 
  selectedContactType, 
  isSubmitting,
  onInputChange, 
  onSubmit, 
  onCancel 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-900 bg-opacity-30 p-4 rounded border border-yellow-400">
        <h4 className="text-yellow-400 font-mono font-bold text-sm mb-2">
          📋 Quest Details Form - {selectedContactType?.toUpperCase()}
        </h4>
        <p className="text-yellow-300 font-mono text-xs">
          Please provide the following information to proceed with your quest:
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2 text-sm">
            👤 Adventurer Name:
          </label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700 focus:border-green-300 transition-all duration-300"
            placeholder="Enter your character name..."
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2 text-sm">
            📜 Quest Description:
          </label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={onInputChange}
            rows="4"
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700 focus:border-green-300 resize-none transition-all duration-300"
            placeholder={`Describe your ${selectedContactType} quest in detail...`}
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex gap-3">
          <PixelButton 
            className="flex-1 justify-center py-3"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? '⏳ Sending...' : '🚀 Submit Quest'}
          </PixelButton>
          <PixelButton 
            className="px-6 py-3"
            onClick={onCancel}
            type="button"
          >
            ❌ Cancel
          </PixelButton>
        </div>
      </form>
    </div>
  );
};

export default QuestForm;