import React from 'react';
import { getJobCategoryFilters } from '../api/jobs';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  'digital marketing': 'fa-mail-bulk',
  'bpo': 'fa-headset',
  'hospitality': 'fa-user-tie',
  'fintech': 'fa-tasks',
  'medical': 'fa-chart-line',
  'staffing': 'fa-hands-helping',
  'banking': 'fa-book-reader',
  'consulting': 'fa-drafting-compass',
  // Add more mappings as needed
};

// Add custom style for category items
const styles = {
  categoryItem: {
    cursor: 'pointer',
    display: 'block',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  categoryItemHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  },
};

const CategorySection = () => {
  const [categories, setCategories] = React.useState([]);
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const navigate = useNavigate();

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

  const handleJobClick = (id) => {
    navigate('/job-list', { state: { industry: id } });
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Explore By Category</h1>
        <div className="row g-4">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="col-lg-3 col-sm-6 wow fadeInUp" 
              data-wow-delay={`${0.1 + index * 0.2}s`}
            >
              <div 
                className="cat-item rounded p-4"
                onClick={() => handleJobClick(category.id)}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  ...styles.categoryItem,
                  ...(hoveredItem === index ? styles.categoryItemHover : {}),
                  cursor: 'pointer',
                  height: '100%',
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleJobClick(category.id)}
              >
                <i className={`fa fa-3x ${category.icon} text-primary mb-4`}></i>
                <h6 className="mb-3">{category.label}</h6>
                <p className="mb-0">{category.vacancies} Vacancy{category.vacancies !== 1 ? 'ies' : ''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
