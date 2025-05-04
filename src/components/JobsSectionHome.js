import React, { useState, useEffect } from 'react';
import JobItem from './JobItem';
import { getJobs } from '../api/jobs';
import { Link } from 'react-router-dom';

const JobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tab-1');
  
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobs();
      setJobs(response?.data?.jobList?.jobList);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>
        <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
          <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
            <li className="nav-item">
              <a 
                className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${activeTab === 'tab-1' ? 'active' : ''}`} 
                onClick={() => setActiveTab('tab-1')}
                href="#"
              >
                <h6 className="mt-n1 mb-0">Featured</h6>
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`d-flex align-items-center text-start mx-3 pb-3 ${activeTab === 'tab-2' ? 'active' : ''}`} 
                onClick={() => setActiveTab('tab-2')}
                href="#"
              >
                <h6 className="mt-n1 mb-0">Full Time</h6>
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`d-flex align-items-center text-start mx-3 me-0 pb-3 ${activeTab === 'tab-3' ? 'active' : ''}`} 
                onClick={() => setActiveTab('tab-3')}
                href="#"
              >
                <h6 className="mt-n1 mb-0">Part Time</h6>
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div id="tab-1" className={`tab-pane fade show p-0 ${activeTab === 'tab-1' ? 'active' : ''}`}>
              {jobs.map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
              <Link className="btn btn-primary py-3 px-5" to="/job-list">Browse More Jobs</Link>
            </div>
            <div id="tab-2" className={`tab-pane fade show p-0 ${activeTab === 'tab-2' ? 'active' : ''}`}>
              {jobs.map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
              <Link className="btn btn-primary py-3 px-5" to="/job-list">Browse More Jobs</Link>
            </div>
            <div id="tab-3" className={`tab-pane fade show p-0 ${activeTab === 'tab-3' ? 'active' : ''}`}>
              {jobs.map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
              <Link className="btn btn-primary py-3 px-5" to="/job-list">Browse More Jobs</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsSection;
