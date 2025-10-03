/**
 * Service Types for On-Call Care Platform
 * 
 * API Endpoint: GET /all-services
 * Expected Response Format:
 * {
 *   "data": Service[],
 *   "message": "string (optional)"
 * }
 */

// Service types for API responses
export interface Service {
  id: string;
  name: string;
  description?: string;
  slug: string;
  category: 'home-care' | 'specialist-care';
  icon?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceResponse {
  data: Service[];
  message?: string;
}
