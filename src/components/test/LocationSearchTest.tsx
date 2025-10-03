"use client";
import React, { useState } from 'react';
import { useLocationSearch } from '@/hooks/useLocationSearch';

/**
 * Location Search Test Component
 * 
 * This component helps you test the location search API integration
 * with your AdonisJS backend. Use this to verify the API is working
 * before using the full LocationSearchSection component.
 */
const LocationSearchTest: React.FC = () => {
  const [query, setQuery] = useState('');
  const { suggestions, isLoading, error, searchLocations, clearSuggestions } = useLocationSearch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await searchLocations(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    clearSuggestions();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Location Search API Test
      </h2>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter location to search..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            minLength={2}
          />
          <button
            type="submit"
            disabled={isLoading || query.length < 2}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>

      {/* API Status */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>API Endpoint:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3333/api'}/locations/search
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Make sure your AdonisJS backend is running and the endpoint is available
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">Error:</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">Searching for locations...</p>
        </div>
      )}

      {/* Results */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Results ({suggestions.length}):
          </h3>
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id || index}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-gray-900">
                {suggestion.name || `${suggestion.city}, ${suggestion.state}`}
              </div>
              <div className="text-sm text-gray-600">
                {suggestion.address}
                {suggestion.zipCode && `, ${suggestion.zipCode}`}
              </div>
              {(suggestion.lat || suggestion.lng) && (
                <div className="text-xs text-blue-600 mt-1">
                  Coordinates: {suggestion.lat}, {suggestion.lng}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                ID: {suggestion.id}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && !error && suggestions.length === 0 && query.length >= 2 && (
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">
            No locations found for &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Try a different search term or check if your backend API is running
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSearchTest;
