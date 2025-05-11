import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyAll as CopyIcon } from '@mui/icons-material';
import { encryptId } from '../utils/encryption';

const JobItem = ({ job }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleJobClick = () => {
    navigate('/job-detail', { state: { id: job._id } });
  };

  const getPublicUrl = (jobId) => {
    // Generate encrypted URL
    const encryptedId = encryptId(jobId);
    return `${window.location.origin}/public/job/${encryptedId}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getPublicUrl(job._id));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
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
        <div className="col-sm-12 col-md-4 d-flex align-items-center justify-content-end">
          <div className="d-flex align-items-center gap-3">
            <button 
              onClick={handleJobClick} 
              className="btn btn-primary"
            >
              View Details
            </button>
            <button 
              onClick={handleCopy}
              className="btn btn-outline-primary"
              title={copied ? 'Copied!' : 'Copy Public URL'}
            >
              <CopyIcon /> {copied ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;