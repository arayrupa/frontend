import React from 'react';

const CategorySection = () => {
  const categories = [
    { icon: 'fa-mail-bulk', title: 'Marketing', vacancies: 123 },
    { icon: 'fa-headset', title: 'Customer Service', vacancies: 123 },
    { icon: 'fa-user-tie', title: 'Human Resource', vacancies: 123 },
    { icon: 'fa-tasks', title: 'Project Management', vacancies: 123 },
    { icon: 'fa-chart-line', title: 'Business Development', vacancies: 123 },
    { icon: 'fa-hands-helping', title: 'Sales & Communication', vacancies: 123 },
    { icon: 'fa-book-reader', title: 'Teaching & Education', vacancies: 123 },
    { icon: 'fa-drafting-compass', title: 'Design & Creative', vacancies: 123 }
  ];
  
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Explore By Category</h1>
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={index} className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.2}s`}>
              <a className="cat-item rounded p-4" href="">
                <i className={`fa fa-3x ${category.icon} text-primary mb-4`}></i>
                <h6 className="mb-3">{category.title}</h6>
                <p className="mb-0">{category.vacancies} Vacancy</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;