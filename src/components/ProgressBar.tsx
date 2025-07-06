import React from 'react';

interface ProgressBarProps {
  progress: number;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  label, 
  size = 'medium', 
  showPercentage = true,
  color = 'blue'
}) => {
  const getHeightClass = (size: string): string => {
    switch (size) {
      case 'small': return 'h-2';
      case 'medium': return 'h-4';
      case 'large': return 'h-6';
      default: return 'h-4';
    }
  };

  const getColorClasses = (color: string, progress: number): string => {
    // Auto-Farbe basierend auf Fortschritt
    if (color === 'blue') {
      if (progress === 100) return 'bg-green-500';
      if (progress >= 75) return 'bg-blue-500';
      if (progress >= 50) return 'bg-yellow-500';
      if (progress >= 25) return 'bg-orange-500';
      return 'bg-red-500';
    }

    const colorMap: { [key: string]: string } = {
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
      blue: 'bg-blue-500'
    };
    
    return colorMap[color] || 'bg-blue-500';
  };

  const getTextSizeClass = (size: string): string => {
    switch (size) {
      case 'small': return 'text-xs';
      case 'medium': return 'text-sm';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };

  const getProgressEmoji = (progress: number): string => {
    if (progress === 100) return '🎉';
    if (progress >= 75) return '💪';
    if (progress >= 50) return '👍';
    if (progress >= 25) return '🔄';
    return '🚀';
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <div className={`flex justify-between items-center mb-2 ${getTextSizeClass(size)}`}>
          <span className="font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-gray-600 flex items-center gap-1">
              <span>{getProgressEmoji(progress)}</span>
              <span>{progress}%</span>
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${getHeightClass(size)}`}>
        <div
          className={`${getHeightClass(size)} rounded-full transition-all duration-500 ease-out ${getColorClasses(color, progress)}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          {/* Glänzender Effekt für größere Balken */}
          {size !== 'small' && (
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse" />
          )}
        </div>
      </div>

      {/* Percentage unter dem Balken für kleine Version */}
      {size === 'small' && showPercentage && !label && (
        <div className="text-xs text-gray-600 mt-1 text-center">
          {progress}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar; 