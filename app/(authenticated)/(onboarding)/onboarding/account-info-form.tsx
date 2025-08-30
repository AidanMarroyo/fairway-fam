'use client';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Spinner } from '@heroui/react';
import { useMemo, useState } from 'react';

export function AccountInfoForm({
  setCurrentStep,
  currentStep,
  steps,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  steps: { label: string; sublabel?: string }[];
}) {
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

  const canSubmit = useMemo(() => {
    const requiredFilled =
      fullName.trim().length > 2 && username.trim().length >= 3;

    return requiredFilled && !saving;
  }, [fullName, username, saving]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);

      const fd = new FormData();
      fd.append('full_name', fullName);
      fd.append('username', username);

      const res = await fetch('/api/onboarding/profile', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error((await res.text()) || 'Failed to save');

      setCurrentStep((s) => s + 1);
      console.log('Onboarding complete');
    } catch (err: any) {
      alert(err?.message ?? 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className='my-6 grid gap-5 sm:grid-cols-2'>
        <Input
          type='text'
          name='full-name'
          id='full-name'
          placeholder='Bonnie'
          isRequired
          label='Full Name'
          value={fullName}
          onValueChange={setFullName}
        />
        <Input
          type='text'
          name='username'
          id='username'
          placeholder='twoods'
          isRequired
          label='Username'
          value={username}
          onValueChange={setUsername}
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
        <Button
          type='submit'
          className='w-full [&>span]:text-sm'
          isDisabled={!canSubmit}
        >
          {saving ? (
            <span className='flex items-center gap-2'>
              <Spinner size='sm' /> Saving…
            </span>
          ) : currentStep === steps.length - 1 ? (
            'Submit'
          ) : (
            `Next: ${steps[currentStep + 1].label}`
          )}
        </Button>
      </div>
    </form>
  );
}
