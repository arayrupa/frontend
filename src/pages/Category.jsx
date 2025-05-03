import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import CategorySection from '../components/CategorySection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const Category = () => {
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
      <CategorySection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Category;
