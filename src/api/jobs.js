import { apiClient } from './config';

export const getJobs = async (params = {}) => {
  try {
    const response = await apiClient.post('/admin_job_listing', { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getJobDetail = async (params = {}) => {
  try {
    const response = await apiClient.post('/job_details', { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getJob = async (id) => {
  try {
    const response = await apiClient.get(`/jobs/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await apiClient.post('/create-job', jobData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const response = await apiClient.put(`/update-job/${id}`, jobData);
    return response;
  } catch (error) {
    throw error;
  }
}

export const deleteJob = async (id) => {
  try {
    const response = await apiClient.delete(`/jobs/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const activeInactiveJob = async (id, status) => {
  try {
    const response = await apiClient.post(`/active-inactive-job/${id}`, { status });
    return response;
  } catch (error) {
    throw error;
  }
};

export const masterFilters = async (query) => {
  try {
    const response = await apiClient.get('/master_filters', { params: { query } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const skillDropdown = async (search) => {
  try {
    const response = await apiClient.post('/skill-dropdown', {search});
    return response;
  } catch (error) {
    throw error;
  }
};

export const citiesDropDown = async (search) => {
  try {
    const response = await apiClient.post('/cities-dropdown', {search});
    return response;
  } catch (error) {
    throw error;
  }
};

export const getJobCategoryFilters = async () => {
  try {
    const response = await apiClient.get('/category_filters');
    return response.data;
  } catch (error) {
    throw error;
  }
};
