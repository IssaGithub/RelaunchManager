import React, { useState } from 'react';
import { type Task } from '../data/checklist';

interface TaskItemProps {
  task: Task;
  onUpdate: (updates: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [notes, setNotes] = useState(task.notes || '');
  const [isAutomating, setIsAutomating] = useState(false);
  const [automationResults, setAutomationResults] = useState<any>(null);

  const handleCheckboxChange = (completed: boolean) => {
    onUpdate({ completed });
  };

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes);
    onUpdate({ notes: newNotes });
  };

  const runAutomation = async () => {
    if (!task.automationEndpoint) return;
    
    const url = prompt('Bitte geben Sie die zu prüfende URL ein:', 'https://example.com');
    if (!url) return;

    setIsAutomating(true);
    setAutomationResults(null);

    try {
      const response = await fetch(task.automationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();
      setAutomationResults(result);
    } catch (error) {
      setAutomationResults({
        success: false,
        error: 'Fehler bei der automatischen Prüfung',
        details: error instanceof Error ? error.message : 'Unbekannter Fehler'
      });
    } finally {
      setIsAutomating(false);
    }
  };

  const getPriorityColor = (priority: string): string => {
    return priority === 'required' 
      ? 'text-red-600 bg-red-100' 
      : 'text-blue-600 bg-blue-100';
  };

  const getPriorityIcon = (priority: string): string => {
    return priority === 'required' ? '🔴' : '🔵';
  };

  return (
    <div className={`border rounded-lg p-4 transition-all duration-200 ${
      task.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>

        <div className="flex-grow min-w-0">
          {/* Task Header */}
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <h3 className={`font-semibold ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
            </div>

            {/* Priority Badge & Actions */}
            <div className="flex items-center space-x-2 ml-4">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                getPriorityColor(task.priority)
              }`}>
                {getPriorityIcon(task.priority)} {task.priority === 'required' ? 'Pflicht' : 'Optional'}
              </span>
              
              {task.automatable && (
                <button
                  onClick={runAutomation}
                  disabled={isAutomating}
                  className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors disabled:opacity-50"
                  title="Automatische Prüfung starten"
                >
                  {isAutomating ? '🔄' : '🔧'} Auto-Check
                </button>
              )}

              {task.helpText && (
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
                  title="Hilfe anzeigen"
                >
                  💡 Hilfe
                </button>
              )}
            </div>
          </div>

          {/* Details Panel */}
          {showDetails && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              {task.helpText && (
                <div className="mb-4">
                  <h4 className="font-medium text-blue-800 mb-2">💡 Hilfestellung:</h4>
                  <p className="text-blue-700 text-sm">{task.helpText}</p>
                </div>
              )}

              {/* Automation Results */}
              {automationResults && (
                <div className="mb-4">
                  <h4 className="font-medium text-blue-800 mb-2">🔧 Prüfungsergebnis:</h4>
                  {automationResults.success ? (
                    <div className="space-y-2">
                      {automationResults.data?.recommendations?.map((rec: string, index: number) => (
                        <div key={index} className="text-sm">
                          {rec}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-red-600 text-sm">
                      ❌ {automationResults.error}
                      {automationResults.details && (
                        <div className="text-xs mt-1 text-red-500">
                          {automationResults.details}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-blue-800 mb-2">
                  📝 Notizen:
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  placeholder="Ihre Notizen zu dieser Aufgabe..."
                  className="w-full p-2 border border-blue-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem; 