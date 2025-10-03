"use client";
import React, { useState, useEffect } from "react";
import TableThree, { Column } from "@/components/Tables/TableThree";
import Modal from "@/components/FormElements/Modal";
import { FormField } from "@/components/FormElements/ReusableForm";
import LocationSearchInput from "./LocationSearchInput";
import { API_URL } from "@/config/api";
import axios from "@/lib/api";
import { handleApiError } from "@/utils/handleApiError";
import TableSkeletonLoader from "@/components/skeletonLoader/TableSkeletonLoader";
import servicesData from "@/data/services.json";

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

interface ServiceFormData {
  name: string;
  slug: string;
  category: string;
  description: string;
  fullDescription: string;
  detailedDescription: string;
  whatIs: string;
  typicalVisit: string;
  benefits: string;
  benefitsExtended: string;
  gettingStarted: string;
  image: File | string; // Can be File for upload or string for existing path
  icon: File | string; // Can be File for upload or string for existing path
  active: string; // This will be converted to boolean
}

interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  fullDescription: string;
  detailedDescription: string;
  whatIs: string;
  typicalVisit: string;
  services?: string[];
  benefits: string;
  benefitsExtended: string;
  gettingStarted: string;
  gettingStartedPoints?: string[];
  image: string;
  icon: string;
  stats?: Array<{
    number: string;
    suffix: string;
    label: string;
    icon: string;
  }>;
  active: boolean;
  // Location data fields
  locationData?: {
    name: string;
    lat: number;
    lng: number;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    type?: string;
    region?: string;
    county?: string;
  };
  zipcodes?: string[];
}

