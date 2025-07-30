import React, { useState } from 'react';
import { PixelButton } from '../common';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 bg-opacity-80 p-8 pixel-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2">
            PLAYER NAME:
          </label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700"
            placeholder="Enter your name..."
            required
          />
        </div>
        
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2">
            EMAIL ADDRESS:
          </label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700"
            placeholder="your.email@domain.com"
            required
          />
        </div>
        
        <div>
          <label className="block text-green-400 font-mono font-bold mb-2">
            MESSAGE:
          </label>
          <textarea 
            rows="6"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full bg-gray-900 text-green-400 font-mono p-3 pixel-border focus:outline-none focus:bg-gray-700 resize-none"
            placeholder="Type your message here..."
            required
          />
        </div>
        
        <PixelButton type="submit" className="w-full justify-center">
          📤 SEND MESSAGE
        </PixelButton>
      </form>
    </div>
  );
};

export default ContactForm;