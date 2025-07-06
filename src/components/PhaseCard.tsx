import React, { useState } from 'react';
import { type Phase, type Task } from '../data/checklist';
import TaskItem from './TaskItem';
import ProgressBar from './ProgressBar';

interface PhaseCardProps {
  phase: Phase;
  progress: number;
  onTaskUpdate: (phaseId: string, taskId: string, updates: Partial<Task>) => void;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, progress, onTaskUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTasks = phase.tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedTasks = phase.tasks.filter(task => task.completed).length;
  const totalTasks = phase.tasks.length;
  const requiredTasks = phase.tasks.filter(task => task.priority === 'required').length;

  const getPhaseIcon = (phaseId: string): string => {
    const icons: { [key: string]: string } = {
      'preparation': '📋',
      'concept-design': '🎨',
      'tech-development': '⚙️',
      'seo-visibility': '🔍',
      'testing-qa': '🧪',
      'go-live': '🚀',
      'post-launch': '📈'
    };
    return icons[phaseId] || '📝';
  };

  const getPhaseColor = (progress: number): string => {
    if (progress === 100) return 'border-green-300 bg-green-50';
    if (progress >= 50) return 'border-yellow-300 bg-yellow-50';
    return 'border-gray-300 bg-white';
  };

  return (
    <div className={`border-2 rounded-xl shadow-lg transition-all duration-300 ${getPhaseColor(progress)}`}>
      {/* Phase Header */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-3xl">{getPhaseIcon(phase.id)}</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {phase.title}
                {progress === 100 && <span className="text-green-600">✅</span>}
              </h2>
              <p className="text-gray-600 mt-1">{phase.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">
                {completedTasks} / {totalTasks} Aufgaben
              </div>
              <div className="text-xs text-gray-400">
                {requiredTasks} davon Pflicht
              </div>
            </div>
            <span className={`transform transition-transform duration-200 text-2xl text-gray-400 ${
              isExpanded ? 'rotate-180' : ''
            }`}>
              ▼
            </span>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar progress={progress} size="medium" />
        </div>
      </div>

      {/* Phase Content */}
      {isExpanded && (
        <div className="px-6 pb-6">
          {/* Task Filter */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Alle ({totalTasks})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === 'pending' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Offen ({totalTasks - completedTasks})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === 'completed' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Erledigt ({completedTasks})
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  phase.tasks.forEach(task => {
                    if (!task.completed) {
                      onTaskUpdate(phase.id, task.id, { completed: true });
                    }
                  });
                }}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
                title="Alle Aufgaben als erledigt markieren"
              >
                ✅ Alle erledigt
              </button>
              <button
                onClick={() => {
                  phase.tasks.forEach(task => {
                    if (task.completed) {
                      onTaskUpdate(phase.id, task.id, { completed: false });
                    }
                  });
                }}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                title="Alle Aufgaben zurücksetzen"
              >
                🔄 Zurücksetzen
              </button>
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={(updates) => onTaskUpdate(phase.id, task.id, updates)}
              />
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {filter === 'pending' && '🎉 Alle Aufgaben erledigt!'}
              {filter === 'completed' && 'Noch keine erledigten Aufgaben.'}
              {filter === 'all' && 'Keine Aufgaben in dieser Phase.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhaseCard; 