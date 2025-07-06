import React, { useState, useEffect } from 'react';
import { checklistData, type Phase, type Task, getTotalProgress, getPhaseProgress } from '../data/checklist';
import PhaseCard from './PhaseCard';
import ProgressBar from './ProgressBar';
import FilterControls from './FilterControls';
import AutomationPanel from './AutomationPanel';

type FilterType = 'all' | 'completed' | 'pending' | 'required' | 'recommended';

const RelaunchManager: React.FC = () => {
  const [phases, setPhases] = useState<Phase[]>(checklistData);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAutomation, setShowAutomation] = useState(false);

  // LocalStorage für Persistierung
  useEffect(() => {
    const savedData = localStorage.getItem('relaunch-checklist');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setPhases(parsed);
      } catch (error) {
        console.error('Fehler beim Laden der gespeicherten Daten:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('relaunch-checklist', JSON.stringify(phases));
  }, [phases]);

  const updateTask = (phaseId: string, taskId: string, updates: Partial<Task>) => {
    setPhases(prevPhases => 
      prevPhases.map(phase => 
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map(task =>
                task.id === taskId ? { ...task, ...updates } : task
              )
            }
          : phase
      )
    );
  };

  const resetProgress = () => {
    if (confirm('Möchten Sie wirklich den gesamten Fortschritt zurücksetzen?')) {
      setPhases(checklistData.map(phase => ({
        ...phase,
        tasks: phase.tasks.map(task => ({
          ...task,
          completed: false,
          notes: ''
        }))
      })));
    }
  };

  const exportProgress = () => {
    const dataStr = JSON.stringify(phases, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `relaunch-checklist-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setPhases(imported);
        } catch (error) {
          alert('Fehler beim Importieren der Datei. Bitte prüfen Sie das Format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredPhases = phases.map(phase => ({
    ...phase,
    tasks: phase.tasks.filter(task => {
      // Filter nach Status
      const statusMatch = activeFilter === 'all' || 
                         (activeFilter === 'completed' && task.completed) ||
                         (activeFilter === 'pending' && !task.completed) ||
                         (activeFilter === 'required' && task.priority === 'required') ||
                         (activeFilter === 'recommended' && task.priority === 'recommended');

      // Filter nach Suchbegriff
      const searchMatch = searchTerm === '' ||
                         task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    })
  })).filter(phase => phase.tasks.length > 0);

  const totalProgress = getTotalProgress();
  const completedTasks = phases.flatMap(p => p.tasks).filter(t => t.completed).length;
  const totalTasks = phases.flatMap(p => p.tasks).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🚀 Website Relaunch Manager
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Ihr interaktiver Leitfaden für erfolgreiche Website-Relaunches
          </p>
          
          {/* Gesamtfortschritt */}
          <div className="max-w-2xl mx-auto mb-6">
            <ProgressBar 
              progress={totalProgress} 
              label={`Gesamtfortschritt: ${completedTasks} von ${totalTasks} Aufgaben`}
              size="large"
            />
          </div>

          {/* Aktionsbuttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setShowAutomation(!showAutomation)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              🔧 Automatische Prüfungen
            </button>
            <button
              onClick={exportProgress}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              📥 Exportieren
            </button>
            <label className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer flex items-center gap-2">
              📤 Importieren
              <input
                type="file"
                accept=".json"
                onChange={importProgress}
                className="hidden"
              />
            </label>
            <button
              onClick={resetProgress}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              🔄 Zurücksetzen
            </button>
          </div>
        </div>

        {/* Automatisierung Panel */}
        {showAutomation && (
          <div className="mb-8">
            <AutomationPanel />
          </div>
        )}

        {/* Filter & Suche */}
        <div className="mb-8">
          <FilterControls
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            stats={{
              total: totalTasks,
              completed: completedTasks,
              required: phases.flatMap(p => p.tasks).filter(t => t.priority === 'required').length,
              recommended: phases.flatMap(p => p.tasks).filter(t => t.priority === 'recommended').length
            }}
          />
        </div>

        {/* Phasen */}
        <div className="space-y-6">
          {filteredPhases.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              progress={getPhaseProgress(phase.id)}
              onTaskUpdate={updateTask}
            />
          ))}
        </div>

        {filteredPhases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Keine Aufgaben gefunden, die den aktuellen Filtern entsprechen.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500">
          <p>
            Entwickelt für erfolgreiche Website-Relaunches • 
            <span className="ml-2">Version 1.0</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RelaunchManager; 