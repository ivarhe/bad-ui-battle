'use client';

import { useState, useEffect, useRef } from 'react';

interface Step5CricketProps {
  onNext: () => void;
}

interface Cricket {
  id: number;
  x: number;
  y: number;
  visible: boolean;
  rotation: number;
}

export default function Step5Cricket({ onNext }: Step5CricketProps) {
  const [crickets, setCrickets] = useState<Cricket[]>([]);
  const [clickedCount, setClickedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameStarted) return;

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    // Spawn cricket randomly
    const spawnInterval = setInterval(() => {
      const newCricket: Cricket = {
        id: Date.now(),
        x: Math.random() * 85 + 5, // 5-90% to keep it visible
        y: Math.random() * 85 + 5,
        visible: true,
        rotation: Math.random() * 20 - 10, // Pre-generate rotation
      };

      setCrickets(prev => [...prev, newCricket]);

      // Make cricket disappear after a very short time
      setTimeout(() => {
        setCrickets(prev => prev.filter(c => c.id !== newCricket.id));
      }, 800 + Math.random() * 400); // 0.8-1.2 seconds
    }, 2000 + Math.random() * 2000); // Spawn every 2-4 seconds

    return () => clearInterval(spawnInterval);
  }, [gameStarted]);

  const handleCricketClick = (id: number) => {
    setCrickets(prev => prev.filter(c => c.id !== id));
    setClickedCount(prev => prev + 1);
    
    if (clickedCount + 1 >= 3) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const grassPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006600' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 via-green-500 to-green-400 relative overflow-hidden">
      {/* Grass background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: `url("${grassPattern}")` }}
      ></div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {!gameStarted ? (
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full border-4 border-green-600">
            <div className="text-center space-y-4">
              <div className="text-5xl mb-4">🦗</div>
              <h1 className="text-3xl font-bold text-green-600 mb-2">
                Human Verification
              </h1>
              <div className="bg-yellow-100 border-4 border-yellow-500 p-4 rounded-lg">
                <p className="text-yellow-800 font-bold text-sm mb-2">
                  Prove you are human!
                </p>
                <p className="text-yellow-700 text-xs leading-relaxed">
                  Click on the cricket that appears on the grass. You must click 3 crickets to verify.
                </p>
                <p className="text-yellow-600 text-xs mt-2 font-bold">
                  ⚠️ Warning: Crickets appear for less than 1 second!
                </p>
              </div>
              <button
                onClick={startGame}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all mt-4"
              >
                Start Verification
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Game UI */}
            <div className="bg-white rounded-lg shadow-xl p-4 mb-4 border-4 border-green-600">
              <div className="flex items-center justify-between gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Crickets Clicked</p>
                  <p className="text-2xl font-bold text-green-600">{clickedCount} / 3</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Time Left</p>
                  <p className={`text-2xl font-bold ${timeLeft < 10 ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
                    {timeLeft}s
                  </p>
                </div>
              </div>
            </div>

            {/* Game area */}
            <div
              ref={containerRef}
              className="relative bg-gradient-to-b from-green-600 via-green-500 to-green-400 rounded-lg border-4 border-green-700 shadow-2xl"
              style={{ width: '90vw', maxWidth: '600px', height: '60vh', minHeight: '400px' }}
            >
              {/* Crickets */}
              {crickets.map(cricket => (
                <button
                  key={cricket.id}
                  onClick={() => handleCricketClick(cricket.id)}
                  className="absolute text-4xl animate-bounce cursor-pointer transform hover:scale-125 transition-transform"
                  style={{
                    left: `${cricket.x}%`,
                    top: `${cricket.y}%`,
                    transform: `translate(-50%, -50%) rotate(${cricket.rotation}deg)`,
                  }}
                >
                  🦗
                </button>
              ))}

              {/* Instructions overlay */}
              {clickedCount < 3 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm">
                  <p className="text-center animate-pulse">
                    Look for the cricket! It appears briefly!
                  </p>
                </div>
              )}
            </div>

            {timeLeft === 0 && clickedCount < 3 && (
              <div className="mt-4 bg-red-100 border-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-800 font-bold text-center">
                  ⏰ Time&apos;s up! Please try again.
                </p>
                <button
                  onClick={() => {
                    setGameStarted(false);
                    setClickedCount(0);
                    setTimeLeft(30);
                    setCrickets([]);
                  }}
                  className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Restart
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

