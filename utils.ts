import { format } from 'date-fns';

// Function to convert date string to ISO format
export const convertToDateISOString = (dateString: string) => format(new Date(dateString), 'dd/MM/yyyy');