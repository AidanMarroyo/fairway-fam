'use client';
import { fetchCurrentUser } from '@/lib/data/fetches/current-user';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { addToast, Spinner } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';

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
  const [initialUsername, setInitialUsername] = useState('');

  const canSubmit = useMemo(() => {
    const requiredFilled =
      fullName.trim().length > 2 && username.trim().length >= 3;

    return requiredFilled && !saving;
  }, [fullName, username, saving]);

  useEffect(() => {
    const initialData = fetchCurrentUser();

    initialData.then((data) => {
      if (data) {
        setInitialUsername(data.username || '');
        setFullName(data.full_name || '');
        setUsername(data.username || '');
      }
    });
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSaving(true);

      if (initialUsername !== username) {
        const fd = new FormData();
        fd.append('full_name', fullName);
        fd.append('username', username);

        const res = await fetch('/api/onboarding/profile', {
          method: 'POST',
          body: fd,
        });

        const resData = await res.json();

        if (!resData.success) {
          if (resData.error === 'Username already taken') {
            addToast({
              title: 'Error',
              description: 'Username already taken',
            });
          } else
            addToast({
              title: 'Error',
              description: 'Failed to save profile info',
            });
          return;
        }
      }

      setCurrentStep((s) => s + 1);
    } catch (err: any) {
      addToast({
        title: 'Error',
        description: err?.message ?? 'Something went wrong.',
      });
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
