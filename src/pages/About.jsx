import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import Carousel from '../components/Carousel';

const About = () => {
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
      <AboutSection />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default About;
