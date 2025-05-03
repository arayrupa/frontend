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
              <h1 className="mb-4">We Help To Get The Best Job And Find A Talent</h1>
              <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit...</p>
              <p><i className="fa fa-check text-primary me-3"></i>Tempor erat elitr rebum at clita</p>
              <p><i className="fa fa-check text-primary me-3"></i>Aliqu diam amet diam et eos</p>
              <p><i className="fa fa-check text-primary me-3"></i>Clita duo justo magna dolore erat amet</p>
              <a className="btn btn-primary py-3 px-5 mt-3" href="#">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
