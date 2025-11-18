'use client';

import { useState, useEffect } from 'react';

interface Step3NewReturProps {
  onNext: () => void;
}

export default function Step3NewRetur({ onNext }: Step3NewReturProps) {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Annoying loading delay
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setShowContent(true);
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-900 text-white flex flex-col" style={{ maxWidth: '428px', margin: '0 auto' }}>
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-1 text-xs">
        <span>18:43</span>
        <div className="flex items-center gap-1">
          <span>📶</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-spin">🔄</div>
            <h2 className="text-2xl font-bold mb-2">Laster Retur...</h2>
            <div className="space-y-2 mt-4">
              <div className="h-2 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
              <div className="h-2 bg-white bg-opacity-20 rounded-full animate-pulse delay-75"></div>
              <div className="h-2 bg-white bg-opacity-20 rounded-full animate-pulse delay-150"></div>
            </div>
            <p className="text-xs text-gray-300 mt-4">Initialiserer sikker tilkobling...</p>
          </div>
        </div>
      ) : showContent ? (
        <>
          {/* Bad Header - Too many elements */}
          <div className="px-4 py-3 border-b-4 border-yellow-500 bg-gradient-to-r from-red-600 to-pink-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl animate-bounce">🚌</span>
                <h1 className="text-3xl font-bold" style={{ fontFamily: 'Comic Sans MS, cursive', textShadow: '3px 3px 0px yellow' }}>
                  RETUR
                </h1>
                <span className="text-2xl animate-pulse">✨</span>
              </div>
              <button className="text-2xl">⚙️</button>
            </div>
            <p className="text-xs mt-1 opacity-75">Den nye Ruter-opplevelsen (ikke testet)</p>
          </div>

          {/* Main Content - Cluttered and bad */}
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            {/* Too many notification banners */}
            <div className="space-y-2 mb-4">
              <div className="bg-yellow-500 text-black p-3 rounded-lg border-4 border-red-500 animate-pulse">
                <div className="font-bold text-sm">⚠️ VIKTIG!</div>
                <div className="text-xs">Velkommen til Retur! Alt er annerledes nå!</div>
              </div>
              <div className="bg-blue-500 text-white p-2 rounded-lg border-2 border-cyan-400">
                <div className="text-xs">💡 Tips: Vi har endret alt for ingen grunn</div>
              </div>
              <div className="bg-green-500 text-white p-2 rounded-lg">
                <div className="text-xs">🎉 Ny funksjonalitet kommer snart (kanskje)</div>
              </div>
            </div>

            {/* Bad card design */}
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-6 mb-4 transform rotate-1 border-4 border-yellow-400">
              <div className="text-center">
                <div className="text-5xl mb-2 animate-bounce">🎫</div>
                <h2 className="text-xl font-bold mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  Din Billett
                </h2>
                <p className="text-sm opacity-90">Trykk her for å se billetter (eller ikke)</p>
              </div>
            </div>

            {/* Confusing buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="bg-red-600 p-4 rounded-xl border-4 border-yellow-400 transform hover:rotate-3 transition-transform">
                <div className="text-2xl mb-1">🔍</div>
                <div className="text-xs font-bold">Finn Noe</div>
              </button>
              <button className="bg-blue-600 p-4 rounded-xl border-4 border-cyan-400 transform hover:-rotate-3 transition-transform">
                <div className="text-2xl mb-1">🛒</div>
                <div className="text-xs font-bold">Kjøp Ting</div>
              </button>
              <button className="bg-purple-600 p-4 rounded-xl border-4 border-pink-400">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-xs font-bold">Statistikk?</div>
              </button>
              <button className="bg-orange-600 p-4 rounded-xl border-4 border-red-400">
                <div className="text-2xl mb-1">❓</div>
                <div className="text-xs font-bold">Hjelp</div>
              </button>
            </div>

            {/* Random info boxes */}
            <div className="space-y-2 mb-4">
              <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg border-2 border-dashed border-gray-600">
                <div className="text-xs text-gray-300">
                  💬 &quot;Vi har redesignet alt for å gjøre det verre&quot; - Utviklerteamet
                </div>
              </div>
            </div>

            {/* Continue button - make it stand out but confusing */}
            <button
              onClick={onNext}
              className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-bold py-5 px-6 rounded-xl text-lg shadow-2xl transform hover:scale-105 transition-all border-4 border-yellow-400 animate-pulse"
            >
              Fortsett →
            </button>
          </div>

          {/* Bad bottom navigation */}
          <div className="border-t-4 border-yellow-500 bg-gradient-to-r from-purple-900 to-pink-800">
            <div className="flex justify-around py-3">
              <button className="flex flex-col items-center gap-1">
                <span className="text-3xl animate-bounce">🏠</span>
                <span className="text-xs">Hjem</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <span className="text-3xl text-yellow-400">🎫</span>
                <span className="text-xs text-yellow-400 font-bold">Billetter</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <span className="text-3xl">⚙️</span>
                <span className="text-xs">Innstillinger</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <span className="text-3xl">❓</span>
                <span className="text-xs">Hjelp?</span>
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
