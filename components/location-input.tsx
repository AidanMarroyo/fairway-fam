'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@heroui/input';
import { Spinner } from '@heroui/spinner';

type PlaceData = {
  formattedName: string; // e.g., "Toronto Ontario Canada"
  name: string; // Google place.name
  placeId: string;
  lat: number;
  lng: number;
  city?: string;
  region?: string; // admin_area_level_1 long_name (e.g., "Ontario")
  country?: string; // long_name (e.g., "Canada")
  postalCode?: string;
  address_components: google.maps.GeocoderAddressComponent[];
};

type Props = {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onSelect: (place: PlaceData) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  countryRestriction?: string; // e.g., "ca"
};

function extractPart(
  comps: google.maps.GeocoderAddressComponent[] | undefined,
  type: string,
  useShort = false
) {
  const c = comps?.find((ac) => ac.types.includes(type));
  return useShort ? c?.short_name : c?.long_name;
}

function buildFormattedName(
  name: string,
  comps: google.maps.GeocoderAddressComponent[]
) {
  // Prefer a proper locality for the "city" display; fallbacks cover rural cases
  const city =
    extractPart(comps, 'locality') ||
    extractPart(comps, 'postal_town') ||
    extractPart(comps, 'sublocality') ||
    extractPart(comps, 'administrative_area_level_3') ||
    extractPart(comps, 'administrative_area_level_2') ||
    extractPart(comps, 'administrative_area_level_1') ||
    name;

  const region = extractPart(comps, 'administrative_area_level_1'); // "Ontario"
  const country = extractPart(comps, 'country'); // "Canada"

  // No commas per your requirement
  return [city, region, country].filter(Boolean).join(' ');
}

export function LocationInput({
  label = 'Location',
  placeholder = '',
  defaultValue = '',
  onSelect,
  isInvalid,
  errorMessage,
  countryRestriction = '',
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [scriptLoaded, setScriptLoaded] = useState<boolean>(
    typeof window !== 'undefined' && !!window.google?.maps
  );
  const [fallbackValue, setFallbackValue] = useState<string>(
    defaultValue || ''
  );

  // Wait for Google script to load (if not already available)
  useEffect(() => {
    const checkGoogle = () => {
      if (window.google?.maps?.places) {
        setScriptLoaded(true);
      } else {
        setTimeout(checkGoogle, 250);
      }
    };
    if (!scriptLoaded) checkGoogle();
  }, [scriptLoaded]);

  // Initialize Places Autocomplete
  useEffect(() => {
    if (!scriptLoaded || !inputRef.current) return;

    try {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          fields: [
            'place_id',
            'geometry.location',
            'name',
            'address_components',
          ],
          ...(countryRestriction
            ? { componentRestrictions: { country: countryRestriction } }
            : {}),
        }
      );

      if (autocompleteRef.current) {
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();
          if (
            place &&
            place.place_id &&
            place.geometry?.location &&
            place.name &&
            place.address_components
          ) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            const city =
              extractPart(place.address_components, 'locality') ||
              extractPart(place.address_components, 'postal_town') ||
              extractPart(place.address_components, 'sublocality') ||
              undefined;

            const region =
              extractPart(
                place.address_components,
                'administrative_area_level_1'
              ) || undefined;
            const country =
              extractPart(place.address_components, 'country') || undefined;
            const postalCode =
              extractPart(place.address_components, 'postal_code') || undefined;

            const formattedName = buildFormattedName(
              place.name,
              place.address_components
            );

            const data: PlaceData = {
              formattedName, // "Toronto Ontario Canada"
              name: place.name, // "Toronto"
              placeId: place.place_id,
              lat,
              lng,
              city,
              region,
              country,
              postalCode,
              address_components: place.address_components,
            };

            // Update visible input with normalized value (no commas)
            setFallbackValue(formattedName);

            // Hand back structured + normalized data for saving
            onSelect(data);
          }
        });
      }
    } catch (e) {
      console.warn('Google Places failed to initialize:', e);
    }
  }, [scriptLoaded, countryRestriction, onSelect]);

  return (
    <div className='sm:col-span-2 relative'>
      {!scriptLoaded && (
        <div className='absolute inset-y-0 right-3 flex items-center'>
          <Spinner size='sm' />
        </div>
      )}

      <Input
        ref={inputRef}
        type='text'
        label={label}
        placeholder={placeholder}
        value={fallbackValue}
        onValueChange={setFallbackValue}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        disabled={!scriptLoaded}
        description={
          scriptLoaded
            ? 'Input your location to find courses and golfers near you'
            : 'Fallback input until Google Maps is ready'
        }
      />
    </div>
  );
}
