'use client';

import { useState, useEffect } from 'react';

interface Step4DigipostProps {
  onCodeReceived: (code: string) => void;
  onBack: () => void;
}

export default function Step4Digipost({ onCodeReceived, onBack }: Step4DigipostProps) {
  const [step, setStep] = useState<'login' | 'loading' | 'inbox'>('login');
  const [bankIdCode, setBankIdCode] = useState('');
  const [digipostCode] = useState(() => {
    // Generate a random 8-character code
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  });

  const handleBankIdLogin = () => {
    setStep('loading');
    // Simulate BankID login process
    setTimeout(() => {
      setStep('inbox');
    }, 3000);
  };

  const handleCodeCopy = () => {
    onCodeReceived(digipostCode);
  };

  // Pre-generate random rotations and sizes for each character
  const [codeStyles] = useState(() => {
    return Array.from({ length: 8 }, () => ({
      rotation: Math.random() * 6 - 3,
      fontSize: 24 + Math.random() * 8,
    }));
  });

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
        <button onClick={onBack} className="text-blue-500">←</button>
        <h1 className="text-2xl font-bold">Digipost</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 px-4 py-6">
        {step === 'login' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">📬</div>
              <h2 className="text-2xl font-bold mb-2">Logg inn</h2>
              <p className="text-gray-400 text-sm">Logg inn med BankID</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border-2 border-gray-700">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">BankID</label>
                  <input
                    type="text"
                    value={bankIdCode}
                    onChange={(e) => setBankIdCode(e.target.value)}
                    placeholder="Skriv inn BankID"
                    className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="bg-blue-900 bg-opacity-30 border-2 border-blue-700 p-3 rounded-lg">
                  <p className="text-blue-300 text-xs">
                    💡 Du må ha BankID-appen installert på telefonen din
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleBankIdLogin}
              disabled={!bankIdCode}
              className={`w-full font-bold py-4 px-6 rounded-lg text-lg transition-all ${
                bankIdCode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Logg inn med BankID
            </button>

            <div className="text-center text-xs text-gray-500">
              <p>Har du ikke BankID?</p>
              <p className="mt-1">Kontakt din bank for å få BankID.</p>
            </div>
          </div>
        )}

        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">🔐</div>
              <h2 className="text-xl font-bold mb-2">Logger inn...</h2>
              <p className="text-gray-400 text-sm mb-4">Venter på BankID-bekreftelse</p>
              <div className="space-y-2">
                <div className="h-2 bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-2 bg-gray-700 rounded-full animate-pulse delay-75"></div>
                <div className="h-2 bg-gray-700 rounded-full animate-pulse delay-150"></div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Åpne BankID-appen på telefonen din og godkjenn innloggingen
              </p>
            </div>
          </div>
        )}

        {step === 'inbox' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">📬</div>
              <h2 className="text-xl font-bold">Innboks</h2>
            </div>

            {/* Message from Ruter */}
            <div className="bg-gray-900 rounded-xl p-4 border-2 border-blue-600">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-sm">Ruter Security Team</p>
                  <p className="text-xs text-gray-400">Autentiseringskode</p>
                </div>
                <span className="text-xs text-gray-500">Nå</span>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 mt-3 border-2 border-dashed border-gray-600">
                <p className="text-xs text-gray-400 mb-3">Din bekreftelseskode:</p>
                <div className="text-center mb-3">
                  <div className="text-2xl font-mono font-bold text-white tracking-widest">
                    {digipostCode.split('').map((char, idx) => (
                      <span
                        key={idx}
                        className="inline-block mx-1 px-2 py-1 bg-gray-700 border-2 border-gray-600 rounded"
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
                <p className="text-xs text-red-400 text-center font-bold">
                  ⚠️ Koden utløper om 2 minutter
                </p>
              </div>

              <button
                onClick={handleCodeCopy}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Kopier kode og gå tilbake til Retur
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

