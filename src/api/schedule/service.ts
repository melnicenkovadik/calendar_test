import axios from 'axios';

interface Schedule {
    id: string;
    title: string;
    start: string;
    end: string;
    price: number;
}

interface SchedulesResponse {
    response: Schedule[];
    error: boolean;
    responseMessage: string;
    fields: string[];
}

interface ScheduledEventPayload {
    orgId: string;
    instructorId?: string;
    serviceId?: string;
    dateBegin?: string;
    dateEnd?: string;
    packageId?: string;
}

interface AvailableDatesDto {
    orgId: string;
    instructorId?: string;
    serviceId?: string;
    startDate: string;
    endDate: string;
}

interface AvailableDatesResponse {
    response: string[];
    error: boolean;
    responseMessage: string;
}

// Base URL for the API
const API_BASE_URL = '://your-api-url.com'; // Replace with your API base URL

// Create an instance of axios with default settings
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Service methods
export const apiService = {
    // Fetch schedules
    fetchSchedules: async (payload: ScheduledEventPayload): Promise<SchedulesResponse> => {
        try {
            const response = await api.post<SchedulesResponse>('/api/public/schedule/events', payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching schedules:', error);
            throw error;
        }
    },

    // Fetch available dates
    fetchAvailableDates: async (payload: AvailableDatesDto): Promise<AvailableDatesResponse> => {
        try {
            const response = await api.post<AvailableDatesResponse>('/api/public/schedule/available-dates', payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching available dates:', error);
            throw error;
        }
    },
};
