'use client';

import { useState } from 'react';

interface Step2DownloadProps {
  onNext: () => void;
}

export default function Step2Download({ onNext }: Step2DownloadProps) {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [fakeErrors, setFakeErrors] = useState<string[]>([]);

  const startDownload = () => {
    setDownloading(true);
    setProgress(0);
    setFakeErrors([]);

    // Simulate slow, annoying download with fake errors
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        // Add fake errors at random intervals
        if (Math.random() > 0.7 && fakeErrors.length < 3) {
          const errorMessages = [
            'Tilkobling timeout. Prøver igjen...',
            'Server opptatt. Venter...',
            'Nedlastingshastighet for treg. Optimaliserer...',
          ];
          setFakeErrors(prev => [...prev, errorMessages[Math.floor(Math.random() * errorMessages.length)]]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onNext();
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ maxWidth: '428px', margin: '0 auto' }}>
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-1 text-xs">
        <span>18:42</span>
        <div className="flex items-center gap-1">
          <span>📶</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
        <button className="text-blue-500">←</button>
        <button className="text-blue-500">↗</button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* App Header Section */}
        <div className="px-4 py-6">
          <div className="flex items-start gap-4 mb-4">
            {/* App Icon - Red hashtag on white */}
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-5xl font-bold text-red-600">#</span>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">Ruter</h1>
              <p className="text-gray-400 text-sm mb-3">Finn reiser og kjøp billett</p>
              <button
                onClick={startDownload}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold"
              >
                Last ned Retur
              </button>
            </div>
          </div>

          {/* App Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-xs">
            <div>
              <div className="text-gray-400 mb-1">197K VURDERINGER</div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★★★★★</span>
                <span className="font-semibold">4,5</span>
              </div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">ALDERSGRENSE</div>
              <div className="font-semibold">4+ År</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">LISTE</div>
              <div className="font-semibold">Nr.3 i Reise</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">UTVIKLER</div>
              <div className="font-semibold">Ruter AS</div>
            </div>
          </div>
        </div>

        {/* What's New Section */}
        <div className="px-4 py-4 border-t border-gray-800">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Nytt &gt;</h2>
          </div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-semibold mb-1">Versjon 16.4.0</div>
              <div className="text-sm text-gray-400">For 1 uke siden</div>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Vi har fikset noen feil og gjort et par tekniske forbedringer som rett og slett skal gjøre appen litt bedre. Takk for at du bruker appen og gir oss tilbakemeldinger!
          </p>
        </div>

        {/* Screenshots Preview */}
        <div className="px-4 py-4 border-t border-gray-800">
          <h2 className="font-semibold mb-3">Forhåndsvisning</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* Screenshot 1 - Map */}
            <div className="flex-shrink-0 w-64 h-96 bg-gray-900 rounded-xl p-2">
              <div className="bg-gray-800 rounded-lg h-full flex flex-col">
                <div className="text-xs text-gray-400 px-2 py-1">09:41</div>
                <div className="flex-1 bg-green-200 rounded m-2 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">Kartvisning</span>
                </div>
                <div className="px-2 pb-2">
                  <div className="bg-blue-600 text-white text-xs py-2 px-4 rounded-lg text-center">Skann</div>
                </div>
              </div>
            </div>
            
            {/* Screenshot 2 - Tickets */}
            <div className="flex-shrink-0 w-64 h-96 bg-gray-900 rounded-xl p-2">
              <div className="bg-gray-800 rounded-lg h-full flex flex-col p-3">
                <div className="text-xs text-gray-400 mb-2">09:41</div>
                <div className="font-bold text-lg mb-3">Billetter</div>
                <div className="bg-green-500 rounded-xl p-4 text-white mb-3">
                  <div className="text-sm mb-1">Enkeltbillett</div>
                  <div className="text-xl font-bold mb-2">59 min og 47 sek igjen</div>
                  <div className="text-xs space-y-1">
                    <div>1 voksen</div>
                    <div>Sone 1</div>
                  </div>
                </div>
                <div className="bg-blue-600 text-white text-xs py-2 px-4 rounded-lg text-center">Kontroll</div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Progress */}
        {downloading && (
          <div className="px-4 py-4 border-t border-gray-800 bg-gray-900">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2 animate-bounce">⬇️</div>
              <h3 className="font-semibold mb-2">Laster ned...</h3>
            </div>

            {/* Progress bar */}
            <div className="bg-gray-700 rounded-full h-3 overflow-hidden mb-3">
              <div
                className="bg-blue-600 h-full transition-all duration-300 flex items-center justify-center text-white text-xs font-bold"
                style={{ width: `${progress}%` }}
              >
                {progress < 100 ? `${Math.round(progress)}%` : 'Ferdig!'}
              </div>
            </div>

            {/* Fake error messages */}
            {fakeErrors.length > 0 && (
              <div className="space-y-2">
                {fakeErrors.map((error, idx) => (
                  <div
                    key={idx}
                    className="bg-yellow-900 border border-yellow-700 p-2 rounded text-xs text-yellow-300 animate-pulse"
                  >
                    {error}
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-400 text-center mt-2">
              Estimert tid igjen: {Math.max(0, Math.round((100 - progress) * 0.3))} sekunder
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
