import React from 'react';
import { PixelButton } from '../common';

const ContactPage = () => (
  <div className="py-12 animate-fade-in">
    <h2 className="text-4xl font-bold text-green-400 font-mono mb-8 pixel-glow">
      📮 SEND MESSAGE
    </h2>
    <div className="max-w-2xl mx-auto bg-gray-800 bg-opacity-80 p-8 pixel-border">
      <div className="space-y-6">
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2">PLAYER NAME:</label>
          <input 
            type="text" 
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700"
            placeholder="Enter your name..."
          />
        </div>
        
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2">EMAIL ADDRESS:</label>
          <input 
            type="email" 
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700"
            placeholder="your.email@domain.com"
          />
        </div>
        
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2">MESSAGE:</label>
          <textarea 
            rows="6"
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700 resize-none"
            placeholder="Type your message here..."
          />
        </div>
        
        <PixelButton className="w-full justify-center">
          📤 SEND MESSAGE
        </PixelButton>
      </div>
    </div>
    
    <div className="text-center mt-8 space-y-2">
      <p className="text-gray-400 font-mono">OR FIND ME ON:</p>
      <div className="flex justify-center gap-4">
        <PixelButton>🐙 GITHUB</PixelButton>
        <PixelButton>💼 LINKEDIN</PixelButton>
        <PixelButton>🐦 TWITTER</PixelButton>
      </div>
    </div>
  </div>
);

export default ContactPage;