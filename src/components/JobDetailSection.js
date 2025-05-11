import React from 'react';
import parse from 'html-react-parser';
import moment from 'moment';

const JobDetailSection = ({ jobDetail }) => {
  console.log("jobDetail",jobDetail)
  const capitalizeFirstLetter = (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1).toLowerCase();
  };

  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row gy-5 gx-4">
          <div className="col-lg-8">
            <div className="d-flex align-items-center mb-5">
              <img
                className="flex-shrink-0 img-fluid border rounded"
                src={jobDetail?.company_logo}
                alt=""
                style={{ width: '80px', height: '80px' }}
              />
              <div className="text-start ps-4">
                <h3 className="mb-3">{jobDetail?.title?.label}</h3>
                <span className="text-truncate me-3">
                  <i className="fa fa-map-marker-alt text-primary me-2"></i>
                  {jobDetail?.cities?.map(city => city.label).join(', ')}
                </span>
                <span className="text-truncate me-3">
                  <i className="far fa-clock text-primary me-2"></i>
                  {capitalizeFirstLetter(jobDetail?.mode_work?.label)}
                </span>
                <span className="text-truncate me-0">
                  <i className="far fa-money-bill-alt text-primary me-2"></i>
                  {jobDetail?.min_ctc}LPA - {jobDetail?.max_ctc}LPA
                </span>
              </div>
            </div>

            <div className="mb-5">
              <h4 className="mb-3">Job description</h4>
              <div className="job-description">
                {jobDetail?.job_desc ? parse(jobDetail.job_desc) : ''}
              </div>

              <h4 className="mb-3">Qualifications</h4>
              <div className="job-qualification">
                {jobDetail?.education?.label}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="bg-light rounded p-5 mb-4 wow slideInUp" data-wow-delay="0.1s">
              <h4 className="mb-4">Job Summary</h4>
              <div className="job-summary-details">
                <p className="mb-3">
                  <i className="far fa-calendar-alt text-primary me-2"></i>
                  <span className="fw-bold">Date:</span>{' '}
                  {moment(jobDetail?.createdAt).format('DD MMM, YYYY [at] hh:mm A')}
                </p>
                <p className="mb-3">
                  <i className="fas fa-users text-primary me-2"></i>
                  <span className="fw-bold">Vacancy:</span>{' '}
                  {jobDetail?.vacancy} {jobDetail?.vacancy > 1 ? 'Positions' : 'Position'}
                </p>
                <p className="mb-3">
                  <i className="fas fa-clock text-primary me-2"></i>
                  <span className="fw-bold">Job Nature:</span>{' '}
                  {capitalizeFirstLetter(jobDetail?.mode_work?.label)}
                </p>
                <p className="mb-3">
                  <i className="fas fa-money-bill-alt text-primary me-2"></i>
                  <span className="fw-bold">Salary:</span>{' '}
                  {jobDetail?.min_ctc}LPA - {jobDetail?.max_ctc}LPA
                </p>
                <p className="mb-3">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  <span className="fw-bold">Location:</span>{' '}
                  {jobDetail?.cities?.map(city => city.label).join(', ')}
                </p>
                <p className="mb-3">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  <span className="fw-bold">Skill:</span>{' '}
                  {jobDetail?.skill?.map(skill => skill.label).join(', ')}
                </p>
                <p className="mb-0">
                  <i className="far fa-clock text-primary me-2"></i>
                  <span className="fw-bold">Deadline:</span>{' '}
                  {moment(jobDetail?.expired_date).format('DD MMM, YYYY')}
                </p>
              </div>
            </div>

            <div className="bg-light rounded p-5 wow slideInUp" data-wow-delay="0.1s">
              <h4 className="mb-4">Company Detail</h4>
              <div className="company-details">
                {jobDetail?.company_name && (
                  <p className="mb-3">
                    <i className="fa fa-building text-primary me-2"></i>
                    {jobDetail?.company_name}
                  </p>
                )}
                {jobDetail?.company_address && (
                  <p className="mb-3">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    {jobDetail?.company_address}
                  </p>
                )}
                {jobDetail?.company_website && (
                  <p className="mb-0">
                    <i className="fa fa-globe text-primary me-2"></i>
                    <a 
                      href={jobDetail?.company_website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      {jobDetail?.company_website}
                    </a>
                  </p>
                )}
              </div>
            </div>
            {jobDetail?.applied_url && (
              <div className="bg-light rounded p-5 mb-4 wow slideInUp" data-wow-delay="0.1s">
                <h4 className="mb-4">Apply Here</h4>
                <div className="text-start ps-4">
                  <p className="text-truncate mb-0">
                    <i className="fa fa-link text-primary me-2"></i>
                    <a 
                      href={jobDetail.applied_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      {jobDetail.applied_url}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailSection;
