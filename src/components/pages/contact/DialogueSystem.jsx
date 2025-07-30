import React, { useState, useEffect } from 'react';
import { PixelButton } from '../../common';

const DialogueSystem = ({ 
  currentDialogue, 
  dialogueTree, 
  onDialogueChoice 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [displayedInfo, setDisplayedInfo] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoIndex, setInfoIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isInfoTypingComplete, setIsInfoTypingComplete] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const currentNode = dialogueTree[currentDialogue];

  // Reset state when dialogue changes
  useEffect(() => {
    setDisplayedText('');
    setDisplayedInfo('');
    setCurrentIndex(0);
    setInfoIndex(0);
    setIsTypingComplete(false);
    setIsInfoTypingComplete(false);
    setShowOptions(false);
  }, [currentDialogue]);

  // Typewriter effect for main text
  useEffect(() => {
    if (!currentNode) return;

    if (currentIndex < currentNode.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentNode.text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30); // Adjust speed here (lower = faster)

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
      // Start typing info text if it exists
      if (currentNode.info && !isInfoTypingComplete) {
        // Small delay before starting info text
        setTimeout(() => {
          setInfoIndex(1);
        }, 500);
      } else if (!currentNode.info) {
        // Show options immediately if no info text
        setTimeout(() => {
          setShowOptions(true);
        }, 800);
      }
    }
  }, [currentIndex, currentNode, isInfoTypingComplete]);

  // Typewriter effect for info text
  useEffect(() => {
    if (!currentNode) return;

    if (currentNode.info && isTypingComplete && infoIndex > 0 && infoIndex <= currentNode.info.length) {
      const timeout = setTimeout(() => {
        setDisplayedInfo(currentNode.info.slice(0, infoIndex));
        setInfoIndex(infoIndex + 1);
      }, 25); // Slightly faster for info text

      return () => clearTimeout(timeout);
    } else if (currentNode.info && infoIndex > currentNode.info.length) {
      setIsInfoTypingComplete(true);
      // Show options after info text is complete
      setTimeout(() => {
        setShowOptions(true);
      }, 800);
    }
  }, [infoIndex, currentNode, isTypingComplete]);

  if (!currentNode) {
    return <div>Invalid dialogue node</div>;
  }

  // Show options immediately if no typewriter needed (user clicks)
  const handleSkipTypewriter = () => {
    if (!isTypingComplete) {
      setDisplayedText(currentNode.text);
      setCurrentIndex(currentNode.text.length);
      setIsTypingComplete(true);
    }
    if (currentNode.info && !isInfoTypingComplete) {
      setDisplayedInfo(currentNode.info);
      setInfoIndex(currentNode.info.length + 1);
      setIsInfoTypingComplete(true);
    }
    setShowOptions(true);
  };

  return (
    <div className="bg-gray-800 bg-opacity-95 pixel-border relative min-h-96">
      {/* Character Portrait */}
      <div className="absolute -top-8 -left-8 w-16 h-16 bg-gray-900 border-4 border-green-400 rounded-full flex items-center justify-center text-2xl z-10">
      🧑🏻
      </div>

      {/* Dialogue Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 border-b-2 border-green-400">
        <h3 className="text-xl font-bold text-green-400 font-mono flex items-center gap-2">
          💬 {currentNode.speaker}
          <div className="flex gap-1 ml-auto">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </h3>
      </div>

      {/* Dialogue Content */}
      <div className="p-6 space-y-6">
        {/* NPC Speech */}
        <div 
          className="bg-gray-900 p-4 rounded-lg border-2 border-green-400 relative cursor-pointer"
          onClick={handleSkipTypewriter}
        >
          <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-900 border-l-2 border-t-2 border-green-400 transform rotate-45"></div>
          
          {/* Main dialogue text */}
          <p className="text-gray-300 font-mono text-sm leading-relaxed min-h-[60px]">
            {displayedText}
            {!isTypingComplete && (
              <span className="animate-pulse text-green-400 ml-1">|</span>
            )}
          </p>
          
          {/* Info text section */}
          {currentNode.info && (
            <div className="mt-3 p-3 bg-blue-900 bg-opacity-50 rounded border border-blue-400">
              <p className="text-blue-300 font-mono text-xs min-h-[16px]">
                {displayedInfo}
                {isTypingComplete && currentNode.info && !isInfoTypingComplete && (
                  <span className="animate-pulse text-blue-400 ml-1">|</span>
                )}
              </p>
            </div>
          )}

          {/* Continue indicator when typing is complete */}
          {((isTypingComplete && !currentNode.info) || (isInfoTypingComplete)) && !showOptions && (
            <div className="absolute bottom-2 right-3 animate-bounce">
              <span className="text-green-400 font-mono text-xs">▼</span>
            </div>
          )}

          {/* Click to skip indicator during typing */}
          {(!isTypingComplete || (currentNode.info && !isInfoTypingComplete)) && (
            <div className="absolute top-2 right-3">
              <span className="text-gray-500 font-mono text-xs opacity-60">Click to skip</span>
            </div>
          )}
        </div>

        {/* Dialogue Options */}
        <div className={`space-y-3 transition-all duration-500 ${showOptions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <h4 className="text-green-400 font-mono font-bold text-sm">Choose your response:</h4>
          {currentNode.options.map((option, index) => (
            <div 
              key={option.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PixelButton
                onClick={() => onDialogueChoice(option)}
                className="w-full text-left justify-start p-4 hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                <span className="text-sm">{option.text}</span>
              </PixelButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogueSystem;