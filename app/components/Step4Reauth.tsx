'use client';

import { useState } from 'react';
import Step4Digipost from './Step4Digipost';

interface Step4ReauthProps {
  onNext: () => void;
}

export default function Step4Reauth({ onNext }: Step4ReauthProps) {
  const [showDigipost, setShowDigipost] = useState(false);
  const [code, setCode] = useState('');
  const [receivedCode, setReceivedCode] = useState('');

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    alert('⚠️ SIKKERHETSPOLICY: Liming er ikke tillatt! Vennligst skriv koden manuelt.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= code.length + 1) {
      setCode(value);
    }
  };

  const handleCodeReceived = (digipostCode: string) => {
    setReceivedCode(digipostCode);
    setShowDigipost(false);
  };

  const isCodeCorrect = code.toUpperCase() === receivedCode;

  if (showDigipost) {
    return <Step4Digipost onCodeReceived={handleCodeReceived} onBack={() => setShowDigipost(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full border-4 border-purple-600">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-purple-600 mb-2">Sikkerhetsvarsel</h1>
        </div>

        <div className="bg-red-100 border-4 border-red-500 p-4 rounded-lg mb-6">
          <p className="text-red-800 font-bold text-sm mb-2">
            ⚠️ NY SIKKERHETSPOLICY
          </p>
          <p className="text-red-700 text-xs leading-relaxed">
            På grunn av vår ekstremt sterke sikkerhetspolicy, må du autentisere deg på nytt.
            Vi kan ikke bekrefte identiteten din fra den gamle appen. Beklager uleiligheten.
          </p>
        </div>

        {!receivedCode ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-4">📬</div>
              <p className="text-gray-700 font-semibold mb-2">
                Vi har sendt en bekreftelseskode til din Digipost
              </p>
              <p className="text-gray-600 text-sm">
                Du må logge inn på Digipost for å se koden
              </p>
            </div>

            <button
              onClick={() => setShowDigipost(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all"
            >
              Åpne Digipost →
            </button>

            <p className="text-xs text-center text-gray-500">
              Du vil bli sendt til Digipost-appen for å logge inn med BankID
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-100 border-4 border-green-500 p-4 rounded-lg">
              <p className="text-green-800 font-bold text-sm text-center mb-2">
                ✓ Kode mottatt fra Digipost
              </p>
              <p className="text-green-700 text-xs text-center">
                Skriv inn koden du fikk i Digipost nedenfor
              </p>
            </div>

            {/* Code Input - Make it horrible */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">
                Skriv inn kode (Liming ikke tillatt):
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
                🔒 Sikkerhetspolicy: Liming er deaktivert. Skriv manuelt.
              </p>
            </div>

            {isCodeCorrect && (
              <div className="bg-green-100 border-4 border-green-500 p-3 rounded-lg">
                <p className="text-green-800 text-sm font-bold text-center">
                  ✓ Kode bekreftet! Fortsetter...
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
              {isCodeCorrect ? 'Fortsett →' : 'Skriv inn kode først'}
            </button>

            <button
              onClick={() => setShowDigipost(true)}
              className="w-full text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Gå tilbake til Digipost
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
