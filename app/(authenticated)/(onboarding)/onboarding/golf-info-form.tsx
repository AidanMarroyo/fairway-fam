'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { RadioGroup, Radio } from '@heroui/radio';
import { Spinner } from '@heroui/spinner';
import { NumberInput } from '@heroui/react';

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  steps: { label: string; sublabel?: string }[];
  defaultValues?: Partial<{
    currentHandicap: number;
    handicapSource: 'self_reported' | 'club_card';
    homeCourse: string;
    experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'competitive';
    playFrequency: 'daily' | 'weekly' | 'monthly' | 'few_per_year';
  }>;
};

export function GolfInfoForm({
  setCurrentStep,
  currentStep,
  steps,
  defaultValues,
}: Props) {
  const [saving, setSaving] = useState(false);

  // form state (controlled)
  const [currentHandicap, setCurrentHandicap] = useState<number>(
    defaultValues?.currentHandicap ?? 0
  );
  const [handicapSource, setHandicapSource] = useState<
    'self_reported' | 'club_card'
  >(defaultValues?.handicapSource ?? 'self_reported');
  const [homeCourse, setHomeCourse] = useState<string>(
    defaultValues?.homeCourse ?? ''
  );
  const [experienceLevel, setExperienceLevel] = useState<
    'beginner' | 'intermediate' | 'advanced' | 'competitive'
  >(defaultValues?.experienceLevel ?? 'beginner');
  const [playFrequency, setPlayFrequency] = useState<
    'daily' | 'weekly' | 'monthly' | 'few_per_year'
  >(defaultValues?.playFrequency ?? 'weekly');
  const [proofFile, setProofFile] = useState<File | null>(null);

  // local error mirrors (HeroUI's validate returns a string when invalid)
  const [handicapErr, setHandicapErr] = useState<string | undefined>(undefined);
  const [homeCourseErr, setHomeCourseErr] = useState<string | undefined>(
    undefined
  );
  const [playFrequencyErr, setPlayFrequencyErr] = useState<string | undefined>(
    undefined
  );
  const [sourceErr, setSourceErr] = useState<string | undefined>(undefined);

  // helpers
  const canSubmit = useMemo(() => {
    const requiredFilled =
      !Number.isNaN(currentHandicap) &&
      handicapSource &&
      homeCourse.trim().length > 1 &&
      experienceLevel &&
      playFrequency;

    const hasErrors = Boolean(
      handicapErr || homeCourseErr || playFrequencyErr || sourceErr
    );
    return requiredFilled && !hasErrors && !saving;
  }, [
    currentHandicap,
    handicapSource,
    homeCourse,
    experienceLevel,
    playFrequency,
    handicapErr,
    homeCourseErr,
    playFrequencyErr,
    sourceErr,
    saving,
  ]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setSaving(true);
      const fd = new FormData();
      fd.append('currentHandicap', currentHandicap.toString());
      fd.append('handicapSource', handicapSource);
      fd.append('homeCourse', homeCourse);
      fd.append('experienceLevel', experienceLevel);
      fd.append('playFrequency', playFrequency);
      if (proofFile) fd.append('proof', proofFile);

      const res = await fetch('/api/onboarding/golf', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error((await res.text()) || 'Failed to save');

      if (currentStep < steps.length - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        console.log('Golf info saved');
      }
    } catch (err: any) {
      alert(err?.message ?? 'Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='my-6 grid gap-5 sm:grid-cols-2'>
        {/* Current Handicap */}
        <NumberInput
          name='currentHandicap'
          label='Current Handicap (self-reported)'
          placeholder='e.g., 18.3'
          description='One decimal, range −10.0 to 54.0. Not an official WHS index.'
          value={currentHandicap}
          onValueChange={setCurrentHandicap}
          inputMode='decimal'
          isRequired
          validate={(val) => {
            if (!val) {
              setHandicapErr('Required');
              return 'Required';
            }
            // one decimal, optional negative, max two digits before decimal
            const okFormat = /^-?\d{1,2}(\.\d)?$/.test(String(val));
            if (!okFormat) {
              const msg = 'Use one decimal (e.g., 18.3)';
              setHandicapErr(msg);
              return msg;
            }
            const n = Number(val);
            if (Number.isNaN(n) || n < -10 || n > 54) {
              const msg = 'Must be between −10.0 and 54.0';
              setHandicapErr(msg);
              return msg;
            }
            setHandicapErr(undefined);
            return undefined;
          }}
          isInvalid={!!handicapErr}
          errorMessage={handicapErr}
        />

        {/* Handicap Source */}
        <Select
          label='Source'
          selectedKeys={new Set([handicapSource])}
          onSelectionChange={(keys) => {
            const v = Array.from(keys as Set<string>)[0] as
              | 'self_reported'
              | 'club_card';
            if (!v) {
              setSourceErr('Choose a source');
            } else {
              setSourceErr(undefined);
              setHandicapSource(v);
            }
          }}
          isRequired
          isInvalid={!!sourceErr}
          errorMessage={sourceErr}
        >
          <SelectItem key='self_reported'>Self-reported</SelectItem>
          <SelectItem key='club_card'>Club card</SelectItem>
          <SelectItem key='other'>Other</SelectItem>
        </Select>

        {/* Home Course (text for MVP; swap to autocomplete later) */}
        <Input
          type='text'
          name='homeCourse'
          label='Home Course'
          placeholder='e.g., Lionhead Golf Club'
          description='You can change this later'
          value={homeCourse}
          onValueChange={setHomeCourse}
          className='sm:col-span-2'
        />

        {/* Experience Level */}
        <div className='sm:col-span-2'>
          <RadioGroup
            label='Experience Level'
            orientation='horizontal'
            value={experienceLevel}
            onValueChange={(v) =>
              setExperienceLevel(
                v as 'beginner' | 'intermediate' | 'advanced' | 'competitive'
              )
            }
          >
            <Radio value='beginner'>Beginner</Radio>
            <Radio value='intermediate'>Intermediate</Radio>
            <Radio value='advanced'>Advanced</Radio>
            <Radio value='competitive'>Competitive</Radio>
          </RadioGroup>
        </div>

        {/* Play Frequency */}
        <Select
          label='How often do you play?'
          selectedKeys={new Set([playFrequency])}
          onSelectionChange={(keys) => {
            const v = Array.from(keys as Set<string>)[0] as
              | 'weekly'
              | 'monthly'
              | 'few_per_year';
            if (!v) {
              setPlayFrequencyErr('Select a frequency');
            } else {
              setPlayFrequencyErr(undefined);
              setPlayFrequency(v);
            }
          }}
          isRequired
          isInvalid={!!playFrequencyErr}
          errorMessage={playFrequencyErr}
          className='sm:col-span-2'
        >
          <SelectItem key='weekly'>Weekly</SelectItem>
          <SelectItem key='monthly'>Monthly</SelectItem>
          <SelectItem key='few_per_year'>A few times a year</SelectItem>
        </Select>

        {/* Optional proof upload */}
        <Input
          type='file'
          label='Proof (optional)'
          description='Photo/screenshot of club card or app'
          accept='image/png,image/jpeg,image/webp,image/jpg,image/heic'
          onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
          className='sm:col-span-2'
        />
      </div>

      {/* Navigation buttons */}
      <div className='flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0'>
        {currentStep > 0 && (
          <Button
            type='button'
            onPress={() => setCurrentStep((s) => s - 1)}
            className='md:w-1/2 [&>span]:py-3 [&>span]:text-sm'
            variant='flat'
          >
            Prev: {steps[currentStep - 1].label}
          </Button>
        )}
        <Button
          type='submit'
          className='md:w-1/2 [&>span]:text-sm'
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
