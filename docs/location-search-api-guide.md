# Location Search API Integration Guide

This document describes the API endpoints required for the location search functionality in the LocationSearchSection component.

## Required API Endpoints

### 1. Location Search Suggestions
**Endpoint:** `GET /api/locations/search`

**Description:** Returns location suggestions based on search query

**Query Parameters:**
- `q` (required): Search query string (minimum 2 characters)
- `limit` (optional): Maximum number of suggestions to return (default: 10)

**Expected Response Format:**
```json
{
  "data": [
    {
      "id": "unique-location-id",
      "name": "Location Name or Place Name",
      "address": "123 Main Street",
      "city": "City Name",
      "state": "State Abbreviation",
      "zipCode": "12345",
      "lat": 40.7128,  // Optional: Latitude for map integration
      "lng": -74.0060  // Optional: Longitude for map integration
    }
  ]
}
```

**Example Request:**
```
GET /api/locations/search?q=new york&limit=5
```

### 2. Add New Location
**Endpoint:** `POST /api/locations`

**Description:** Adds a new location to the system

**Request Body:**
```json
{
  "name": "Location Name",
  "address": "123 Main Street",
  "city": "City Name",
  "state": "State Abbreviation",
  "zipCode": "12345",
  "lat": 40.7128,  // Optional: Latitude
  "lng": -74.0060  // Optional: Longitude
}
```

**Expected Response Format:**
```json
{
  "data": {
    "id": "newly-created-location-id",
    "name": "Location Name",
    "address": "123 Main Street",
    "city": "City Name",
    "state": "State Abbreviation",
    "zipCode": "12345",
    "lat": 40.7128,
    "lng": -74.0060,
    "createdAt": "2025-09-20T10:30:00.000Z"
  }
}
```

**Example Request:**
```
POST /api/locations
Content-Type: application/json

{
  "name": "Downtown Medical Center",
  "address": "123 Healthcare Blvd",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "lat": 40.7128,
  "lng": -74.0060
}
```

### 3. Provider Search by Location
**Endpoint:** `GET /api/providers/location`

**Description:** Returns service providers in a specific location

**Query Parameters:**
- `city` (required): City name
- `state` (required): State abbreviation
- `zipCode` (optional): ZIP code for more precise results
- `lat` (optional): Latitude coordinate
- `lng` (optional): Longitude coordinate
- `serviceType` (optional): Filter by service type
- `availability` (optional): Filter by availability status
- `page` (optional): Page number for pagination (default: 1)
- `per_page` (optional): Items per page (default: 10)

**Expected Response Format:**
```json
{
  "data": [
    {
      "id": "provider-id",
      "name": "Provider Name",
      "address": "Provider Address",
      "city": "City",
      "state": "State",
      "zipCode": "ZIP",
      "serviceType": "Home Care|Specialist Care",
      "availability": "Available|Busy",
      "contactNumber": "+1-555-0123"
    }
  ],
  "meta": {
    "total": 100,
    "totalPages": 10,
    "currentPage": 1,
    "perPage": 10
  }
}
```

**Example Request:**
```
GET /api/providers/location?city=New York&state=NY&serviceType=Home Care&page=1&per_page=10
```

## Implementation Notes

### Frontend Features
- **Debounced Search**: Location search is debounced with a 300ms delay to prevent excessive API calls
- **Autocomplete UI**: Dropdown suggestions appear as user types
- **Error Handling**: Graceful fallback to mock data if API is unavailable
- **Loading States**: Visual indicators during API requests

### AdonisJS Backend Suggestions

#### 1. Location Search Controller
```typescript
// app/Controllers/Http/LocationsController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LocationsController {
  public async search({ request, response }: HttpContextContract) {
    const { q, limit = 10 } = request.qs()
    
    if (!q || q.length < 2) {
      return response.badRequest({ message: 'Query must be at least 2 characters' })
    }

    try {
      // Your location search logic here
      // This could query a database, external API, or geocoding service
      const locations = await YourLocationService.search(q, limit)
      
      return response.json({
        data: locations
      })
    } catch (error) {
      return response.internalServerError({ 
        message: 'Failed to search locations' 
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const locationData = request.only([
        'name',
        'address', 
        'city',
        'state',
        'zipCode',
        'lat',
        'lng'
      ])

      // Validate required fields
      if (!locationData.name) {
        return response.badRequest({ 
          message: 'Location name is required' 
        })
      }

      // Your location creation logic here
      const newLocation = await YourLocationService.create(locationData)
      
      return response.status(201).json({
        data: newLocation
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to create location'
      })
    }
  }
}
```

#### 2. Providers Controller
```typescript
// app/Controllers/Http/ProvidersController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProvidersController {
  public async findByLocation({ request, response }: HttpContextContract) {
    const { 
      city, 
      state, 
      zipCode, 
      lat, 
      lng, 
      serviceType, 
      availability,
      page = 1,
      per_page = 10 
    } = request.qs()

    if (!city || !state) {
      return response.badRequest({ 
        message: 'City and state are required' 
      })
    }

    try {
      // Your provider search logic here
      const providers = await YourProviderService.findByLocation({
        city,
        state,
        zipCode,
        lat,
        lng,
        serviceType,
        availability,
        page: Number(page),
        perPage: Number(per_page)
      })

      return response.json({
        data: providers.data,
        meta: {
          total: providers.total,
          totalPages: Math.ceil(providers.total / Number(per_page)),
          currentPage: Number(page),
          perPage: Number(per_page)
        }
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch providers'
      })
    }
  }
}
```

#### 3. Routes
```typescript
// start/routes.ts
Route.group(() => {
  Route.get('/locations/search', 'LocationsController.search')
  Route.post('/locations', 'LocationsController.store')
  Route.get('/providers/location', 'ProvidersController.findByLocation')
}).prefix('/api')
```

## Testing the Integration

1. Start your AdonisJS backend server
2. Use the frontend component to search for locations
3. Check browser developer tools for API requests
4. Verify the response format matches the expected structure

## Error Handling

The frontend component includes comprehensive error handling:
- Invalid queries (< 2 characters) are handled client-side
- API timeout and network errors show user-friendly messages
- Fallback to mock data ensures the component remains functional

## Security Considerations

- Implement rate limiting on search endpoints
- Validate and sanitize all query parameters
- Consider implementing API authentication if needed
- Use HTTPS in production
