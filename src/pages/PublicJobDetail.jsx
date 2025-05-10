import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobDetailSection from '../components/JobDetailSection';

const PublicJobDetail = () => {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/jobs/public/${id}`);
      const data = await response.json();
      setJobDetail(data.job);
    } catch (error) {
      console.error('Error fetching job detail:', error);
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

  return (
    <div className="container-xxl bg-white p-0">
      <div className="container">
        {jobDetail && (
          <JobDetailSection jobDetail={jobDetail} />
        )}
      </div>
    </div>
  );
};

export default PublicJobDetail;
