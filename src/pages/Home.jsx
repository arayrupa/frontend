import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Carousel from '../components/Carousel';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import JobsSection from '../components/JobsSection';
import TestimonialSection from '../components/TestimonialSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const App = () => {
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
      <Carousel />
      <SearchBar />
      <CategorySection />
      <JobsSection />
      <TestimonialSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
