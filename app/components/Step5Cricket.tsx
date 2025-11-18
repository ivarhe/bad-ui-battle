'use client';

import { useState } from "react";

interface Step5CricketProps {
  onNext: () => void;
}

// All possible grid combinations (unsorted)
const ALL_COMBINATIONS = [
  "D5",
  "R4",
  "U4",
  "R3",
  "E9",
  "Z0",
  "M2",
  "W1",
  "A3",
  "P1",
  "J9",
  "F2",
  "A8",
  "E5",
  "R6",
  "O6",
  "Q4",
  "N2",
  "M5",
  "U7",
  "G1",
  "Q8",
  "G6",
  "X5",
  "B3",
  "N7",
  "K7",
  "T6",
  "X3",
  "L4",
  "D7",
  "I3",
  "V6",
  "W0",
  "V8",
  "K3",
  "Z7",
  "D4",
  "Q3",
  "T1",
  "J8",
  "G2",
  "H8",
  "R7",
  "Z3",
  "K1",
  "C5",
  "V7",
  "E6",
  "L7",
  "G4",
  "I6",
  "Z8",
  "S0",
  "D3",
  "I8",
  "F8",
  "B2",
  "U8",
  "E7",
  "D2",
  "X1",
  "T4",
  "H1",
  "H4",
  "D8",
  "B1",
  "A9",
  "S3",
  "W6",
  "J5",
  "F0",
  "O0",
  "O9",
  "T0",
  "P9",
  "W2",
  "T5",
  "L0",
  "V2",
  "W8",
  "S6",
  "Y2",
  "C0",
  "C7",
  "V1",
  "X7",
  "L8",
  "B8",
  "H2",
  "U3",
  "I5",
  "Y0",
  "E3",
  "J3",
  "M0",
  "A7",
  "F9",
  "Z5",
  "F6",
  "C3",
  "P4",
  "K6",
  "G3",
  "V3",
  "I1",
  "C6",
  "N5",
  "B4",
  "E0",
  "B9",
  "B7",
  "P0",
  "O4",
  "B5",
  "S9",
  "G8",
  "Z6",
  "H6",
  "C8",
  "B0",
  "X0",
  "R5",
  "V4",
  "Z1",
  "X8",
  "U6",
  "E8",
  "C4",
  "A4",
  "Q1",
  "P5",
  "I7",
  "Q7",
  "R8",
  "J7",
  "O1",
  "S5",
  "G5",
  "P8",
  "N6",
  "I9",
  "O2",
  "J0",
  "W4",
  "C2",
  "H3",
  "F1",
  "W9",
  "U2",
  "F4",
  "O7",
  "N0",
  "M8",
  "Q2",
  "Y8",
  "H0",
  "P6",
  "P2",
  "V5",
  "L9",
  "B6",
  "W7",
  "G9",
  "F3",
  "Y5",
  "W3",
  "K5",
  "S2",
  "P3",
  "G7",
  "E2",
  "Q0",
  "J4",
  "N1",
  "X2",
  "L1",
  "Q5",
  "Z4",
  "N9",
  "K8",
  "K2",
  "U1",
  "O8",
  "S8",
  "Q9",
  "G0",
  "N8",
  "K0",
  "T7",
  "E4",
  "F7",
  "S4",
  "T9",
  "I4",
  "K4",
  "Y3",
  "J6",
  "R1",
  "F5",
  "V9",
  "U9",
  "Z9",
  "M6",
  "X6",
  "I2",
  "Z2",
  "T2",
  "O5",
  "Y1",
  "K9",
  "D6",
  "M7",
  "W5",
  "L5",
  "L2",
  "L6",
  "Y7",
  "P7",
  "H5",
  "X4",
  "U0",
  "S1",
  "A1",
  "X9",
  "M3",
  "D1",
  "R9",
  "M4",
  "I0",
  "N4",
  "J2",
  "R0",
  "C1",
  "M1",
  "Y6",
  "U5",
  "A0",
  "D0",
  "Q6",
  "E1",
  "S7",
  "R2",
  "J1",
  "Y9",
  "D9",
  "Y4",
  "A5",
  "M9",
  "H7",
  "C9",
  "H9",
  "V0",
  "T8",
  "T3",
  "N3",
  "A2",
  "O3",
  "L3",
  "A6",
];

