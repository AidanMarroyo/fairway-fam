'use client';

import OnboardBranding from '@/components/onboarding/branding';
import OnboardingFeatures from '@/components/onboarding/features';
import MobileOnboardBranding from '@/components/onboarding/mobile-branding';
import Stepper from '@/components/onboarding/stepper';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useState } from 'react';

export default function OnboardingContent() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Account', sublabel: 'Info' },
    { label: 'Golf', sublabel: 'Info' },
    { label: 'Confirmation' },
  ];

  return (
    <section className='bg-white px-4 py-8 dark:bg-gray-900 lg:py-0'>
      <div className='lg:flex'>
        <div className='hidden w-full max-w-md bg-primary-600 p-12 lg:block lg:h-screen'>
          <OnboardBranding />
          <OnboardingFeatures />
        </div>
        <div className='mx-auto flex items-center md:w-[42rem] md:px-8 xl:px-0'>
          <div className='w-full'>
            <MobileOnboardBranding />
            {/* <ol className='mb-6 flex items-center text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base lg:mb-12'>
              <li className="flex items-center after:mx-6 after:hidden after:h-1 after:w-12 after:border-b after:border-gray-200 after:content-[''] dark:after:border-gray-700 sm:after:inline-block xl:after:mx-10">
                <div className="flex items-center after:mx-2 after:after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:block sm:after:hidden">
                  <div className='mr-2 sm:mx-auto sm:mb-2'>1</div>
                  Account <span className='hidden sm:inline-flex'>Info</span>
                </div>
              </li>
              <li className="flex items-center after:mx-6 after:hidden after:h-1 after:w-12 after:border-b after:border-gray-200 after:content-[''] dark:after:border-gray-700 sm:after:inline-block xl:after:mx-10">
                <div className="flex items-center after:mx-2 after:after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:block sm:after:hidden">
                  <div className='mr-2 sm:mx-auto sm:mb-2'>2</div>
                  Account <span className='hidden sm:inline-flex'>Info</span>
                </div>
              </li>
              <li className='flex items-center sm:block'>
                <div className='mr-2 sm:mx-auto sm:mb-2'>3</div>
                Confirmation
              </li>
            </ol> */}
            {/* <h1 className='mb-4 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:mb-6'>
              Account details
            </h1> */}

            <Stepper
              steps={steps}
              current={currentStep}
              onStepChange={(i: number) => setCurrentStep(i)}
            />

            <h1 className='mb-4 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:mb-6'>
              {steps[currentStep].label} details
            </h1>

            <form action='#'>
              <div className='my-6 grid gap-5 sm:grid-cols-2'>
                <div>
                  <Input
                    type='text'
                    name='full-name'
                    id='full-name'
                    placeholder='Bonnie'
                    isRequired
                    label='Full Name'
                  />
                </div>
                <div>
                  <Input
                    type='text'
                    name='username'
                    id='username'
                    placeholder='name@company.com'
                    isRequired
                    label='username'
                  />
                </div>
              </div>

              <div className='flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0'>
                <Button
                  href='#'
                  className='hover:bg-gray-100 hover:text-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white md:w-1/2 [&>span]:py-3 [&>span]:text-sm'
                >
                  Prev: Personal Info
                </Button>
                <Button type='submit' className='md:w-1/2 [&>span]:text-sm'>
                  Next: Account Info
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
