import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import JobDetailSection from '../components/JobDetailSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { getJobDetail } from '../api/jobs';

const JobDetail = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState(null);

  useEffect(() => {
    console.log("jobDetail aaa", jobDetail);
    console.log("location.state?.id", location.state?.id);
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        const response = await getJobDetail({ id: location.state?.id });
        setJobDetail(response?.data?.data);
      } catch (error) {
        console.error('Failed to fetch job detail:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (location.state?.id) {
      fetchJobDetail();
    }
  }, [location.state?.id]);

  return (
    <div className="container-xxl bg-white p-0">
      {loading && <Spinner />}
      <Navbar />
      <JobDetailSection jobDetail={jobDetail} />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default JobDetail;
