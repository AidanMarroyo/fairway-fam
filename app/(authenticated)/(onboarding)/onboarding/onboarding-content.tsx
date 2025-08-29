'use client';

import OnboardBranding from '@/components/onboarding/branding';
import OnboardingFeatures from '@/components/onboarding/features';
import MobileOnboardBranding from '@/components/onboarding/mobile-branding';
import Stepper from '@/components/onboarding/stepper';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useState } from 'react';
import { AccountInfoForm } from './account-info-form';
import { GolfInfoForm } from './golf-info-form';

export default function OnboardingContent() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Account', sublabel: 'Info' },
    { label: 'Golf', sublabel: 'Info' },
    { label: 'Confirmation' },
  ];

  return (
    <section className='bg-white px-4 py-8  lg:py-0 text-black dark:text-white'>
      <div className='lg:flex'>
        <div className='hidden w-full max-w-md bg-primary-600 p-12 lg:block lg:h-screen'>
          <OnboardBranding />
          <OnboardingFeatures />
        </div>
        <div className='mx-auto flex items-center md:w-[42rem] md:px-8 xl:px-0'>
          <div className='w-full'>
            <MobileOnboardBranding />

            <Stepper
              steps={steps}
              current={currentStep}
              onStepChange={(i: number) => setCurrentStep(i)}
            />

            <h1 className='mb-4 text-2xl font-extrabold tracking-tight sm:mb-6'>
              {steps[currentStep].label} details
            </h1>

            {currentStep === 0 && (
              <AccountInfoForm
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                steps={steps}
              />
            )}

            {currentStep === 1 && (
              <GolfInfoForm
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
                steps={steps}
              />
            )}

            {currentStep === 2 && (
              <div className='my-6'>
                <p>✅ Review and confirm your details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
