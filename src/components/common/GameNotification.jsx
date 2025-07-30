import React, { useState, useEffect } from 'react';

const GameNotification = ({ 
  notification, 
  onClose,
  duration = null // Remove auto-close, only manual close
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (notification) {
      // Show notification
      setIsVisible(true);
      setIsExiting(false);
      // Remove auto-hide timer - only manual close now
    }
  }, [notification, onClose]);

  if (!notification || !isVisible) return null;

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 500);
  };

  const getNotificationStyles = () => {
    if (notification.type === 'success') {
      return {
        bgColor: 'bg-green-900',
        borderColor: 'border-green-400',
        textColor: 'text-green-300',
        accentColor: 'text-green-400',
        icon: '🎉'
      };
    } else if (notification.type === 'error') {
      return {
        bgColor: 'bg-red-900',
        borderColor: 'border-red-400',
        textColor: 'text-red-300',
        accentColor: 'text-red-400',
        icon: '❌'
      };
    } else {
      return {
        bgColor: 'bg-blue-900',
        borderColor: 'border-blue-400',
        textColor: 'text-blue-300',
        accentColor: 'text-blue-400',
        icon: 'ℹ️'
      };
    }
  };

  const styles = getNotificationStyles();

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay with particles effect */}
      <div className="absolute inset-0 bg-black bg-opacity-30">
        {notification.type === 'success' && (
          <>
            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-400 animate-bounce"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              >
                ✨
              </div>
            ))}
          </>
        )}
      </div>

      {/* Main notification */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className={`
            ${styles.bgColor} ${styles.borderColor} ${styles.textColor}
            max-w-md w-full border-4 rounded-lg shadow-2xl pixel-border
            transform transition-all duration-500 pointer-events-auto
            ${isExiting 
              ? 'scale-75 opacity-0 translate-y-8' 
              : 'scale-100 opacity-100 translate-y-0'
            }
          `}
          style={{
            animation: isExiting ? 'none' : 'gameNotificationEntrance 0.5s ease-out'
          }}
        >
          {/* Header with close button */}
          <div className={`${styles.bgColor} px-4 py-3 border-b-2 ${styles.borderColor} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{styles.icon}</span>
              <h3 className={`${styles.accentColor} font-mono font-bold text-lg`}>
                {notification.type === 'success' ? 'QUEST COMPLETE!' : 
                 notification.type === 'error' ? 'QUEST FAILED!' : 'NOTIFICATION'}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className={`${styles.accentColor} hover:text-white transition-colors text-xl font-bold`}
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">
                {notification.type === 'success' ? '🏆' : 
                 notification.type === 'error' ? '💥' : '📢'}
              </div>
              <div className="flex-1">
                <h4 className={`${styles.accentColor} font-mono font-bold text-lg mb-2`}>
                  {notification.title}
                </h4>
                <p className="font-mono text-sm leading-relaxed mb-4">
                  {notification.message}
                </p>
                
                {/* XP Gained (for success) */}
                {notification.type === 'success' && (
                  <div className="bg-black bg-opacity-30 p-3 rounded border border-yellow-600">
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 font-mono font-bold text-sm">
                        ⭐ XP GAINED:
                      </span>
                      <span className="text-yellow-300 font-mono text-sm">
                        +{notification.xp || 50} Communication Points
                      </span>
                    </div>
                  </div>
                )}

                {/* Achievement unlocked */}
                {notification.achievement && (
                  <div className="mt-3 bg-purple-900 bg-opacity-50 p-3 rounded border border-purple-400">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎖️</span>
                      <div>
                        <div className="text-purple-300 font-mono font-bold text-xs">
                          ACHIEVEMENT UNLOCKED
                        </div>
                        <div className="text-purple-200 font-mono text-xs">
                          {notification.achievement}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer with continue button */}
          <div className={`px-4 py-3 border-t-2 ${styles.borderColor} text-center`}>
            <button
              onClick={handleClose}
              className={`
                ${styles.accentColor} hover:bg-gray-700 hover:text-white
                px-6 py-3 font-mono font-bold text-sm border-2 ${styles.borderColor}
                transition-all duration-200 pixel-border animate-pulse
              `}
            >
              CONTINUE → 
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gameNotificationEntrance {
          0% {
            transform: scale(0.5) translateY(-50px);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) translateY(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default GameNotification;