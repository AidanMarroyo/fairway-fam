'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { RadioGroup, Radio } from '@heroui/radio';
import { Checkbox } from '@heroui/checkbox';
import { Spinner } from '@heroui/spinner';
import { LocationInput } from '@/components/location-input';

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  steps: { label: string; sublabel?: string }[];
};

const RADIUS_OPTIONS = ['10', '25', '50'] as const; // km

const FORMAT_OPTIONS = [
  { key: 'stroke', label: 'Stroke Play' },
  { key: 'match', label: 'Match Play' },
  { key: 'scramble', label: 'Scramble' },
  { key: 'skins', label: 'Skins' },
  { key: 'stableford', label: 'Stableford' },
];

export function LocationForm({ setCurrentStep, currentStep, steps }: Props) {
  // Location
  const [fullLocation, setFullLocation] = useState(['']);
  const [placeId, setPlaceId] = useState('');
  const [homeLocation, setHomeLocation] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [lat, setLat] = useState<number>(0); // keep as string in form; API will coerce
  const [lng, setLng] = useState<number>(0);
  const [radiusKm, setRadiusKm] = useState<'10' | '25' | '50'>('25');
  const [locErr, setLocErr] = useState<string | undefined>(undefined);
  const [geoLoading, setGeoLoading] = useState(false);

  // Preferences
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [playStyle, setPlayStyle] = useState<'casual' | 'competitive'>(
    'casual'
  );
  const [favoriteFormats, setFavoriteFormats] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // Validation: require either (lat & lng) OR (city or postal)
  const canSubmit = useMemo(() => {
    const hasCoords = lat && lng;
    const hasTextLoc = city.trim().length >= 2 || postal.trim().length >= 3;
    return (hasCoords || hasTextLoc) && !!radiusKm && !saving;
  }, [lat, lng, city, postal, radiusKm, saving]);

  function validateLocation() {
    const hasCoords = lat && lng;
    const hasTextLoc = city.trim().length >= 2 || postal.trim().length >= 3;
    if (!hasCoords && !hasTextLoc) {
      const msg = 'Provide City or Postal Code, or use your current location.';
      setLocErr(msg);
      return msg;
    }
    setLocErr(undefined);
    return undefined;
  }

  async function handleUseMyLocation() {
    setGeoLoading(true);
    setLocErr(undefined);
    try {
      if (!('geolocation' in navigator)) {
        setLocErr('Geolocation not available in this browser.');
        return;
      }
      await new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLat(pos.coords.latitude);
            setLng(pos.coords.longitude);
            resolve();
          },
          (err) => {
            setLocErr(err.message || 'Could not get your location.');
            reject(err);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
      });
    } finally {
      setGeoLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateLocation()) return;

    try {
      setSaving(true);

      const fd = new FormData();
      fd.append('city', city);
      fd.append('postal', postal);
      fd.append('lat', String(lat));
      fd.append('lng', String(lng));
      fd.append('radiusKm', radiusKm);

      // Preferences
      fd.append('playStyle', playStyle);
      fd.append('lookingFor', JSON.stringify(lookingFor)); // array -> JSON
      fd.append('favoriteFormats', JSON.stringify(favoriteFormats)); // array -> JSON

      const res = await fetch('/api/onboarding/location-preferences', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error((await res.text()) || 'Failed to save');

      // This is the last step
      console.log('Onboarding complete');
      // e.g., router.push('/welcome') or open success sheet
    } catch (err: any) {
      alert(err?.message ?? 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='my-6 grid gap-5 sm:grid-cols-2'>
        {/* City */}

        {homeLocation}

        <div className='sm:col-span-2 flex items-center gap-3'>
          <Button
            type='button'
            onPress={handleUseMyLocation}
            variant='flat'
            isDisabled={geoLoading}
          >
            {geoLoading ? (
              <span className='flex items-center gap-2'>
                <Spinner size='sm' /> Getting location…
              </span>
            ) : (
              'Use my current location'
            )}
          </Button>
          {locErr && <p className='text-sm text-danger'>{locErr}</p>}
        </div>

        <LocationInput
          defaultValue={homeLocation}
          onSelect={(place) => {
            setHomeLocation(place.formattedName);
            setPlaceId(place.placeId);
            setLat(place.lat);
            setLng(place.lng);
            setFullLocation(
              place.address_components.map((c: any) => c.long_name)
            );
            setLocErr(undefined);
          }}
          isInvalid={!!locErr}
          errorMessage={locErr}
        />

        {/* Discovery Radius */}
        <Select
          label='Preferred Range for Discovery'
          selectedKeys={new Set([radiusKm])}
          onSelectionChange={(keys) => {
            const v = Array.from(keys as Set<string>)[0] as '10' | '25' | '50';
            if (v) setRadiusKm(v);
          }}
          isRequired
          className='sm:col-span-2'
        >
          {RADIUS_OPTIONS.map((km) => (
            <SelectItem key={km}>{km} km</SelectItem>
          ))}
        </Select>

        {/* Use My Location button */}

        {/* Preferences */}
        <div className='sm:col-span-2'>
          <p className='mb-2 text-sm font-medium text-foreground'>
            Looking for…
          </p>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
            {[
              { key: 'partners', label: 'Playing Partners' },
              { key: 'deals', label: 'Tee Time Deals' },
              { key: 'used_clubs', label: 'Used Clubs' },
              { key: 'coaching', label: 'Coaching' },
            ].map((opt) => (
              <Checkbox
                key={opt.key}
                isSelected={lookingFor.includes(opt.key)}
                onValueChange={(checked) => {
                  setLookingFor((prev) =>
                    checked
                      ? [...prev, opt.key]
                      : prev.filter((k) => k !== opt.key)
                  );
                }}
              >
                {opt.label}
              </Checkbox>
            ))}
          </div>
        </div>

        {/* Play Style */}
        <div className='sm:col-span-2'>
          <RadioGroup
            label='Preferred Play Style'
            orientation='horizontal'
            value={playStyle}
            onValueChange={(v) => setPlayStyle(v as 'casual' | 'competitive')}
          >
            <Radio value='casual'>Casual / Social</Radio>
            <Radio value='competitive'>Competitive / Tournament</Radio>
          </RadioGroup>
        </div>

        {/* Favorite Formats (multi-select) */}
        <Select
          label='Favorite Formats'
          selectionMode='multiple'
          selectedKeys={new Set(favoriteFormats)}
          onSelectionChange={(keys) =>
            setFavoriteFormats(Array.from(keys as Set<string>))
          }
          placeholder='Choose one or more'
          className='sm:col-span-2'
        >
          {FORMAT_OPTIONS.map((f) => (
            <SelectItem key={f.key}>{f.label}</SelectItem>
          ))}
        </Select>
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
          ) : (
            'Finish'
          )}
        </Button>
      </div>
    </form>
  );
}
