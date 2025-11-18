'use client';

import { useState } from 'react';
import { BirthdayPicker } from './BirthdayPicker';

interface Step6BirthdayProps {
  onNext: () => void;
}

export default function Step6Birthday({ onNext }: Step6BirthdayProps) {
  const [birthdayVerified, setBirthdayVerified] = useState(false);

  const handleBirthdayChange = (date: Date | null) => {
    if (date) {
      setBirthdayVerified(true);
      // Auto-advance after a short delay
      setTimeout(() => {
        onNext();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full border-4 border-red-600">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">📋</div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Personinformasjonsbekreftelse
          </h1>
        </div>

        <div className="bg-yellow-100 border-4 border-yellow-500 p-4 rounded-lg mb-6">
          <p className="text-yellow-800 font-bold text-sm mb-2">
            ⚠️ SIKKERHETSMELDING
          </p>
          <p className="text-yellow-700 text-xs leading-relaxed">
            På grunn av GDPR og vår ekstremt sikre policy, kan vi ikke lagre din personlige informasjon lenger enn 2 timer.
          </p>
          <p className="text-yellow-600 text-xs mt-2 font-bold">
            Vennligst skriv inn fødselsdatoen din på nytt for å fortsette.
          </p>
          <p className="text-yellow-600 text-xs mt-1">
            (Vi lagret dette for 2 timer og 1 minutt siden, så vi har glemt det)
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <BirthdayPicker onChange={handleBirthdayChange} />
        </div>

        {birthdayVerified && (
          <div className="mt-4 bg-green-100 border-4 border-green-500 p-3 rounded-lg">
            <p className="text-green-800 text-sm font-bold text-center">
              ✓ Fødselsdato bekreftet! Fortsetter...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
