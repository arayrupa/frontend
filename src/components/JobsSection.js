import React, { useState, useEffect } from 'react';
import JobItem from './JobItem';
import { getJobs } from '../api/jobs';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

const JobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tab-all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modeWork, setModeWork] = useState('');
  const jobsPerPage = 10;
  
  const fetchJobs = async (pageNumber = 1, modeWork) => {
    try {
      setLoading(true);
      const response = await getJobs({ 
        page: pageNumber, 
        mode_work: modeWork,
        limit: jobsPerPage,
      });
      setJobs(response?.data?.jobList?.jobList || []);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs(page, modeWork);
  }, [page, modeWork]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleTabChange = (mode) => { 
    setModeWork(mode);
    setPage(1);
    fetchJobs(1, mode);
    setActiveTab(`tab-${mode===""?"all":mode}`);
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>
        <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
          <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
            <li className="nav-item">
              <a
                className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${activeTab === 'tab-all' ? 'active' : ''}`}
                onClick={() => handleTabChange('')}
                href="#"
              >
                <h6 className="mt-n1 mb-0">All</h6>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${activeTab === 'tab-onsite' ? 'active' : ''}`}
                onClick={() => handleTabChange('onsite')}
                href="#"
              >
                <h6 className="mt-n1 mb-0">Onsite</h6>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`d-flex align-items-center text-start mx-3 pb-3 ${activeTab === 'tab-hybrid' ? 'active' : ''}`}
                onClick={() => handleTabChange('hybrid')}
                href="#"
              >
                <h6 className="mt-n1 mb-0">Hybrid</h6>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`d-flex align-items-center text-start mx-3 pb-3 ${activeTab === 'tab-wfh' ? 'active' : ''}`}
                onClick={() => handleTabChange('wfh')}
                href="#"
              >
                <h6 className="mt-n1 mb-0">Work From Home</h6>
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div id="tab-all" className={`tab-pane fade show p-0 ${activeTab === 'tab-all' ? 'active' : ''}`}>
              {jobs?.map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
              <div className="text-center mt-4">
                <Stack spacing={2} alignItems="center">
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Stack>
              </div>
            </div>
            <div id="tab-onsite" className={`tab-pane fade show p-0 ${activeTab === 'tab-onsite' ? 'active' : ''}`}>
              {jobs?.map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
              <div className="text-center mt-4">
                <Stack spacing={2} alignItems="center">
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Stack>
              </div>
            </div>
            <div id="tab-hybrid" className={`tab-pane fade show p-0 ${activeTab === 'tab-hybrid' ? 'active' : ''}`}>
              {jobs?.map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
              <div className="text-center mt-4">
                <Stack spacing={2} alignItems="center">
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Stack>
              </div>
            </div>
            <div id="tab-wfh" className={`tab-pane fade show p-0 ${activeTab === 'tab-wfh' ? 'active' : ''}`}>
              {jobs?.map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
              <div className="text-center mt-4">
                <Stack spacing={2} alignItems="center">
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsSection;
