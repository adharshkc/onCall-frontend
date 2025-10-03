import { useState } from 'react';
import axios from '@/lib/api';
import { API_URL } from '@/config/api';

interface LocationSuggestion {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  lat?: number;
  lng?: number;
}

interface UseLocationSearchReturn {
  suggestions: LocationSuggestion[];
  isLoading: boolean;
  error: string | null;
  searchLocations: (query: string) => Promise<void>;
  clearSuggestions: () => void;
}

/**
 * Custom hook for location search functionality
 * 
 * This hook provides a reusable interface for searching locations
 * using the custom AdonisJS backend API.
 * 
 * Expected API Response Format:
 * {
 *   data: [
 *     {
 *       id: "1",
 *       name: "Location Name",
 *       address: "123 Main St",
 *       city: "City Name",
 *       state: "State",
 *       zipCode: "12345",
 *       lat?: 40.7128,
 *       lng?: -74.0060
 *     }
 *   ]
 * }
 */
export const useLocationSearch = (): UseLocationSearchReturn => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocations = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/locations/search`, {
        params: {
          q: query,
          limit: 10
        }
      });

      const locationData = response.data.data || response.data || [];
      setSuggestions(locationData);
    } catch (err) {
      console.error('Error searching locations:', err);
      setError('Failed to search locations');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSuggestions = () => {
    setSuggestions([]);
    setError(null);
  };

  return {
    suggestions,
    isLoading,
    error,
    searchLocations,
    clearSuggestions,
  };
};
