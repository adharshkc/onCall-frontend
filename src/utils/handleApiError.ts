import api from "@/lib/api";
import { isAxiosError } from "axios";

export const handleApiError = (error: any) => {
    console.error("API Error:", error);
    if (isAxiosError(error)) {
      const status = error.response?.status || 500;
      const backendMessage = error.response?.data?.message || 'Unknown error occurred';
      let errorDetails = error.response?.data?.error;
      
      // Process error details
      if (Array.isArray(errorDetails)) {
        errorDetails = errorDetails.map((e: any) => e.message).join(', ');
      } else if (typeof errorDetails === 'object' && errorDetails !== null) {
        errorDetails = JSON.stringify(errorDetails);
      }
      
      const fullMessage = `${backendMessage}${errorDetails ? `: ${errorDetails}` : ''}`;
      window.location.href = `/admin/error?status=${status}&message=${encodeURIComponent(fullMessage)}`;
    } else {
      window.location.href = `/admin/error?status=500&message=${encodeURIComponent('Unknown error occurred')}`;
    }
  };