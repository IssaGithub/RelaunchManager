import React from 'react';

type FilterType = 'all' | 'completed' | 'pending' | 'required' | 'recommended';

interface FilterControlsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  stats: {
    total: number;
    completed: number;
    required: number;
    recommended: number;
  };
}

const FilterControls: React.FC<FilterControlsProps> = ({
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  stats
}) => {
  const filters: { key: FilterType; label: string; count: number; color: string }[] = [
    { key: 'all', label: 'Alle', count: stats.total, color: 'bg-gray-600' },
    { key: 'pending', label: 'Offen', count: stats.total - stats.completed, color: 'bg-orange-600' },
    { key: 'completed', label: 'Erledigt', count: stats.completed, color: 'bg-green-600' },
    { key: 'required', label: 'Pflicht', count: stats.required, color: 'bg-red-600' },
    { key: 'recommended', label: 'Optional', count: stats.recommended, color: 'bg-blue-600' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? `${filter.color} text-white shadow-lg transform scale-105`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              <span className="mr-2">
                {filter.key === 'all' && '📋'}
                {filter.key === 'pending' && '⏳'}
                {filter.key === 'completed' && '✅'}
                {filter.key === 'required' && '🔴'}
                {filter.key === 'recommended' && '🔵'}
              </span>
              {filter.label}
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                activeFilter === filter.key
                  ? 'bg-white bg-opacity-30'
                  : 'bg-gray-200'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Aufgaben durchsuchen..."
            className="pl-10 pr-4 py-2 w-full lg:w-80 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              ❌
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-600">Gesamt</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Erledigt</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-600">{stats.total - stats.completed}</div>
            <div className="text-sm text-gray-600">Offen</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((stats.completed / stats.total) * 100) || 0}%
            </div>
            <div className="text-sm text-gray-600">Fortschritt</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-gray-500">Schnellfilter:</span>
        <button
          onClick={() => onFilterChange('required')}
          className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
        >
          Nur Pflichtaufgaben
        </button>
        <button
          onClick={() => onFilterChange('pending')}
          className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors"
        >
          Was ist zu tun?
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
        >
          Erfolge zeigen
        </button>
      </div>
    </div>
  );
};

export default FilterControls; 