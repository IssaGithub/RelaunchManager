import React, { useState } from 'react';

interface AutomationResult {
  endpoint: string;
  success: boolean;
  data?: any;
  error?: string;
}

const AutomationPanel: React.FC = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<AutomationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const automationChecks = [
    { 
      endpoint: '/api/check-https', 
      name: 'HTTPS & SSL', 
      description: 'Prüft SSL-Zertifikat und HTTPS-Weiterleitung',
      icon: '🔒'
    },
    { 
      endpoint: '/api/check-robots', 
      name: 'SEO-Dateien', 
      description: 'Überprüft robots.txt und sitemap.xml',
      icon: '🤖'
    },
    { 
      endpoint: '/api/check-meta', 
      name: 'Meta-Tags', 
      description: 'Analysiert Titel, Description und Open Graph',
      icon: '🏷️'
    },
    { 
      endpoint: '/api/check-redirects', 
      name: 'Weiterleitungen', 
      description: 'Testet 301-Redirects und URL-Struktur',
      icon: '↗️'
    }
  ];

  const runAllChecks = async () => {
    if (!url.trim()) {
      alert('Bitte geben Sie eine URL ein');
      return;
    }

    setIsRunning(true);
    setResults([]);

    const newResults: AutomationResult[] = [];

    for (const check of automationChecks) {
      try {
        const response = await fetch(check.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });

        const data = await response.json();
        
        newResults.push({
          endpoint: check.endpoint,
          success: data.success,
          data: data.data,
          error: data.error
        });
      } catch (error) {
        newResults.push({
          endpoint: check.endpoint,
          success: false,
          error: error instanceof Error ? error.message : 'Unbekannter Fehler'
        });
      }
    }

    setResults(newResults);
    setIsRunning(false);
  };

  const runSingleCheck = async (endpoint: string) => {
    if (!url.trim()) {
      alert('Bitte geben Sie eine URL ein');
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      
      // Update results for this specific endpoint
      setResults(prev => {
        const filtered = prev.filter(r => r.endpoint !== endpoint);
        return [...filtered, {
          endpoint,
          success: data.success,
          data: data.data,
          error: data.error
        }];
      });
    } catch (error) {
      setResults(prev => {
        const filtered = prev.filter(r => r.endpoint !== endpoint);
        return [...filtered, {
          endpoint,
          success: false,
          error: error instanceof Error ? error.message : 'Unbekannter Fehler'
        }];
      });
    }
  };

  const getCheckByEndpoint = (endpoint: string) => {
    return automationChecks.find(check => check.endpoint === endpoint);
  };

  const getResultByEndpoint = (endpoint: string) => {
    return results.find(result => result.endpoint === endpoint);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🔧 Automatische Website-Prüfungen
        </h2>
        <p className="mt-2 opacity-90">
          Lassen Sie Ihre Website automatisch auf wichtige Kriterien prüfen
        </p>
      </div>

      <div className="p-6">
        {/* URL Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website-URL:
          </label>
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ihre-website.de"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={runAllChecks}
              disabled={isRunning || !url.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isRunning ? '🔄' : '🚀'} 
              {isRunning ? 'Prüfe...' : 'Alle prüfen'}
            </button>
          </div>
        </div>

        {/* Individual Checks */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {automationChecks.map((check) => {
            const result = getResultByEndpoint(check.endpoint);
            
            return (
              <div key={check.endpoint} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{check.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{check.name}</h3>
                      <p className="text-sm text-gray-600">{check.description}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => runSingleCheck(check.endpoint)}
                    disabled={!url.trim()}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 disabled:opacity-50 transition-colors"
                  >
                    Prüfen
                  </button>
                </div>

                {/* Result */}
                {result && (
                  <div className={`mt-3 p-3 rounded-lg ${
                    result.success 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    {result.success ? (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-600">✅</span>
                          <span className="font-medium text-green-800">Prüfung erfolgreich</span>
                        </div>
                        {result.data?.recommendations && (
                          <div className="space-y-1">
                            {result.data.recommendations.map((rec: string, index: number) => (
                              <div key={index} className="text-sm text-green-700">
                                {rec}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-red-600">❌</span>
                          <span className="font-medium text-red-800">Fehler</span>
                        </div>
                        <div className="text-sm text-red-700">{result.error}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        {results.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">📊 Zusammenfassung</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{results.length}</div>
                <div className="text-sm text-gray-600">Geprüft</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">
                  {results.filter(r => r.success).length}
                </div>
                <div className="text-sm text-gray-600">Erfolgreich</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-2xl font-bold text-red-600">
                  {results.filter(r => !r.success).length}
                </div>
                <div className="text-sm text-gray-600">Fehler</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((results.filter(r => r.success).length / results.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomationPanel; 