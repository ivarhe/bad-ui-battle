'use client';

import { useState, useEffect } from 'react';

export default function Step7Ticket() {
  const [ticketVisible, setTicketVisible] = useState(false);
  const [expired, setExpired] = useState(false);
  
  // Pre-generate ticket number and expiration time
  const [ticketData] = useState(() => ({
    ticketNumber: Math.random().toString(36).substring(2, 10).toUpperCase(),
    expirationTime: new Date(Date.now() + 30000).toLocaleTimeString(),
  }));

  useEffect(() => {
    // Show ticket after annoying delay
    const timer = setTimeout(() => {
      setTicketVisible(true);
    }, 2000);

    // Make it expire quickly
    const expireTimer = setTimeout(() => {
      setExpired(true);
    }, 30000); // Expires in 30 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(expireTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full border-4 border-gray-600">
        {!ticketVisible ? (
          <div className="text-center">
            <div className="text-5xl mb-4 animate-spin">🎫</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Loading Your Ticket...</h2>
            <p className="text-gray-600 text-sm">Please wait while we verify everything...</p>
            <div className="mt-4 space-y-2">
              <div className="h-2 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-2 bg-gray-200 rounded-full animate-pulse delay-75"></div>
            </div>
          </div>
        ) : expired ? (
          <div className="text-center space-y-4">
            <div className="text-5xl mb-4">⏰</div>
            <h2 className="text-3xl font-bold text-red-600 mb-2">Ticket Expired</h2>
            <div className="bg-red-100 border-4 border-red-500 p-4 rounded-lg">
              <p className="text-red-800 font-bold">
                Your ticket has expired. Please go through the entire process again.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg text-lg"
            >
              Start Over
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-4">🎫</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Ticket</h1>
            </div>

            {/* Ticket Display - Make it hard to read */}
            <div className="bg-gradient-to-br from-blue-100 to-green-100 border-8 border-dashed border-gray-600 p-6 rounded-lg transform rotate-1">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b-2 border-gray-400 pb-2">
                  <span className="text-xs text-gray-600 font-bold">RETUR TICKET</span>
                  <span className="text-xs text-gray-600">Valid Now</span>
                </div>
                
                <div className="text-center py-4">
                  <div className="text-4xl font-mono font-bold text-gray-800 mb-2" style={{ letterSpacing: '0.2em' }}>
                    {ticketData.ticketNumber}
                  </div>
                  <div className="text-xs text-gray-600">Ticket Number</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-gray-600">From:</div>
                    <div className="font-bold">Oslo S</div>
                  </div>
                  <div>
                    <div className="text-gray-600">To:</div>
                    <div className="font-bold">Bergen</div>
                  </div>
                </div>

                <div className="text-center pt-2 border-t-2 border-gray-400">
                  <div className="text-xs text-gray-600">Valid until:</div>
                  <div className="font-bold text-red-600">
                    {ticketData.expirationTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Annoying warnings */}
            <div className="bg-yellow-100 border-4 border-yellow-500 p-3 rounded-lg">
              <p className="text-yellow-800 text-xs font-bold text-center">
                ⚠️ This ticket expires in 30 seconds!
              </p>
              <p className="text-yellow-700 text-xs text-center mt-1">
                Show this to the inspector quickly!
              </p>
            </div>

            <div className="bg-gray-100 border-2 border-gray-400 p-3 rounded-lg">
              <p className="text-gray-700 text-xs text-center">
                💡 Tip: The inspector is waiting impatiently. Good luck!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

