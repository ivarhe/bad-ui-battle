'use client';

import { useState, useEffect } from 'react';

interface Step4ReauthProps {
  onNext: () => void;
}

export default function Step4Reauth({ onNext }: Step4ReauthProps) {
  const [code, setCode] = useState('');
  const [showDigipost, setShowDigipost] = useState(false);
  const [digipostCode] = useState(() => {
    // Generate a random 8-character code
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  });

  // Pre-generate random rotations and sizes for each character
  const [codeStyles] = useState(() => {
    // Generate styles for 8 characters (will match digipostCode length)
    return Array.from({ length: 8 }, () => ({
      rotation: Math.random() * 6 - 3,
      fontSize: 24 + Math.random() * 8,
    }));
  });

  useEffect(() => {
    // Show Digipost after a delay
    const timer = setTimeout(() => {
      setShowDigipost(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    alert('⚠️ SECURITY POLICY: Pasting is not allowed! Please type the code manually.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Make it hard to type - only allow one character at a time with delay
    if (value.length <= code.length + 1) {
      setCode(value);
    }
  };

  const isCodeCorrect = code.toUpperCase() === digipostCode;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full border-4 border-purple-600">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-purple-600 mb-2">Security Alert</h1>
        </div>

        <div className="bg-red-100 border-4 border-red-500 p-4 rounded-lg mb-6">
          <p className="text-red-800 font-bold text-sm mb-2">
            ⚠️ NEW SECURITY POLICY
          </p>
          <p className="text-red-700 text-xs leading-relaxed">
            Due to our extremely strong security policy, you must reauthenticate.
            We cannot verify your identity from the old app. Sorry for the inconvenience.
          </p>
        </div>

        {!showDigipost ? (
          <div className="text-center">
            <div className="animate-pulse text-2xl mb-4">📬</div>
            <p className="text-gray-600">Opening Digipost...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Digipost View */}
            <div className="bg-blue-50 border-4 border-blue-400 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">📬</div>
                <div>
                  <h2 className="font-bold text-blue-800">Digipost</h2>
                  <p className="text-xs text-blue-600">Secure Message</p>
                </div>
              </div>
              
              <div className="bg-white border-2 border-blue-300 p-4 rounded mb-3">
                <p className="text-xs text-gray-600 mb-2">From: Ruter Security Team</p>
                <p className="text-xs text-gray-600 mb-3">Subject: Authentication Code</p>
                <div className="bg-gray-100 p-3 rounded border-2 border-dashed border-gray-400">
                  <p className="text-xs text-gray-500 mb-2">Your verification code:</p>
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-gray-800 tracking-widest">
                      {digipostCode.split('').map((char, idx) => (
                        <span
                          key={idx}
                          className="inline-block mx-1 px-2 py-1 bg-white border-2 border-gray-300 rounded"
                          style={{
                            transform: `rotate(${codeStyles[idx].rotation}deg)`,
                            fontSize: `${codeStyles[idx].fontSize}px`,
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-red-600 mt-3 text-center font-bold">
                    ⚠️ Code expires in 2 minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Code Input - Make it horrible */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">
                Enter Code (No Pasting Allowed):
              </label>
              <input
                type="text"
                value={code}
                onChange={handleInputChange}
                onPaste={handlePaste}
                maxLength={8}
                className="w-full px-4 py-3 text-2xl font-mono text-center border-4 border-gray-400 rounded-lg focus:outline-none focus:border-purple-500 bg-gray-50"
                placeholder="________"
                style={{ letterSpacing: '0.5em' }}
              />
              <p className="text-xs text-red-600 text-center">
                🔒 Security Policy: Pasting is disabled. Type manually.
              </p>
            </div>

            {isCodeCorrect && (
              <div className="bg-green-100 border-4 border-green-500 p-3 rounded-lg">
                <p className="text-green-800 text-sm font-bold text-center">
                  ✓ Code verified! Proceeding...
                </p>
              </div>
            )}

            <button
              onClick={onNext}
              disabled={!isCodeCorrect}
              className={`w-full font-bold py-4 px-6 rounded-lg text-lg shadow-lg transition-all ${
                isCodeCorrect
                  ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isCodeCorrect ? 'Continue →' : 'Enter Code First'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

