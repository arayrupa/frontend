import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobItem = ({ job }) => {
  const navigate = useNavigate();

  const handleJobClick = () => {
    navigate('/job-detail', { state: { id: job._id } });
  };
  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1).toLowerCase();
  };


  return (
    <div className="job-item p-4 mb-4">
      <div className="row g-4">
        <div className="col-sm-12 col-md-8 d-flex align-items-center" onClick={handleJobClick} style={{ cursor: 'pointer' }}>
          <img className="flex-shrink-0 img-fluid border rounded" src={job.company_logo} alt="" style={{ width: '80px', height: '80px' }} />
          <div className="text-start ps-4">
            <h5 className="mb-3">{job.job_role?.label}</h5>
            <span className="text-truncate me-3"><i className="fa fa-map-marker-alt text-primary me-2"></i>{job.cities.map(city => city.label).join(', ')}</span>
            <span className="text-truncate me-3"><i className="far fa-clock text-primary me-2"></i>{capitalizeFirstLetter(job?.mode_work?.label)}</span>
            <span className="text-truncate me-0"><i className="far fa-money-bill-alt text-primary me-2"></i>{job.min_ctc}LPA - {job.max_ctc}LPA</span>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
          <div className="d-flex mb-3">
            <a className="btn btn-light btn-square me-3" ><i className="far fa-heart text-primary"></i></a>
            <a className="btn btn-primary" onClick={handleJobClick}>Apply Now</a>
          </div>
          <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date Line: {job.expired_date}</small>
        </div>
      </div>
    </div>
  );
};

export default JobItem;