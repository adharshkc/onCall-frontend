"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "@/lib/api";
import { API_URL } from "@/config/api";

interface LocationSuggestion {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  lat: number;
  lng: number;
  placeType?: string;
  category?: string;
}

interface PostcodeData {
  postcode: string;
  displayName: string;
}

interface LocationSearchInputProps {
  onLocationSelect: (location: LocationSuggestion, postcodes: string[]) => void;
  initialValue?: string;
  initialLocation?: {
    name: string;
    lat: number;
    lng: number;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  initialPostcodes?: string[];
  disabled?: boolean;
  className?: string;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  onLocationSelect,
  initialValue = "",
  initialLocation,
  initialPostcodes = [],
  disabled = false,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue || initialLocation?.name || "");
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(
    initialLocation ? {
      id: `existing-${Date.now()}`,
      name: initialLocation.name,
      address: initialLocation.address || "",
      city: initialLocation.city,
      state: initialLocation.state,
      zipCode: initialLocation.zipCode,
      country: "GB",
      lat: initialLocation.lat,
      lng: initialLocation.lng,
    } : null
  );
  const [availablePostcodes, setAvailablePostcodes] = useState<PostcodeData[]>([]);
  const [selectedPostcodes, setSelectedPostcodes] = useState<string[]>(initialPostcodes);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingPostcodes, setIsLoadingPostcodes] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with existing location data when editing
  useEffect(() => {
    if (initialLocation && initialPostcodes && initialPostcodes.length > 0 && selectedLocation) {
      // Clean and filter valid postcodes
      const validPostcodes = initialPostcodes.filter(postcode => 
        postcode && 
        typeof postcode === 'string' && 
        postcode.trim() !== '' && 
        postcode !== 'null' && 
        postcode !== 'NULL'
      );

      if (validPostcodes.length > 0) {
        // Convert initial postcodes to PostcodeData format for display
        const mockPostcodeData = validPostcodes.map(postcode => ({
          postcode: postcode.trim().toUpperCase(),
          displayName: postcode.trim().toUpperCase()
        }));
        setAvailablePostcodes(mockPostcodeData);
        setSelectedPostcodes(validPostcodes.map(pc => pc.trim().toUpperCase()));
        
        // Notify parent component of the initial selection
        onLocationSelect(selectedLocation, validPostcodes.map(pc => pc.trim().toUpperCase()));
      }
    }
  }, [initialLocation, initialPostcodes, selectedLocation, onLocationSelect]);

  // Debounced location search
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.length >= 2 && !disabled) {
        setLoading(true);
        try {
          const response = await axios.get(`${API_URL}/locations/autocomplete`, {
            params: {
              q: searchQuery,
              country: 'gb',
              limit: 10
            }
          });
          
          const suggestions = response.data.data || [];
          setLocationSuggestions(suggestions);
          setShowSuggestions(suggestions.length > 0);
        } catch (error) {
          console.error('Location search failed:', error);
          setLocationSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLocationSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, disabled]);

  // Get postcodes when location is selected
  const handleLocationSelect = async (location: LocationSuggestion) => {
    setSelectedLocation(location);
    setSearchQuery(location.name);
    setLocationSuggestions([]);
    setShowSuggestions(false);
    setIsLoadingPostcodes(true);

    try {
      const response = await axios.get(`${API_URL}/locations/postcodes`, {
        params: {
          lat: location.lat,
          lng: location.lng,
          radius: 5000,
          countryCode: 'gb',
          limit: 50
        }
      });

      const postcodes = response.data.data || [];
      // Clean and validate postcodes from API
      const validPostcodes = postcodes.filter((p: PostcodeData) => 
        p && p.postcode && 
        typeof p.postcode === 'string' && 
        p.postcode.trim() !== '' &&
        p.postcode !== 'null' && 
        p.postcode !== 'NULL'
      );
      
      setAvailablePostcodes(validPostcodes);
      // Auto-select all valid postcodes by default
      const postcodeValues = validPostcodes.map((p: PostcodeData) => p.postcode.trim().toUpperCase());
      setSelectedPostcodes(postcodeValues);
      
      // Notify parent component
      onLocationSelect(location, postcodeValues);
    } catch (error) {
      console.error('Failed to fetch postcodes:', error);
      setAvailablePostcodes([]);
      setSelectedPostcodes([]);
    } finally {
      setIsLoadingPostcodes(false);
    }
  };

  // Handle postcode selection change
  const handlePostcodeChange = (postcode: string, checked: boolean) => {
    const cleanPostcode = postcode.trim().toUpperCase();
    const newSelectedPostcodes = checked
      ? [...selectedPostcodes.filter(p => p !== cleanPostcode), cleanPostcode] // Avoid duplicates
      : selectedPostcodes.filter(p => p !== cleanPostcode);
    
    setSelectedPostcodes(newSelectedPostcodes);
    
    if (selectedLocation) {
      onLocationSelect(selectedLocation, newSelectedPostcodes);
    }
  };

  // Handle select all/deselect all
  const handleSelectAllPostcodes = (selectAll: boolean) => {
    const newSelectedPostcodes = selectAll 
      ? availablePostcodes.map(p => p.postcode.trim().toUpperCase())
      : [];
    
    setSelectedPostcodes(newSelectedPostcodes);
    
    if (selectedLocation) {
      onLocationSelect(selectedLocation, newSelectedPostcodes);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    const timeoutRef = searchTimeoutRef.current;
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, []);

  // Clear selection
  const clearSelection = () => {
    setSelectedLocation(null);
    setSearchQuery("");
    setAvailablePostcodes([]);
    setSelectedPostcodes([]);
    // Pass an empty location object and empty zipcodes array
    onLocationSelect({} as LocationSuggestion, []);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Location Search Input */}
      <div className="form-group">
        <label className="mb-2 block text-sm font-medium text-black">
          Search Location (Optional)
        </label>
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type city, town, or area name..."
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
            disabled={disabled || loading}
            onFocus={() => {
              if (locationSuggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
          />
          
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
          )}
        </div>

        {/* Location Suggestions Dropdown */}
        {showSuggestions && locationSuggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 mt-1 w-full bg-white border border-stroke rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {locationSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                onClick={() => handleLocationSelect(suggestion)}
              >
                <div className="font-medium text-black">{suggestion.name}</div>
                <div className="text-sm text-gray-600">{suggestion.address}</div>
              </div>
            ))}
          </div>
        )}

        {searchQuery.trim().length > 0 && searchQuery.length < 2 && (
          <p className="text-xs text-gray-600 mt-1">
            Type at least 2 characters to see suggestions.
          </p>
        )}
      </div>

      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-blue-900">
              {initialLocation ? "Current Service Location:" : "Selected Location:"}
            </h3>
            <button
              onClick={clearSelection}
              className="text-red-500 hover:text-red-700 text-sm"
              title="Clear selection"
            >
              Remove
            </button>
          </div>
          <div className="text-sm space-y-1">
            <p><strong>Name:</strong> {selectedLocation.name}</p>
            <p><strong>Address:</strong> {selectedLocation.address}</p>
            <p><strong>Coordinates:</strong> {selectedLocation.lat}, {selectedLocation.lng}</p>
            {initialLocation && (
              <div className="mt-2 p-2 bg-blue-100 border border-blue-300 rounded">
                <p className="text-blue-800 text-xs">
                  💡 This location was previously saved with this service. 
                  You can search for a new location to replace it or modify the postcodes below.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Postcodes Loading */}
      {isLoadingPostcodes && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading postcodes...</p>
        </div>
      )}

      {/* Postcodes Selection */}
      {availablePostcodes.length > 0 && !isLoadingPostcodes && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-black">Available Postcodes ({availablePostcodes.length}):</h3>
            <div className="space-x-2">
              <button 
                type="button"
                onClick={() => handleSelectAllPostcodes(true)}
                className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                Select All
              </button>
              <button 
                type="button"
                onClick={() => handleSelectAllPostcodes(false)}
                className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Deselect All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-3">
            {availablePostcodes.map((postcode) => (
              <label key={postcode.postcode} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedPostcodes.includes(postcode.postcode.trim().toUpperCase())}
                  onChange={(e) => handlePostcodeChange(postcode.postcode, e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-gray-700">{postcode.displayName}</span>
              </label>
            ))}
          </div>

          <p className="text-sm text-gray-600">
            Selected: {selectedPostcodes.length} of {availablePostcodes.length} postcodes
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSearchInput;