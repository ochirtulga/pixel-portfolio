import React, { useState } from 'react';
import {
  ContactPageHeader,
  DialogueSystem,
  QuestForm,
  QuickConnectPanel,
  CharacterStatusPanel,
  QuestTypesPanel
} from './contact';
import { dialogueTreeData } from '../../data/dialogueTree';

const ContactPage = () => {
  const [currentDialogue, setCurrentDialogue] = useState('main');
  const [selectedContactType, setSelectedContactType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    contactType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleDialogueChoice = (choice) => {
    if (choice.next === 'form') {
      setSelectedContactType(choice.type);
      setFormData({ ...formData, contactType: choice.type });
      setShowForm(true);
    } else {
      setCurrentDialogue(choice.next);
      setShowForm(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Quest received! Thank you for choosing the ${selectedContactType} path! 🎉`);
      setFormData({ name: '', message: '', contactType: '' });
      setCurrentDialogue('main');
      setShowForm(false);
    }, 2000);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentDialogue('main');
  };

  const handleSocialClick = (platform) => {
    const socialLinks = {
      github: 'https://github.com/ochirtulga',
      linkedin: 'https://linkedin.com/in/ochirtulga',
      instagram: 'https://instagram.com/_ochrono_',
      leetcode: 'https://leetcode.com/ochirtulga'
    };

    const url = socialLinks[platform];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="py-8 animate-fade-in">
      {/* Header Section */}
      <ContactPageHeader />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Main Dialogue Area */}
        <div className="lg:col-span-2">
          {!showForm ? (
            <DialogueSystem
              currentDialogue={currentDialogue}
              dialogueTree={dialogueTreeData}
              onDialogueChoice={handleDialogueChoice}
            />
          ) : (
            <div className="bg-gray-800 bg-opacity-95 pixel-border relative min-h-96">
              {/* Character Portrait */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gray-900 border-4 border-green-400 rounded-full flex items-center justify-center text-2xl z-10">
                👨‍💻
              </div>

              {/* Form Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 border-b-2 border-green-400">
                <h3 className="text-xl font-bold text-green-400 font-mono flex items-center gap-2">
                  📝 Quest Form - {selectedContactType?.toUpperCase()}
                </h3>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <QuestForm
                  formData={formData}
                  selectedContactType={selectedContactType}
                  isSubmitting={isSubmitting}
                  onInputChange={handleInputChange}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </div>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <QuickConnectPanel onSocialClick={handleSocialClick} />
          <CharacterStatusPanel />
          <QuestTypesPanel />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;