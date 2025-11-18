'use client';

import React, { useState } from 'react';

export interface BirthdayPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

export function BirthdayPicker({ className, value, onChange, ...props }: BirthdayPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [userGuess, setUserGuess] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const calculateDaysOld = (birthDate: Date): number => {
    const today = new Date();
    const diffTime = today.getTime() - birthDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.valueAsDate;
    setSelectedDate(date);
    setShowError(false);
    setIsVerified(false);
    setUserGuess('');

    if (date) {
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }
  };

  const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(e.target.value);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (selectedDate && userGuess) {
      const correctDaysOld = calculateDaysOld(selectedDate);
      const userDaysOld = parseInt(userGuess, 10);

      if (userDaysOld === correctDaysOld) {
        onChange?.(selectedDate);
        setShowError(false);
        setIsVerified(true);
        setShowConfirmation(false);
      } else {
        setShowError(true);
        // Reset after a delay for extra annoyance
        setTimeout(() => {
          setShowConfirmation(false);
          setShowError(false);
          setSelectedDate(null);
          setUserGuess('');
        }, 3000);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedDate(null);
    setUserGuess('');
    setShowError(false);
  };

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div
      className={className}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
      {...props}
    >
      <h1
        style={{
          marginTop: 0,
          marginBottom: '32px',
          fontSize: '32px',
          fontWeight: 600,
          color: '#1a1a1a',
          lineHeight: '1.2',
        }}
      >
        Bekreft fødselsdato
      </h1>

      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#666',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Fødselsdato
        </label>
        <input
          type="date"
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
          onChange={handleDateChange}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fff',
            color: '#1a1a1a',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => {
            e.target.style.borderColor = '#0066cc';
            e.target.style.outline = 'none';
          }}
          onBlur={e => {
            e.target.style.borderColor = '#ddd';
          }}
        />
      </div>

      {showConfirmation && selectedDate && (
        <div
          style={{
            padding: '24px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            marginTop: '24px',
            border: '1px solid #e0e0e0',
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: 600,
              color: '#1a1a1a',
            }}
          >
            Bekreft fødselsdato
          </h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
            For å bekrefte din fødselsdato ({formatDate(selectedDate)}), må du oppgi nøyaktig hvor
            mange dager gammel du er.
          </p>
          <div
            style={{
              padding: '16px',
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              marginBottom: '20px',
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>
                Fødselsdato
              </span>
              <p
                style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1a1a1a', fontWeight: 500 }}
              >
                {formatDate(selectedDate)}
              </p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase' }}>
                Dagens dato
              </span>
              <p
                style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1a1a1a', fontWeight: 500 }}
              >
                {formatDate(new Date())}
              </p>
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#666',
                }}
              >
                Hvor mange dager gammel er du?
              </label>
              <input
                type="number"
                value={userGuess}
                onChange={handleGuessChange}
                placeholder="Antall dager"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  color: '#1a1a1a',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#0066cc';
                  e.target.style.outline = 'none';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#ddd';
                }}
              />
              <p
                style={{
                  margin: '8px 0 0 0',
                  fontSize: '12px',
                  color: '#999',
                  lineHeight: '1.4',
                }}
              >
                Du må beregne dette selv basert på fødselsdato og dagens dato.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleSubmit}
              disabled={!userGuess}
              style={{
                flex: 1,
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: 600,
                backgroundColor: userGuess ? '#0066cc' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: userGuess ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={e => {
                if (userGuess) {
                  e.currentTarget.style.backgroundColor = '#0052a3';
                }
              }}
              onMouseLeave={e => {
                if (userGuess) {
                  e.currentTarget.style.backgroundColor = '#0066cc';
                }
              }}
            >
              Bekreft
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: 500,
                backgroundColor: 'transparent',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Avbryt
            </button>
          </div>
        </div>
      )}

      {showError && selectedDate && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '4px',
            marginTop: '20px',
          }}
        >
          <p
            style={{
              margin: 0,
              color: '#856404',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '1.5',
            }}
          >
            Feil svar. Du oppga {userGuess} dager, men det er ikke korrekt. Skjemaet vil nullstilles
            om 3 sekunder.
          </p>
          <p style={{ margin: '8px 0 0 0', color: '#856404', fontSize: '12px' }}>
            Riktig svar er {calculateDaysOld(selectedDate).toLocaleString()} dager.
          </p>
        </div>
      )}

      {isVerified && selectedDate && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#d4edda',
            border: '1px solid #28a745',
            borderRadius: '4px',
            marginTop: '20px',
          }}
        >
          <p
            style={{
              margin: 0,
              color: '#155724',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '1.5',
            }}
          >
            Bekreftet. Du oppga korrekt at du er {calculateDaysOld(selectedDate).toLocaleString()}{' '}
            dager gammel. Fødselsdato bekreftet.
          </p>
        </div>
      )}
    </div>
  );
}

BirthdayPicker.displayName = 'BirthdayPicker';

