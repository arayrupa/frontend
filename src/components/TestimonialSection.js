import React, { useEffect } from 'react';

const TestimonialSection = () => {
  const testimonials = [
    {
      content: "SkillArion helped me land my dream job within just two weeks! The platform is easy to navigate and offers high-quality listings from trusted companies",
      image: "/img/testimonial-1.jpg",
      name: "Priya Sharma",
      profession: "Software Developer at TechNova"
    },
    {
      content: "We’ve hired three exceptional candidates using SkillArion. It has saved us time and simplified our hiring process significantly",
      image: "/img/testimonial-2.jpg",
      name: "Rajeev Mehta",
      profession: "HR Manager at BrightFuture Solutions"
    },
    {
      content: "What I love about SkillArion is the personalized job alerts. I never miss out on opportunities that match my profile",
      image: "/img/testimonial-3.jpg",
      name: "Rohit Das",
      profession: "Marketing Executive"
    }
  ];

  useEffect(() => {
    const $ = window.$;
    if ($) {
      $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        margin: 30,
        nav: false,
        dots: true,
        loop: true,
        responsive: {
          0: {
            items: 1
          },
          576: {
            items: 1
          },
          768: {
            items: 2
          },
          992: {
            items: 3
          }
        }
      });
    }
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Testimonial</h6>
          <h1 className="mb-5">Our Clients Say!</h1>
        </div>
        <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item position-relative bg-white rounded overflow-hidden">
              <div className="p-6">
                <i className="fa fa-quote-left fa-2x text-primary mb-4"></i>
                <p>{testimonial.content}</p>
                <div className="d-flex align-items-center">
                  <img className="img-fluid flex-shrink-0 rounded" src={testimonial.image} style={{ width: '55px', height: '55px' }} alt="" />
                  <div className="ps-4">
                    <h5 className="mb-1">{testimonial.name}</h5>
                    <small>{testimonial.profession}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;