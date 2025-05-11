import React from 'react';
import { getJobCategoryFilters } from '../api/jobs';

const iconMap = {
  'digital marketing': 'fa-mail-bulk',
  'bpo': 'fa-headset',
  'hospitality': 'fa-user-tie',
  'it-hardware': 'fa-tasks',
  'medical': 'fa-chart-line',
  'staffing': 'fa-hands-helping',
  'education': 'fa-book-reader',
  'consulting': 'fa-drafting-compass',
  // Add more mappings as needed
};

const CategorySection = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getJobCategoryFilters();
        const industryList = response?.data?.industries?.industryList || [];


        const formattedCategories = industryList
          .filter(item => iconMap[item.label?.toLowerCase()])
          .map(item => {
            const normalizedLabel = item.label?.toLowerCase();
            return {
              id: item.value,
              label: item.label,
              vacancies: item.vacancies || 0,
              icon: iconMap[normalizedLabel]
            };
          });

        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Explore By Category</h1>
        <div className="row g-4">
          {categories.map((category, index) => (
            <div key={index} className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay={`${0.1 + index * 0.2}s`}>
              <a className="cat-item rounded p-4" href={`/job-list`}>
                <i className={`fa fa-3x ${category.icon} text-primary mb-4`}></i>
                <h6 className="mb-3">{category.label}</h6>
                <p className="mb-0">{category.vacancies} Vacancy{category.vacancies !== 1 ? 'ies' : ''}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
