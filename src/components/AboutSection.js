import React from 'react';
import { Link } from 'react-router-dom';
const AboutSection = () => {
  return (
    <>
      <div class="container-xxl py-5 bg-dark page-header mb-5">
        <div class="container my-5 pt-5 pb-4">
          <h1 class="display-3 text-white mb-3 animated slideInDown">About Us</h1>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb text-uppercase">
              <Link to="/" class="breadcrumb-item">Home</Link>
              <Link class="breadcrumb-item text-white active" aria-current="page">About</Link>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="row g-0 about-bg rounded overflow-hidden">
                <div className="col-6 text-start">
                  <img className="img-fluid w-100" src="/img/about-1.jpg" alt="about 1" />
                </div>
                <div className="col-6 text-start">
                  <img className="img-fluid" src="/img/about-2.jpg" alt="about 2" style={{ width: '85%', marginTop: '15%' }} />
                </div>
                <div className="col-6 text-end">
                  <img className="img-fluid" src="/img/about-3.jpg" alt="about 3" style={{ width: '85%' }} />
                </div>
                <div className="col-6 text-end">
                  <img className="img-fluid w-100" src="/img/about-4.jpg" alt="about 4" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h2 className="mb-4">We Help To Get The Best Job And Find A Talent</h2>
              <p className="mb-4">Welcome to Skillarion your partner in career growth and professional development.</p>
              <p><i className="fa fa-check text-primary me-3"></i>A dynamic platform dedicated to bridging gap between opportunity and talent.
            </p>
              <p><i className="fa fa-check text-primary me-3"></i>Whether you're seeking your next big role, striving to upgrade your skill set</p>
              <p><i className="fa fa-check text-primary me-3"></i>we provide the tools and resources to help you move forward with confidence.</p>
            </div>
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h2 className="mb-4">Why Choose SkillArion?</h2>
              <p>
                <i className="fa fa-check text-primary me-3"></i>Trusted by growing professionals.
            </p>
            <p>
                <i className="fa fa-check text-primary me-3"></i>Real-time updates with new opportunities.
            </p>
            <p>
                <i className="fa fa-check text-primary me-3"></i>Secure and data-driven platform.
            </p>
            <p>
                <i className="fa fa-check text-primary me-3"></i>Committed support & continuous innovation.
            </p>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h2 className="mb-4">"Our Mission"</h2>
              <p><i className="fa fa-check text-primary me-3"></i>To empower individuals by connecting them with the right job opportunities and offering relevant skill-enhancement resources that foster long-term success.
            </p>
            </div>
             <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h2 className="mb-4">Join Us</h2>
              <p><i className="fa fa-check text-primary me-3"></i>Whether you're starting your career, seeking your next big challenge,
            </p>
            <p><i className="fa fa-check text-primary me-3"></i>SkillArion is here to support you every step of way.
            </p>
            <p><i className="fa fa-check text-primary me-3"></i>Join our community and take the next step toward your professional goals.
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
