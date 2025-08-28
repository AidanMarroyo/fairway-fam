'use client';

import { useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import Stepper from '@/components/onboarding/stepper';

export function GeneralInfoForm() {
  // Track which step user is on (0-based index)
  const [currentStep, setCurrentStep] = useState(0);

  // Define steps once here
  const steps = [
    { label: 'Account', sublabel: 'Info' },
    { label: 'Account', sublabel: 'Info' },
    { label: 'Confirmation' },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          // Final submit
          console.log('Submit form!');
        }
      }}
    >
      {/* You can conditionally render fields based on currentStep */}
      {currentStep === 0 && (
        <div className='my-6 grid gap-5 sm:grid-cols-2'>
          <Input
            type='text'
            name='full-name'
            id='full-name'
            placeholder='Bonnie'
            isRequired
            label='Full Name'
          />
          <Input
            type='text'
            name='username'
            id='username'
            placeholder='name@company.com'
            isRequired
            label='Username'
          />
        </div>
      )}

      {currentStep === 1 && (
        <div className='my-6'>
          <Input
            type='password'
            name='password'
            id='password'
            placeholder='••••••••'
            isRequired
            label='Password'
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className='my-6'>
          <p className='text-gray-700 dark:text-gray-300'>
            ✅ Review and confirm your details.
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className='flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0'>
        {currentStep > 0 && (
          <Button
            type='button'
            onPress={() => setCurrentStep((s) => s - 1)}
            className='md:w-1/2 [&>span]:py-3 [&>span]:text-sm'
          >
            Prev: {steps[currentStep - 1].label}
          </Button>
        )}
        <Button type='submit' className='md:w-1/2 [&>span]:text-sm'>
          {currentStep === steps.length - 1
            ? 'Submit'
            : `Next: ${steps[currentStep + 1].label}`}
        </Button>
      </div>
    </form>
  );
}
