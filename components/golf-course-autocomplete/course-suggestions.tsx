import { useEffect, useState } from 'react';

type GolfSuggestion = {
  description: string;
  placeId: string;
};

export function useGolfCourseSuggestions(query: string, country = '') {
  const [results, setResults] = useState<GolfSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.google?.maps?.places || !query) return;

    const autocomplete = new window.google.maps.places.AutocompleteService();

    setLoading(true);
    autocomplete.getPlacePredictions(
      {
        input: query,
        types: ['establishment'],
        componentRestrictions: { country },
      },
      (predictions: google.maps.places.AutocompletePrediction[] | null) => {
        const golfMatches = (predictions || []).filter((p) =>
          /golf|club|course/i.test(p.description)
        );

        setResults(
          golfMatches.map((p) => ({
            description: p.description,
            placeId: p.place_id,
          }))
        );
        setLoading(false);
      }
    );
  }, [query, country]);

  return { results, loading };
}
