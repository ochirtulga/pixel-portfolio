import React from 'react';
import { PixelButton } from '../../common';

const DialogueSystem = ({ 
  currentDialogue, 
  dialogueTree, 
  onDialogueChoice 
}) => {
  const currentNode = dialogueTree[currentDialogue];

  if (!currentNode) {
    return <div>Invalid dialogue node</div>;
  }

  return (
    <div className="bg-gray-800 bg-opacity-95 pixel-border relative min-h-96">
      {/* Character Portrait */}
      <div className="absolute -top-8 -left-8 w-16 h-16 bg-gray-900 border-4 border-green-400 rounded-full flex items-center justify-center text-2xl z-10">
        👨‍💻
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
        <div className="bg-gray-900 p-4 rounded-lg border-2 border-green-400 relative">
          <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-900 border-l-2 border-t-2 border-green-400 transform rotate-45"></div>
          <p className="text-gray-300 font-mono text-sm leading-relaxed">
            {currentNode.text}
          </p>
          {currentNode.info && (
            <div className="mt-3 p-3 bg-blue-900 bg-opacity-50 rounded border border-blue-400">
              <p className="text-blue-300 font-mono text-xs">{currentNode.info}</p>
            </div>
          )}
        </div>

        {/* Dialogue Options */}
        <div className="space-y-3">
          <h4 className="text-green-400 font-mono font-bold text-sm">Choose your response:</h4>
          {currentNode.options.map((option, index) => (
            <PixelButton
              key={option.id}
              onClick={() => onDialogueChoice(option)}
              className="w-full text-left justify-start p-4 hover:bg-green-600 hover:text-white transition-all duration-300"
            >
              <span className="text-sm">{option.text}</span>
            </PixelButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogueSystem;