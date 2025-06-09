import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import debounce from 'lodash/debounce';
import { skillDropdown, citiesDropDown } from '../api/jobs';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate()
  const [jobTitle, setJobTitle] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedCities, setSelectedCities] = useState([])
  const [skills, setSkills] = useState([])
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState({ skills: false, cities: false })

  const debouncedFetchSkills = useCallback(
    debounce(async (input = '') => {
      try {
        setLoading((prev) => ({ ...prev, skills: true }));
        const res = await skillDropdown(input);
        const fetchedSkills = Array.isArray(res?.data?.skills) ? res.data.skills : [];
        setSkills(fetchedSkills);
      } catch (error) {
        console.error('Skill fetch failed:', error);
        setSkills([]);
      } finally {
        setLoading((prev) => ({ ...prev, skills: false }));
      }
    }, 300),
    []
  );

  const debouncedFetchCities = useCallback(
    debounce(async (input = '') => {
      try {
        setLoading((prev) => ({ ...prev, cities: true }));
        const res = await citiesDropDown(input);
        const fetchedCities = Array.isArray(res?.data?.cities) ? res.data.cities : [];
        setCities(fetchedCities);
      } catch (error) {
        console.error('City fetch failed:', error);
        setCities([]);
      } finally {
        setLoading((prev) => ({ ...prev, cities: false }));
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetchSkills('');
    debouncedFetchCities('');
    return () => {
      debouncedFetchSkills.cancel();
      debouncedFetchCities.cancel();
    };
  }, []);

  const handleSearch = () => {
    const searchData = {
      jobTitle,
      skills: selectedSkills?.map((s) => s.value),
      cities: selectedCities?.map((c) => c.value),
    };
    navigate('/job-list', { state: { searchData } });
  };

  const themeColors = {
    primary: '#00B14F',
    primaryLight: '#E8F5E9',
    dark: '#1A1A1A',
    gray: '#6C757D',
    danger: '#DC3545',
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? themeColors.primary : '#dee2e6',
      boxShadow: state.isFocused ? `0 0 0 0.2rem ${themeColors.primary}40` : 'none',
      minHeight: '48px',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? themeColors.primary
        : state.isFocused
        ? themeColors.primaryLight
        : 'white',
      color: state.isSelected ? 'white' : themeColors.dark,
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: themeColors.primaryLight,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: themeColors.primary,
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: themeColors.primary,
      '&:hover': {
        color: themeColors.danger,
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: themeColors.gray,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: themeColors.gray,
      '&:hover': {
        color: themeColors.primary,
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: themeColors.gray,
      '&:hover': {
        color: themeColors.danger,
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 10,
    }),
  };

  return (
    <div className="container-fluid bg-white py-4 mb-5" style={{ borderRadius: '8px', border: '1px solid #e9ecef' }}>
      <div className="container">
        <div className="row g-3">
          <div className="col-lg-10">
            <div className="row g-3">
              <div className="col-md-4">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Job title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    style={{
                      height: '48px',
                      borderRadius: '6px',
                      paddingLeft: '40px',
                      fontSize: '0.95rem',
                    }}
                  />
                  <i
                    className="fas fa-search position-absolute"
                    style={{
                      top: '50%',
                      left: '15px',
                      transform: 'translateY(-50%)',
                      color: themeColors.gray,
                    }}
                  ></i>
                </div>
              </div>

              <div className="col-md-3">
                <Select
                  isMulti
                  value={selectedSkills}
                  options={skills}
                  onChange={(selectedOptions) => {
                    setSelectedSkills(selectedOptions || []);
                  }}
                  onInputChange={(input) => {
                    if (input) {
                      debouncedFetchSkills(input);
                    }
                  }}
                  isLoading={loading.skills}
                  styles={customStyles}
                  placeholder={<span><i className="fas fa-tools me-2"></i>Select Skills</span>}
                  noOptionsMessage={() => 'No skills found'}
                  getOptionValue={option => option.value}
                  getOptionLabel={option => option.label}
                  filterOption={(option, rawInput) => {
                    if (!rawInput) return true;
                    const label = String(option.label || '').toLowerCase();
                    return label.includes(rawInput.toLowerCase());
                  }}
                />
              </div>

              <div className="col-md-3">
                <Select
                  isMulti
                  value={selectedCities}
                  options={cities}
                  onChange={(selectedOptions) => {
                    setSelectedCities(selectedOptions || []);
                  }}
                  onInputChange={(input) => {
                    if (input) {
                      debouncedFetchCities(input);
                    }
                  }}
                  isLoading={loading.cities}
                  styles={customStyles}
                  placeholder={<span><i className="fas fa-map-marker-alt me-2"></i>Select Locations</span>}
                  noOptionsMessage={() => 'No locations found'}
                  getOptionValue={option => option.value}
                  getOptionLabel={option => option.label}
                  filterOption={(option, rawInput) => {
                    if (!rawInput) return true;
                    const label = String(option.label || '').toLowerCase();
                    return label.includes(rawInput.toLowerCase());
                  }}
                />
              </div>

              <div className="col-md-2 d-flex">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleSearch}
                  disabled={loading.skills || loading.cities}
                  style={{ height: '48px' }}
                >
                  {loading.skills || loading.cities ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Searching...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search me-2"></i>Search
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
