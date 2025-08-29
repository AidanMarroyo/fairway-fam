'use client';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';

export function AccountInfoForm({
  setCurrentStep,
  currentStep,
  steps,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  steps: { label: string; sublabel?: string }[];
}) {
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
          placeholder='twoods'
          isRequired
          label='Username'
        />
      </div>

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
