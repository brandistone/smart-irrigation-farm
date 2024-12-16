import axios from 'axios';

// Create an axios instance with base configuration
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',  // Your Django backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});



// User Profile Service
export const UserProfileService = {
    // Create User Profile
    createProfile: async (userData: {
        name: string, 
        email: string, 
        phone: string
    }) => {
        try {
            const response = await apiClient.post('/profile/', userData);
            return response.data;
        } catch (error) {
            console.error('Error creating profile:', error);
            throw error;
        }
    },

    // Update User Profile
    updateProfile: async (profileId: number, userData: {
        name?: string, 
        email?: string, 
        phone?: string
    }) => {
        try {
            const response = await apiClient.patch(`/profile/${profileId}/`, userData);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    // Get User Profile
    getProfile: async (profileId: number) => {
        try {
            const response = await apiClient.get(`/profile/${profileId}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    }
};