export default function Step5Cricket({ onNext }: Step5CricketProps) {
  const [selectedSquare, setSelectedSquare] = useState<string>("");
  const correctSquare = "A1"; // The cricket is in square A1
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  // Shuffle the combinations for the dropdown (make it unsorted and frustrating)
  const [shuffledCombinations] = useState(() => {
    const shuffled = [...ALL_COMBINATIONS];
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const handleSubmit = () => {
    if (!selectedSquare) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    setAttempts((prev) => prev + 1);

    if (selectedSquare === correctSquare) {
      setIsVerified(true);
      setTimeout(() => {
        onNext();
      }, 1500);
    } else {
      setShowError(true);
      setSelectedSquare("");
      // Reset after showing error
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 via-green-500 to-green-400 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full border-4 border-green-600">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🦗</div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Human Verification
          </h1>
          <p className="text-sm text-gray-600">
            Find the cricket in the grid below
          </p>
        </div>

        <div className="bg-yellow-100 border-4 border-yellow-500 p-3 rounded-lg mb-4">
          <p className="text-yellow-800 font-bold text-xs mb-1">
            ⚠️ Prove you are human!
          </p>
          <p className="text-yellow-700 text-xs leading-relaxed">
            Look at the grid image and find which square contains the cricket.
            Select the correct square coordinate from the dropdown.
          </p>
        </div>

        {/* Grid Image */}
        <div className="mb-4 bg-gray-100 rounded-lg p-4 border-2 border-gray-300">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <img
              src="/cricket.jpg"
              alt="Grid with cricket location"
              className="w-full h-full object-contain rounded border-2 border-gray-400"
              onError={(e) => {
                // Fallback if image doesn't load - show a placeholder
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full bg-green-200 rounded border-2 border-gray-400 flex items-center justify-center">
                      <div class="text-center p-4">
                        <div class="text-4xl mb-2">🦗</div>
                        <p class="text-sm text-gray-600">Grid image (cricket-grid.jpg)</p>
                        <p class="text-xs text-gray-500 mt-2">Please add cricket-grid.jpg to the public folder</p>
                      </div>
                    </div>
                  `;
                }
              }}
            />
          </div>
        </div>

        {/* Dropdown Selection */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Select the square where the cricket is located:
          </label>
          <select
            value={selectedSquare}
            onChange={(e) => {
              setSelectedSquare(e.target.value);
              setShowError(false);
            }}
            className="w-full px-4 py-3 text-lg border-4 border-gray-400 rounded-lg bg-white focus:outline-none focus:border-green-500"
            style={{ fontFamily: "monospace" }}
          >
            <option value="">-- Select a square --</option>
            {shuffledCombinations.map((combo) => (
              <option key={combo} value={combo}>
                {combo}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            💡 Hint: The dropdown is intentionally unsorted to make it harder
          </p>
        </div>

        {/* Error Message */}
        {showError && (
          <div className="mb-4 bg-red-100 border-4 border-red-500 p-3 rounded-lg">
            <p className="text-red-800 font-bold text-sm text-center">
              ❌ Incorrect! Try again. (Attempt {attempts})
            </p>
            {selectedSquare && (
              <p className="text-red-700 text-xs text-center mt-1">
                You selected &quot;{selectedSquare}&quot; but that&apos;s not
                where the cricket is.
              </p>
            )}
          </div>
        )}

        {/* Success Message */}
        {isVerified && (
          <div className="mb-4 bg-green-100 border-4 border-green-500 p-3 rounded-lg">
            <p className="text-green-800 font-bold text-sm text-center">
              ✓ Correct! You found the cricket at {correctSquare}. Verifying...
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedSquare || isVerified}
          className={`w-full font-bold py-4 px-6 rounded-lg text-lg shadow-lg transition-all ${
            selectedSquare && !isVerified
              ? "bg-green-500 hover:bg-green-600 text-white transform hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isVerified ? "Verifying..." : "Verify Selection"}
        </button>

        {attempts > 0 && !isVerified && (
          <p className="text-xs text-center text-gray-500 mt-2">
            Attempts: {attempts}
          </p>
        )}
      </div>
    </div>
  );
}
