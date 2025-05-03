import { apiClient } from './config';

export const getJobs = async (params = {}) => {
  try {
    const response = await apiClient.post('/admin_job_listing', { params });
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
    console.log("jobData:", jobData);
    const response = await apiClient.post('/create-job', jobData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateJob = async (id, jobData) => {
  try {
    const response = await apiClient.put(`/jobs/${id}`, jobData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await apiClient.delete(`/jobs/${id}`);
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