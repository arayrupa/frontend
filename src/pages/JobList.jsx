import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import JobsSection from '../components/JobsSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const JobList = () => {
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
      <JobsSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default JobList;
