'use client';

import { Select, SelectItem } from '@heroui/select';

import { Input } from '@heroui/input';
import { useState } from 'react';
import { useGolfCourseSuggestions } from './course-suggestions';

type GolfCourse = {
  name: string;
  placeId: string;
  lat: number;
  lng: number;
};

interface GolfCourseSelectProps {
  onSelect: (course: GolfCourse) => void;
}

export function GolfCourseSelect({ onSelect }: GolfCourseSelectProps) {
  const [query, setQuery] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const { results, loading } = useGolfCourseSuggestions(query);

  async function handleSelect(placeId: string) {
    setSelectedPlaceId(placeId);
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    service.getDetails(
      { placeId, fields: ['name', 'geometry.location', 'place_id'] },
      (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place?.geometry?.location &&
          place.name
        ) {
          onSelect({
            name: place.name,
            placeId: place.place_id!,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        }
      }
    );
  }

  return (
    <div className='sm:col-span-2'>
      <Input
        label='Home Course'
        placeholder='Type to search...'
        value={query}
        onValueChange={setQuery}
      />
      <Select
        label={
          results.length > 0
            ? `${results.length} courses found`
            : 'No courses found'
        }
        selectedKeys={selectedPlaceId ? new Set([selectedPlaceId]) : new Set()}
        onSelectionChange={(keys) => {
          const val = Array.from(keys)[0];
          if (val) handleSelect(val as string);
        }}
        isLoading={loading}
        isDisabled={results.length === 0}
        className='mt-2'
        description='Select your home course to find other members who play there.'
      >
        {results.map((r) => (
          <SelectItem key={r.placeId}>{r.description}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