// Utility function to clean and parse zipcodes from backend
const parseAndCleanZipcodes = (zipcodes: string | string[] | undefined | null): string[] => {
  if (!zipcodes) return [];
  
  let parsedCodes: string[] = [];
  
  try {
    if (typeof zipcodes === 'string') {
      // Handle malformed string data like "[\"NULL,[\\\"WC2N 5DU\\\"]\",\"[\\\"WC2N 5DU\\\"]\"]"
      // Remove outer quotes and split by common patterns
      const cleanedString = zipcodes
        .replace(/^[\[\"]+|[\]\"]+$/g, '') // Remove outer brackets and quotes
        .replace(/\\"/g, '"') // Unescape quotes
        .replace(/\\\\/g, '\\'); // Unescape backslashes
      
      // Try to extract valid postcodes using regex
      const postcodeRegex = /[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}/gi;
      const matches = cleanedString.match(postcodeRegex);
      if (matches) {
        parsedCodes = matches.map(code => code.trim().toUpperCase());
      } else {
        // Fallback: try to parse as JSON arrays
        const jsonArrayRegex = /\[([^\]]+)\]/g;
        let match;
        while ((match = jsonArrayRegex.exec(cleanedString)) !== null) {
          try {
            const innerArray = JSON.parse('[' + match[1] + ']');
            if (Array.isArray(innerArray)) {
              parsedCodes.push(...innerArray.filter(item => typeof item === 'string'));
            }
          } catch {
            // If JSON parsing fails, split by comma and clean
            const items = match[1].split(',').map(item => 
              item.replace(/['"]/g, '').trim()
            );
            parsedCodes.push(...items);
          }
        }
      }
    } else if (Array.isArray(zipcodes)) {
      parsedCodes = zipcodes.filter(code => typeof code === 'string');
    }
  } catch (error) {
    console.warn('Error parsing zipcodes:', error);
  }
  
  // Clean and deduplicate
  return Array.from(new Set(
    parsedCodes
      .filter(code => code && 
        code.trim() !== '' && 
        code !== 'null' && 
        code !== 'NULL' &&
        typeof code === 'string'
      )
      .map(code => code.trim().toUpperCase())
  ));
};

const serviceColumns: Column[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Category", accessorKey: "category" },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <span>
        {row.description.length > 100 ? `${row.description.substring(0, 100)}...` : row.description}
      </span>
    ),
  },
  {
    header: "Location",
    accessorKey: "locationData",
    cell: ({ row }) => (
      <div className="text-xs">
        {row.zipcodes ? (
          <div>
            {/* <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
              📍 {row.locationData.name}
            </span> */}
            {row.zipcodes && (
              <div className="mt-1 text-gray-600">
                {row.zipcodes} postcode{row.zipcodes.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        ) : (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
            No location
          </span>
        )}
      </div>
    ),
  },
  {
    header: "Active",
    accessorKey: "active",
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded text-xs ${row.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {row.active ? 'Active' : 'Inactive'}
      </span>
    ),
  },
];

const serviceFormFields: FormField[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter service name", required: true },
  { name: "slug", label: "Slug", type: "text", placeholder: "Enter service slug (e.g., domiciliary-care)", required: true },
  { 
    name: "category", 
    label: "Category", 
    type: "select", 
    placeholder: "Select category", 
    required: true,
    options: [
      { value: "home-care", label: "Home Care" },
      { value: "specialist-care", label: "Specialist Care" }
    ]
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter service description",
    required: true,
  },
  {
    name: "fullDescription",
    label: "Full Description",
    type: "textarea",
    placeholder: "Enter full description",
    required: true,
  },
  {
    name: "detailedDescription",
    label: "Detailed Description",
    type: "textarea",
    placeholder: "Enter detailed description",
    required: true,
  },
  {
    name: "whatIs",
    label: "What Is",
    type: "textarea",
    placeholder: "Describe what this service is",
    required: true,
  },
  {
    name: "typicalVisit",
    label: "Typical Visit",
    type: "textarea",
    placeholder: "Describe a typical visit",
    required: true,
  },
  {
    name: "benefits",
    label: "Benefits",
    type: "textarea",
    placeholder: "Describe the benefits",
    required: true,
  },
  {
    name: "benefitsExtended",
    label: "Benefits Extended",
    type: "textarea",
    placeholder: "Extended benefits description",
    required: true,
  },
  {
    name: "gettingStarted",
    label: "Getting Started",
    type: "textarea",
    placeholder: "Describe how to get started",
    required: true,
  },
  // { name: "image", label: "Service Image", type: "file", required: true },
  // { name: "icon", label: "Service Icon", type: "file", required: true },
  // { 
  //   name: "active", 
  //   label: "Active", 
  //   type: "select", 
  //   placeholder: "Select status", 
  //   required: true,
  //   options: [
  //     { value: "true", label: "Active" },
  //     { value: "false", label: "Inactive" }
  //   ]
  // },
];

type ServiceManagementSectionProps = Record<string, never>;

// Custom Service Form Component with Location Search
interface ServiceFormWithLocationProps {
  fields: FormField[];
  initialValues?: Partial<ServiceFormData>;
  existingService?: Service; // Add this to pass existing service data
  onSubmit: (formData: ServiceFormData, locationData?: LocationSuggestion, zipcodes?: string[]) => void;
  submitButtonText: string;
}

const ServiceFormWithLocation: React.FC<ServiceFormWithLocationProps> = ({
  fields,
  initialValues,
  existingService,
  onSubmit,
  submitButtonText,
}) => {
  const [formData, setFormData] = useState<ServiceFormData>(
    initialValues as ServiceFormData || {
      name: "",
      slug: "",
      category: "",
      description: "",
      fullDescription: "",
      detailedDescription: "",
      whatIs: "",
      typicalVisit: "",
      benefits: "",
      benefitsExtended: "",
      gettingStarted: "",
      image: "",
      icon: "",
      active: "true",
    }
  );
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null);
  const [selectedzipcodes, setSelectedzipcodes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLocationSelect = (location: LocationSuggestion, zipcodes: string[]) => {
    setSelectedLocation(location);
    setSelectedzipcodes(zipcodes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(
        formData,
        selectedLocation || undefined,
        selectedzipcodes.length > 0 ? selectedzipcodes : undefined
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (name: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Details Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-black mb-4">Service Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="mb-2 block text-sm font-medium text-black">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'select' ? (
                <select
                  value={formData[field.name as keyof ServiceFormData] as string}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  required={field.required}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={formData[field.name as keyof ServiceFormData] as string}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={4}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary resize-none"
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name as keyof ServiceFormData] as string}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Location & zipcodes Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-black mb-2">Service Location (Optional)</h3>
        <p className="text-sm text-gray-600 mb-4">
          Add location and zipcodes where this service is available. This will help customers find your service by postcode.
        </p>
        <LocationSearchInput
          onLocationSelect={handleLocationSelect}
          disabled={isSubmitting}
          initialLocation={existingService?.locationData}
          initialPostcodes={parseAndCleanZipcodes(existingService?.zipcodes)}
        />
      </div>

      {/* Submit Section */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.description}
            style={{
            padding: "12px 24px",
            backgroundColor: (isSubmitting || !formData.name || !formData.description) ? "#9CA3AF" : "#06B6D4",
            color: "#000",
            fontWeight: 600,
            borderRadius: "8px",
            border: "1px solid rgba(0,0,0,0.06)",
            cursor: (isSubmitting || !formData.name || !formData.description) ? "not-allowed" : "pointer",
            transition: "background-color 150ms ease-in-out, opacity 150ms",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            textDecoration: "none",
            userSelect: "none",
          }}
        >
          {isSubmitting ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <div
          className="animate-spin"
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "2px solid rgba(0,0,0,0.12)",
            borderTopColor: "currentColor",
            borderRightColor: "currentColor",
            boxSizing: "border-box",
          }}
              />
              <span>Creating...</span>
            </span>
          ) : selectedLocation && selectedzipcodes.length > 0 ? (
            `${submitButtonText} with ${selectedzipcodes.length} zipcodes`
          ) : (
            submitButtonText
          )}
        </button>

        {selectedLocation && selectedzipcodes.length > 0 && (
          <p className="text-sm text-gray-600 flex items-center">
            Service will be available in {selectedLocation.name} for {selectedzipcodes.length} postcode(s)
          </p>
        )}
      </div>
    </form>
  );
};

const ServiceManagementSection: React.FC<ServiceManagementSectionProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Fixed for simplicity; could be made adjustable
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [useBackend, setUseBackend] = useState(true); // Track if backend is available

  // Check if backend is available
  const checkBackendAvailability = async () => {
    try {
      await axios.get(`${API_URL}/health`, { timeout: 3000 });
      setUseBackend(true);
      console.log("Backend is available");
    } catch {
      setUseBackend(false);
      console.log("Backend is not available, using JSON fallback");
    }
  };

  const fetchServices = async (page: number, perPage: number) => {
    setIsLoading(true);
    try {
      // Try to fetch from backend first
      const response = await axios.get(`${API_URL}/services`, {
        params: { page, per_page: perPage },
        timeout: 5000, // 5 second timeout
      });
      
      if (response.data && response.data.data) {
        setServiceData(response.data.data);
        const pagination = response.data.meta || response.data.miscellaneous?.[0];
        setTotalPages(pagination?.totalPages || Math.ceil(pagination?.total / perPage) || 1);
        setTotalItems(pagination?.totalItems || pagination?.total || response.data.data.length);
        setUseBackend(true);
        console.log("Services loaded from backend");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.warn("Backend not available, falling back to JSON file:", error);
      setUseBackend(false);
    }

    try {
      // Fallback to JSON file
      const services = servicesData.services as Service[];
      
      // Simple pagination for local data
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedServices = services.slice(startIndex, endIndex);
      
      setServiceData(paginatedServices);
      setTotalPages(Math.ceil(services.length / perPage));
      setTotalItems(services.length);
      console.log("Services loaded from JSON file");
    } catch (error) {
      console.error("Error loading services from JSON:", error);
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeServices = async () => {
      await checkBackendAvailability();
      await fetchServices(currentPage, perPage);
    };
    
    initializeServices();
  }, [currentPage, perPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddServiceSubmit = async (
    formData: ServiceFormData, 
    locationData?: LocationSuggestion, 
    zipcodes?: string[]
  ) => {
    try {
      if (useBackend) {
        // Try to submit to backend
        const submitData = new FormData();
        
        // Add all text fields
        Object.keys(formData).forEach(key => {
          const value = formData[key as keyof ServiceFormData];
          if (key === 'active') {
            submitData.append(key, String(value === 'true'));
          } else if (key === 'image' || key === 'icon') {
            if (value instanceof File) {
              submitData.append(key, value);
            }
          } else {
            submitData.append(key, String(value));
          }
        });

        // Add location and zipcodes if provided
        if (locationData && zipcodes && zipcodes.length > 0) {
          // Clean zipcodes: remove duplicates, null values, and empty strings
          const cleanedZipcodes = Array.from(new Set(
            zipcodes
              .filter(zipcode => zipcode && zipcode.trim() !== '' && zipcode !== 'null' && zipcode !== 'NULL')
              .map(zipcode => zipcode.trim().toUpperCase())
          ));

          if (cleanedZipcodes.length > 0) {
            submitData.append('locationData', JSON.stringify({
              name: locationData.name,
              lat: locationData.lat,
              lng: locationData.lng,
              type: locationData.placeType || 'area',
              region: 'england',
              county: locationData.state || locationData.city || '',
              zipCode: locationData.zipCode
            }));
            submitData.append('zipcodes', JSON.stringify(cleanedZipcodes));
          }
        }

        const response = await axios.post(`${API_URL}/services`, submitData, {
          headers: { 
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000, // 10 second timeout
        });

        const newService = response.data.data;
        setServiceData((prevData) => [...prevData, newService]);
        setIsAddModalOpen(false);
        fetchServices(currentPage, perPage); // Refresh current page
        console.log("Service added via backend with location data");
        return;
      }
    } catch (error) {
      console.warn("Failed to add service via backend, adding to local state:", error);
      setUseBackend(false);
    }

    // Fallback to local state management
    try {
      const newService: Service = {
        ...formData,
        active: formData.active === "true", // Convert string to boolean
        id: String(Date.now()), // Generate a temporary ID
        services: [],
        gettingStartedPoints: [],
        stats: [],
        image: formData.image instanceof File ? `/images/temp-${Date.now()}.jpg` : String(formData.image),
        icon: formData.icon instanceof File ? `/images/temp-icon-${Date.now()}.svg` : String(formData.icon),
      };
      
      setServiceData((prevData) => [...prevData, newService]);
      setIsAddModalOpen(false);
      console.log("Service added to local state");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleEditServiceSubmit = async (
    formData: ServiceFormData,
    locationData?: LocationSuggestion,
    zipcodes?: string[]
  ) => {
    try {
      if (!selectedService) return;
      
      if (useBackend) {
        // Try to update via backend
        const submitData = new FormData();
        
        // Add all text fields
        Object.keys(formData).forEach(key => {
          const value = formData[key as keyof ServiceFormData];
          if (key === 'active') {
            submitData.append(key, String(value === 'true'));
          } else if (key === 'image' || key === 'icon') {
            if (value instanceof File) {
              submitData.append(key, value);
            }
          } else {
            submitData.append(key, String(value));
          }
        });

        // Add location and zipcodes if provided
        if (locationData && zipcodes && zipcodes.length > 0) {
          // Clean zipcodes: remove duplicates, null values, and empty strings
          const cleanedZipcodes = Array.from(new Set(
            zipcodes
              .filter(zipcode => zipcode && zipcode.trim() !== '' && zipcode !== 'null' && zipcode !== 'NULL')
              .map(zipcode => zipcode.trim().toUpperCase())
          ));

          if (cleanedZipcodes.length > 0) {
            submitData.append('locationData', JSON.stringify({
              name: locationData.name,
              lat: locationData.lat,
              lng: locationData.lng,
              type: locationData.placeType || 'area',
              region: 'england',
              county: locationData.state || locationData.city || '',
              zipCode: locationData.zipCode
            }));
            submitData.append('zipcodes', JSON.stringify(cleanedZipcodes));
          }
        }

        const response = await axios.put(`${API_URL}/services/${selectedService.id}`, submitData, {
          headers: { 
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000, // 10 second timeout
        });

        const updatedService = response.data.data;
        setServiceData((prevData) =>
          prevData.map((item) => (item.id === updatedService.id ? updatedService : item))
        );
        setIsEditModalOpen(false);
        console.log("Service updated via backend with location data");
        return;
      }
    } catch (error) {
      console.warn("Failed to update service via backend, updating local state:", error);
      setUseBackend(false);
    }

    // Fallback to local state update
    try {
      if (!selectedService) return;
      
      const updatedService: Service = {
        ...selectedService,
        ...formData,
        id: selectedService.id, // Ensure id is preserved
        active: formData.active === "true", // Convert string to boolean
        image: formData.image instanceof File ? `/images/temp-${Date.now()}.jpg` : String(formData.image),
        icon: formData.icon instanceof File ? `/images/temp-icon-${Date.now()}.svg` : String(formData.icon),
      };
      
      setServiceData((prevData) =>
        prevData.map((item) => (item.id === updatedService.id ? updatedService : item))
      );
      setIsEditModalOpen(false);
      console.log("Service updated in local state");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteService = async (service: Service) => {
    if (confirm(`Are you sure you want to delete "${service.name}"?`)) {
      try {
        if (useBackend) {
          // Try to delete via backend
          await axios.delete(`${API_URL}/services/${service.id}`, {
            timeout: 10000, // 10 second timeout
          });
          console.log("Service deleted via backend");
        }
        
        // Remove from local state (works for both backend and local-only mode)
        setServiceData((prevData) => prevData.filter((item) => item.id !== service.id));
        
        // Adjust current page if necessary
        if (serviceData.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchServices(currentPage, perPage);
        }
      } catch (error) {
        console.warn("Failed to delete service via backend, removing from local state only:", error);
        setUseBackend(false);
        
        // Still remove from local state
        setServiceData((prevData) => prevData.filter((item) => item.id !== service.id));
        
        if (serviceData.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    }
  };

  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setIsViewModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div className="mb-6">
        <h4 className="p-3 text-xl font-semibold text-black">
          Service Management with Location Support
        </h4>
        <p className="px-3 text-sm text-gray-600 mt-1">
          Manage your services and add location availability. When creating or editing services, you can optionally add location data and zipcodes where the service is available. This helps customers find your services by postcode.
        </p>
        <div className="px-3 mt-2">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Location Search:</strong> When adding/editing services, use the location search to specify where your service is available. This will automatically fetch zipcodes for that area and allow customers to search by their postcode.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default">
        <div className="p-6">
        {isLoading ? (
          <TableSkeletonLoader columns={serviceColumns.length} rows={5} />
        ) : (
          <TableThree
            columns={serviceColumns}
            data={serviceData}
            pagination={{
              currentPage,
              totalPages,
              totalItems,
              perPage,
            }}
            onPageChange={handlePageChange}
            onAddClick={() => setIsAddModalOpen(true)}
            onViewClick={handleViewService}
            onEditClick={handleEditService}
            onDeleteClick={handleDeleteService}
            
          />
        )}

        {/* Add Service Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Service"
          width="max-w-6xl"
        >
          <ServiceFormWithLocation
            fields={serviceFormFields}
            onSubmit={handleAddServiceSubmit}
            submitButtonText="Add Service"
          />
        </Modal>

        {/* Edit Service Modal */}
        {selectedService && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title={`Edit Service: ${selectedService.name}`}
            width="max-w-6xl"
          >
            <ServiceFormWithLocation
              fields={serviceFormFields}
              initialValues={{
                ...selectedService,
                active: selectedService.active ? "true" : "false", // Convert boolean to string
              }}
              existingService={selectedService}
              onSubmit={handleEditServiceSubmit}
              submitButtonText="Update Service"
            />
          </Modal>
        )}

        {/* View Service Modal */}
        {selectedService && (
          <Modal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            title={`Service Details: ${selectedService.name}`}
            width="max-w-4xl"
          >
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-black block mb-1">Name:</span>
                    <span className="text-gray-600 ">{selectedService.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-black block mb-1">Slug:</span>
                    <span className="text-gray-600 ">{selectedService.slug}</span>
                  </div>
                  <div>
                    <span className="font-medium text-black block mb-1">Category:</span>
                    <span className="text-gray-600 ">{selectedService.category}</span>
                  </div>
                  {/* <div>
                    <span className="font-medium text-black block mb-1">Image:</span>
                    <span className="text-gray-600 ">{selectedService.image}</span>
                  </div>
                  <div>
                    <span className="font-medium text-black block mb-1">Icon:</span>
                    <span className="text-gray-600 ">{selectedService.icon}</span>
                  </div> */}
                  <div>
                    <span className="font-medium text-black block mb-1">Active:</span>
                    <span className={`px-2 py-1 rounded text-xs ${selectedService.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {selectedService.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-black block mb-1">Description:</span>
                    <p className="text-gray-600  text-sm">{selectedService.description}</p>
                  </div>
                  <div>
                    <span className="font-medium text-black block mb-1">Full Description:</span>
                    <p className="text-gray-600  text-sm">{selectedService.fullDescription}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-black block mb-1">Detailed Description:</span>
                  <p className="text-gray-600 text-sm">{selectedService.detailedDescription}</p>
                </div>
                <div>
                  <span className="font-medium text-black block mb-1">What Is:</span>
                  <p className="text-gray-600 text-sm">{selectedService.whatIs}</p>
                </div>
                <div>
                  <span className="font-medium text-black block mb-1">Typical Visit:</span>
                  <p className="text-gray-600 text-sm">{selectedService.typicalVisit}</p>
                </div>
                <div>
                  <span className="font-medium text-black block mb-1">Benefits:</span>
                  <p className="text-gray-600 text-sm">{selectedService.benefits}</p>
                </div>
                <div>
                  <span className="font-medium text-black block mb-1">Benefits Extended:</span>
                  <p className="text-gray-600 text-sm">{selectedService.benefitsExtended}</p>
                </div>
                <div>
                  <span className="font-medium text-black block mb-1">Getting Started:</span>
                  <p className="text-gray-600 text-sm">{selectedService.gettingStarted}</p>
                </div>
                
                {selectedService.services && selectedService.services.length > 0 && (
                  <div>
                    <span className="font-medium text-black block mb-2">Services:</span>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedService.services.map((service, index) => (
                        <li key={index} className="text-gray-600 text-sm">{service}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedService.gettingStartedPoints && selectedService.gettingStartedPoints.length > 0 && (
                  <div>
                    <span className="font-medium text-black block mb-2">Getting Started Points:</span>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedService.gettingStartedPoints.map((point, index) => (
                        <li key={index} className="text-gray-600 text-sm">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Location Information */}
                {selectedService.locationData && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <span className="font-medium text-blue-900 block mb-2">📍 Service Location:</span>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-blue-800">Name:</span>
                        <span className="text-blue-700 ml-2">{selectedService.locationData.name}</span>
                      </div>
                      {selectedService.locationData.address && (
                        <div>
                          <span className="font-medium text-blue-800">Address:</span>
                          <span className="text-blue-700 ml-2">{selectedService.locationData.address}</span>
                        </div>
                      )}
                      {selectedService.locationData.city && (
                        <div>
                          <span className="font-medium text-blue-800">City:</span>
                          <span className="text-blue-700 ml-2">{selectedService.locationData.city}</span>
                        </div>
                      )}
                      {selectedService.locationData.county && (
                        <div>
                          <span className="font-medium text-blue-800">County:</span>
                          <span className="text-blue-700 ml-2">{selectedService.locationData.county}</span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-blue-800">Coordinates:</span>
                        <span className="text-blue-700 ml-2">
                          {selectedService.locationData.lat}, {selectedService.locationData.lng}
                        </span>
                      </div>
                    </div>
                    
                    {selectedService.zipcodes && selectedService.zipcodes.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <span className="font-medium text-blue-900 block mb-2">
                          Available zipcodes ({selectedService.zipcodes.length}):
                        </span>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-1">
                          {selectedService.zipcodes.map((zipcode, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded text-center"
                            >
                              {zipcode}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {selectedService.stats && selectedService.stats.length > 0 && (
                  <div>
                    <span className="font-medium text-black block mb-2">Stats:</span>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedService.stats.map((stat, index) => (
                        <div key={index} className="p-3 border rounded">
                          <div className="text-lg font-bold text-primary">{stat.number}{stat.suffix}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal>
        )}
        </div>
      </div>
    </div>
  );
};

export default ServiceManagementSection;
