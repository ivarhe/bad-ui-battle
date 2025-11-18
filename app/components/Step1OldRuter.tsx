'use client';

import { useState, useEffect } from 'react';

interface Step1OldRuterProps {
  onNext: () => void;
}

export default function Step1OldRuter({ onNext }: Step1OldRuterProps) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Delay showing the message to make it annoying
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ maxWidth: '428px', margin: '0 auto' }}>
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-1 text-xs">
        <span>18:41</span>
        <div className="flex items-center gap-1">
          <span>📶</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
        <h1 className="text-3xl font-bold">Billetter</h1>
        <button className="w-8 h-8 flex items-center justify-center">
          <span className="text-xl">⋯</span>
        </button>
      </div>

      {/* Main Content - Ticket Card */}
      <div className="flex-1 px-4 py-6">
        {!showMessage ? (
          <div className="space-y-4">
            {/* Active Ticket Card - Green */}
            <div className="bg-green-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-sm mb-2 opacity-90">365-dagersbillett</div>
                <div className="text-2xl font-bold mb-4">17 dager og 13 timer igjen</div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>😊</span>
                    <span>1 voksen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⚡</span>
                    <span>Sone 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🎫</span>
                    <span>16,69 % rabatt</span>
                  </div>
                </div>
                
                <div className="mt-4 text-blue-300 text-sm">Se detaljer &gt;</div>
              </div>
              
              {/* Ticket illustration */}
              <div className="absolute top-4 right-4 opacity-20">
                <div className="text-6xl">🎫</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                <span>📱</span>
                <span>Kontroll</span>
              </button>
              <button className="flex-1 bg-gray-800 text-white py-4 rounded-xl font-semibold">
                Kjøp ny billett
              </button>
            </div>

            {/* Quick Buy Section */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Hurtigkjøp</h2>
              <div className="bg-gray-900 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold">Enkeltbillett</div>
                  <div className="text-sm text-gray-400">1 barn, sone 1</div>
                </div>
                <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold">
                  Kjøp
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="bg-gray-900 rounded-2xl p-6 border-2 border-red-600 max-w-sm w-full">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">⚠️</div>
                <h2 className="text-2xl font-bold text-red-500 mb-2">VIKTIG MELDING</h2>
              </div>
              
              <div className="space-y-3 text-sm">
                <p className="text-gray-300">
                  Dette er den <strong className="text-white">GAMLE</strong> Ruter-appen. Den støttes ikke lenger.
                </p>
                <p className="text-gray-300">
                  Vi har rebrandet! Last ned vår nye app som heter <strong className="text-white">&quot;Retur&quot;</strong>.
                </p>
                <p className="text-gray-400 text-xs mt-4 italic">
                  (Hvorfor? Fordi grunner.)
                </p>
              </div>

              <button
                onClick={onNext}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl mt-6 transition-colors"
              >
                Last ned ny &quot;Retur&quot; App →
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Denne meldingen kan ikke avvises.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-800 bg-black">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center gap-1 py-2">
            <span className="text-2xl">🚌</span>
            <span className="text-xs text-gray-400">Reise</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2">
            <span className="text-2xl text-blue-500">🎫</span>
            <span className="text-xs text-blue-500 font-semibold">Billetter</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2">
            <span className="text-2xl">👤</span>
            <span className="text-xs text-gray-400">Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
