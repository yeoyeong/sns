'use client';

import { useState } from 'react';
import ImodalLayout from '@/_shared/ui/layout/i-modal-layout';
import SignupAccountInfo from './signup-form.accountInfo';
import SignupProfileSetup from './signup-form.profileSetup';
import SignupSuccess from './signup-form.success';

export default function Signupform() {
  const [step, setStep] = useState(0);
  return (
    <ImodalLayout>
      {step === 0 && <SignupAccountInfo setStep={setStep} />}
      {step === 1 && <SignupProfileSetup setStep={setStep} />}
      {step === 2 && <SignupSuccess />}
    </ImodalLayout>
  );
}