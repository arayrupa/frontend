import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobDetailSection from '../components/JobDetailSection';
import { getJobDetail } from '../api/jobs';
import { decryptId } from '../utils/encryption';

const PublicJobDetail = () => {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      // Clean the ID in case it has any path segments
      const cleanId = id.split('/')[0];
      const decryptedId = decryptId(cleanId);
      
      if (!decryptedId) {
        throw new Error('Invalid job ID');
      }

      const response = await getJobDetail({id: decryptedId});
      const data = response?.data?.data;
      setJobDetail(data);
    } catch (error) {
      console.error('Error fetching job detail:', error);
      setError('Failed to load job details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container-xxl bg-white p-0">
        <div className="container">
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-xxl bg-white p-0">
        <div className="container">
          <div className="alert alert-danger my-5" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-xxl bg-white p-0">
      <div className="container">
        {jobDetail ? (
          <JobDetailSection jobDetail={jobDetail} />
        ) : (
          <div className="text-center my-5">
            <h3>Job not found</h3>
            <p>The requested job could not be found or has been removed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicJobDetail;
