'use client';

import { useState } from 'react';
import ImodalLayout from '@/_shared/ui/layout/i-modal-layout';
import SignupAccountInfo from './signup-form.accountInfo';
import SignupProfileSetup from './signup-form.profileSetup';
import SignupSuccess from './signup-form.success';

type Steps = {
  [key: number]: (props: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
  }) => JSX.Element;
};

export default function Signupform() {
  const [step, setStep] = useState(0);

  const steps: Steps = {
    0: SignupAccountInfo,
    1: SignupProfileSetup,
    2: SignupSuccess,
  };

  const StepComponent = steps[step];

  return (
    <ImodalLayout>
      <StepComponent setStep={setStep} />
    </ImodalLayout>
  );
}