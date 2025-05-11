import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { masterFilters } from '../api/jobs';

const SearchBar = ({ onSearch }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState({
    skills: false,
    cities: false
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(prev => ({ ...prev, skills: true }));
        const response = await masterFilters('skills');
        const formattedSkills = response?.data?.skills?.map(skill => ({
          value: skill.value,
          label: skill.label
        })) || [];
        setSkills(formattedSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(prev => ({ ...prev, skills: false }));
      }
    };

    const fetchCities = async () => {
      try {
        setLoading(prev => ({ ...prev, cities: true }));
        const response = await masterFilters('cities');
        const formattedCities = response?.data?.cities?.map(city => ({
          value: city.value,
          label: city.label
        })) || [];
        setCities(formattedCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(prev => ({ ...prev, cities: false }));
      }
    };

    fetchSkills();
    fetchCities();
  }, []);

  const handleSearch = () => {
    const filters = {
      jobTitle,
      skills: selectedSkills.map(skill => skill.value),
      cities: selectedCities.map(city => city.value)
    };
    // onSearch(filters)
  };

  const themeColors = {
    primary: '#00B14F',
    primaryLight: '#E8F5E9',
    dark: '#1A1A1A',
    light: '#F8F9FA',
    gray: '#6C757D',
    danger: '#DC3545'
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      border: `1px solid ${state.isFocused ? themeColors.primary : '#dee2e6'}`,
      borderRadius: '6px',
      boxShadow: state.isFocused ? `0 0 0 0.2rem ${themeColors.primary}40` : 'none',
      minHeight: '48px',
      '&:hover': {
        borderColor: state.isFocused ? themeColors.primary : '#adb5bd'
      },
      transition: 'all 0.2s ease'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? themeColors.primary 
        : state.isFocused 
          ? themeColors.primaryLight 
          : 'white',
      color: state.isSelected ? 'white' : themeColors.dark,
      '&:active': {
        backgroundColor: themeColors.primary,
        color: 'white'
      },
      padding: '8px 12px',
      fontSize: '0.9rem',
      fontWeight: state.isSelected ? '500' : '400'
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '6px',
      border: '1px solid #dee2e6',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      zIndex: 9999
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: themeColors.primaryLight,
      borderRadius: '4px',
      padding: '2px 6px',
      margin: '4px',
      maxWidth: '200px',
      alignItems: 'center'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: themeColors.primary,
      fontWeight: '500',
      fontSize: '0.85rem',
      padding: '0',
      paddingRight: '4px'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: themeColors.primary,
      padding: '0 4px',
      '&:hover': {
        backgroundColor: 'transparent',
        color: themeColors.danger
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: themeColors.gray,
      fontSize: '0.9rem'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: themeColors.gray,
      '&:hover': {
        color: themeColors.primary
      }
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: themeColors.gray,
      '&:hover': {
        color: themeColors.danger
      }
    })
  };

  const searchButtonStyles = {
    height: '48px',
    backgroundColor: themeColors.primary,
    border: 'none',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#008a3c',
      transform: 'translateY(-1px)'
    },
    '&:active': {
      transform: 'translateY(0)'
    },
    '&:disabled': {
      backgroundColor: `${themeColors.primary}80`,
      cursor: 'not-allowed'
    }
  };

  return (
    <div className="container-fluid bg-white py-4 mb-5 wow fadeIn" 
         data-wow-delay="0.1s" 
         style={{ 
           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
           borderRadius: '8px',
           border: '1px solid #e9ecef',
           marginTop: '-50px',
           position: 'relative',
           zIndex: 10
         }}>
      <div className="container">
        <div className="row g-3">
          <div className="col-lg-10">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="position-relative">
                  <input 
                    type="text" 
                    className="form-control form-control-lg border-2" 
                    placeholder="Job title, keywords, or company"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    style={{
                      height: '48px',
                      borderRadius: '6px',
                      borderColor: '#dee2e6',
                      paddingLeft: '40px',
                      fontSize: '0.95rem'
                    }}
                  />
                  <i className="fas fa-search position-absolute" 
                     style={{
                       top: '50%',
                       left: '15px',
                       transform: 'translateY(-50%)',
                       color: themeColors.gray
                     }}></i>
                </div>
              </div>
              <div className="col-md-3">
                <Select
                  isMulti
                  options={skills}
                  isLoading={loading.skills}
                  loadingMessage={() => 'Loading skills...'}
                  placeholder={
                    <div className="d-flex align-items-center">
                      <i className="fas fa-tools me-2" style={{ color: themeColors.gray }}></i>
                      <span>Select Skills</span>
                    </div>
                  }
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={customStyles}
                  value={selectedSkills}
                  onChange={setSelectedSkills}
                  noOptionsMessage={() => 'No skills found'}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
              </div>
              <div className="col-md-3">
                <Select
                  isMulti
                  options={cities}
                  isLoading={loading.cities}
                  loadingMessage={() => 'Loading locations...'}
                  placeholder={
                    <div className="d-flex align-items-center">
                      <i className="fas fa-map-marker-alt me-2" style={{ color: themeColors.gray }}></i>
                      <span>Select Locations</span>
                    </div>
                  }
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={customStyles}
                  value={selectedCities}
                  onChange={setSelectedCities}
                  noOptionsMessage={() => 'No locations found'}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
              </div>
              <div className="col-md-2 d-flex">
                <button 
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                  onClick={handleSearch}
                  disabled={loading.skills || loading.cities}
                  style={searchButtonStyles}
                >
                  {loading.skills || loading.cities ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search me-2"></i>
                      <span>Search</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;