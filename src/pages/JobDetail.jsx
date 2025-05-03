import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import JobDetailSection from '../components/JobDetailSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const JobDetail = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container-xxl bg-white p-0">
      {loading && <Spinner />}
      <Navbar />
      <JobDetailSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default JobDetail;
