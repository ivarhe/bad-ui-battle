'use client';

import { useState } from 'react';
import Step1OldRuter from './components/Step1OldRuter';
import Step2Download from './components/Step2Download';
import Step3NewRetur from './components/Step3NewRetur';
import Step4Reauth from './components/Step4Reauth';
import Step5Cricket from './components/Step5Cricket';
import Step6Birthday from './components/Step6Birthday';
import Step7Ticket from './components/Step7Ticket';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  return (
    <div className="min-h-screen">
      {currentStep === 1 && <Step1OldRuter onNext={goToNextStep} />}
      {currentStep === 2 && <Step2Download onNext={goToNextStep} />}
      {currentStep === 3 && <Step3NewRetur onNext={goToNextStep} />}
      {currentStep === 4 && <Step4Reauth onNext={goToNextStep} />}
      {currentStep === 5 && <Step5Cricket onNext={goToNextStep} />}
      {currentStep === 6 && <Step6Birthday onNext={goToNextStep} />}
      {currentStep === 7 && <Step7Ticket />}
    </div>
  );
}
