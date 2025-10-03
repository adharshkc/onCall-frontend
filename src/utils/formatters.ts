export const formatDate = (date: string | Date): string => {
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString(undefined, { 
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid Date'; 
    }
  };