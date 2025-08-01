import React, { useState, useEffect } from 'react';
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
    email: '',
    message: '',
    contactType: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('dialogue');

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDialogueChoice = (choice) => {
    if (choice.next === 'form') {
      setSelectedContactType(choice.type);
      setFormData({ ...formData, contactType: choice.type });
      setShowForm(true);
      if (isMobile) {
        setActiveTab('form');
      }
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

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentDialogue('main');
    setFormData({ name: '', email: '', message: '', contactType: '' });
    if (isMobile) {
      setActiveTab('dialogue');
    }
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

  if (isMobile) {
    return (
      <div className="py-4 animate-fade-in">
        <ContactPageHeader />

        {/* Mobile Tab Navigation */}
        <div className="mb-4 px-4">
          <div className="flex bg-gray-800 rounded-lg border-2 border-green-400 p-1">
            <button
              onClick={() => setActiveTab('dialogue')}
              className={`flex-1 py-2 px-3 text-xs font-mono font-bold rounded transition-all ${
                activeTab === 'dialogue'
                  ? 'bg-green-400 text-gray-900'
                  : 'text-green-400 hover:bg-gray-700'
              }`}
            >
              💬 TALK
            </button>
            <button
              onClick={() => setActiveTab('connect')}
              className={`flex-1 py-2 px-3 text-xs font-mono font-bold rounded transition-all ${
                activeTab === 'connect'
                  ? 'bg-green-400 text-gray-900'
                  : 'text-green-400 hover:bg-gray-700'
              }`}
            >
              ⚡ CONNECT
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-2 px-3 text-xs font-mono font-bold rounded transition-all ${
                activeTab === 'info'
                  ? 'bg-green-400 text-gray-900'
                  : 'text-green-400 hover:bg-gray-700'
              }`}
            >
              📊 INFO
            </button>
          </div>
        </div>

        {/* Mobile Content Based on Active Tab */}
        <div className="px-4">
          {activeTab === 'dialogue' && (
            <div className="space-y-4">
              {!showForm ? (
                <DialogueSystem
                  currentDialogue={currentDialogue}
                  dialogueTree={dialogueTreeData}
                  onDialogueChoice={handleDialogueChoice}
                />
              ) : (
                <div className="bg-gray-800 bg-opacity-95 pixel-border relative">
                  {/* Mobile Form Header */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 border-b-2 border-green-400">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-green-400 font-mono">
                        📝 Quest Form
                      </h3>
                      <button
                        onClick={handleFormCancel}
                        className="text-green-400 hover:text-white font-bold text-xl"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 font-mono mt-1">
                      {selectedContactType?.toUpperCase()}
                    </p>
                  </div>

                  {/* Mobile Form Content */}
                  <div className="p-4">
                    <QuestForm
                      formData={formData}
                      selectedContactType={selectedContactType}
                      onInputChange={handleInputChange}
                      onCancel={handleFormCancel}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'connect' && (
            <div className="space-y-4">
              <QuickConnectPanel onSocialClick={handleSocialClick} />
              <QuestTypesPanel />
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-4">
              <CharacterStatusPanel />
              
              {/* Mobile-specific quick contact */}
              <div className="bg-gray-800 bg-opacity-95 pixel-border">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-4 py-3 border-b-2 border-blue-400">
                  <h3 className="text-lg font-bold text-blue-400 font-mono">
                    📧 Quick Contact
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="text-center">
                    <a 
                      href="mailto:ochirtulgan@gmail.com"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white font-mono font-bold py-3 px-6 rounded border-2 border-green-400 transition-colors w-full text-center"
                    >
                      📨 Email Direct
                    </a>
                  </div>
                  <div className="text-center text-xs text-gray-400 font-mono">
                    Or use the dialogue system above for guided contact
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom CTA */}
        <div className="mt-6 px-4">
          <div className="bg-purple-900 bg-opacity-50 rounded-lg border-2 border-purple-400 p-4 text-center">
            <div className="text-2xl mb-2">🎮</div>
            <h4 className="text-purple-300 font-mono font-bold text-sm mb-2">
              Ready to Start Your Quest?
            </h4>
            <p className="text-purple-200 font-mono text-xs mb-3">
              Let's build something amazing together!
            </p>
            <button
              onClick={() => {
                setActiveTab('dialogue');
                setCurrentDialogue('main');
                setShowForm(false);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-mono font-bold py-2 px-4 rounded border-2 border-purple-400 transition-colors text-sm w-full"
            >
              🚀 Start Dialogue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Original layout
  return (
    <div className="py-8 animate-fade-in">
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
                  onInputChange={handleInputChange}
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