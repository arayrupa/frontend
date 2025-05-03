import { apiClient } from './config';

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async (tokenType = 'token') => {
  try {
    // Clear token from localStorage
   localStorage.removeItem(tokenType);
    // Optionally make an API call to invalidate the token on the server
    return await apiClient.get('/logout');
  } catch (error) {
    throw error;
  }
};