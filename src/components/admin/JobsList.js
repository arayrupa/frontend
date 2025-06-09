import React, { useState, useEffect, useRef  } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, IconButton, Typography, Paper, Modal, Divider, Grid, Switch, Snackbar, Alert } from '@mui/material';
import { Delete, Edit, Visibility, Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getJobs, masterFilters, activeInactiveJob } from '../../api';

// Column definitions moved outside component for better performance
const getColumns = (navigate, handleView, handleDelete, handleStatusChange, filterData) => [
  // { field: '_id', headerName: 'ID', width: 90 },
  { 
    field: 'job_role', 
    headerName: 'Job Title', 
    width: '20%',
    flex: 1,
    renderCell: (params) => (
      <Typography variant="body1" fontWeight="500">
        {params.value?.label}
      </Typography>
    )
  },
  { 
    field: 'company_name', 
    headerName: 'Company', 
    width: "10%",
    flex: 0.8,
    renderCell: (params) => (
      <Typography variant="body2" color="text.secondary">
        {params.value}
      </Typography>
    )
  },
  {
    field: 'cities', 
    headerName: 'Location', 
    width: "20%",
    flex: 0.6,
    renderCell: (params) => (
      <Typography variant="body2" color="text.secondary">
        {params.value?.map(city => city.label).join(', ')}
      </Typography>
    )
  },
  {
    field: 'min_ctc', 
    headerName: 'Min CTC', 
    width: "10%",
    flex: 0.5,
    valueFormatter: (params) => `₹${params.value}L`,
    renderCell: (params) => (
      <Typography variant="body2" color="primary">
        ₹{params.value}L
      </Typography>
    )
  },
  { 
    field: 'max_ctc', 
    headerName: 'Max CTC', 
    width: "10%",
    flex: 0.5,
    valueFormatter: (params) => `₹${params.value}L`,
    renderCell: (params) => (
      <Typography variant="body2" color="primary">
        ₹{params.value}L
      </Typography>
    )
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: "10%",
    flex: 0.5,
    renderCell: (params) => (
      <Switch
        checked={params.value}
        onChange={() => handleStatusChange(params.row._id, params.value)}
        color="primary"
      />
    )
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: "30%",
    flex: 0.6,
    renderCell: (params) => {
      return (
        <Box display="flex" gap={1} justifyContent="flex-end">
          <IconButton 
            onClick={() => navigate('/jobs-edit', {
              state: { 
                companies: filterData?.companies,
                jobRoles: filterData?.jobRoles,
                educations: filterData?.educations,
                industries: filterData?.industries,
                funcCategories: filterData?.funcCategories,
                cities: filterData?.cities,
                skills: filterData?.skills,
                modeWork: filterData?.modeWork,
                jobData: params.row }
            })}
            size="small"
            color="primary"
            sx={{ borderRadius: '8px' }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton 
            onClick={() => handleView(params.row._id)}
            size="small"
            color="primary"
            sx={{ borderRadius: '8px' }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton 
            onClick={() => handleDelete(params.row._id)}
            size="small"
            color="error"
            sx={{ borderRadius: '8px' }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      );
    }
  }
];

const JobsList = () => {
  const hasFetched = useRef(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    companies: [],
    jobRoles: [],
    educations: [],
    industries: [],
    funcCategories: [],
    cities: [],
    modeWork: []
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const navigate = useNavigate();

  const showToast = (message, severity = 'success') => {
    setToast({
      open: true,
      message,
      severity
    });
  };

  const handleCloseToast = () => {
    setToast({
      ...toast,
      open: false
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [jobsData, filters] = await Promise.all([
        getJobs({type: true}),
        masterFilters()
      ])
      setJobs(jobsData.data.jobList.jobList);
      setFilterData({
        companies: filters.data.companies.companyList.map(item => ({
          value: item.id || item.value,
          label: item.name || item.label
        })) || [],
        jobRoles: filters.data.job_roles.job_RoleList.map(item => ({
          value: item.id || item.value,
          label: item.name || item.label
        })) || [],
        educations: filters.data.educations.educationList.map(item => ({
          value: item.id || item.value,
          label: item.name || item.label
        })) || [],
        industries: filters.data.industries.industryList.map(item => ({
          value: item.id || item.value,
          label: item.name || item.label
        })) || [],
        funcCategories: filters.data.func_categories.functionsList.map(item => ({
          value: item.id || item.value,
          label: item.name || item.label
        })) || [],
        cities: filters.data.cities.citiesList.map(item => ({
          value: item.id || item.value,
          label: item.name || item.label
        })) || [],
        modeWork: filters.data.work_mode.workModeList.map(item => ({
          value: item.id || item.value,
          label: item.name || item.label
        })) || []
      });
      showToast('Jobs loaded successfully');
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast('Failed to load jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchData();
  }, [])


  const handleView = (id) => {
    const job = jobs.find(job => job._id === id);
    setSelectedJob(job);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        // Send delete status (2)
        await activeInactiveJob(id, 2);
        setJobs(jobs.filter(job => job._id !== id));
        showToast('Job deleted successfully');
      } catch (error) {
        console.error('Error deleting job:', error);
        showToast('Failed to delete job', 'error');
      }
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      // Convert boolean to status value (0: inactive, 1: active)
      const newStatus = currentStatus ? 0 : 1; // If currently active (true), make inactive (0), and vice versa
      await activeInactiveJob(id, newStatus);
      
      // Update the local state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job._id === id ? { ...job, status: !currentStatus } : job
        )
      );
      showToast(currentStatus ? 'Job deactivated successfully' : 'Job activated successfully');
    } catch (error) {
      console.error('Error changing job status:', error);
      showToast('Failed to change job status', 'error');
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h1">
          Jobs Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/jobs-add', {
            state: {
              companies: filterData.companies,
              jobRoles: filterData.jobRoles,
              educations: filterData.educations,
              industries: filterData.industries,
              funcCategories: filterData.funcCategories,
              cities: filterData.cities,
              modeWork: filterData.modeWork,
              jobData: null
            }
          })}
        >
          Add New Job
        </Button>
      </Box>
      
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={jobs}
          columns={getColumns(navigate, handleView, handleDelete, handleStatusChange, filterData)}
          getRowId={(row) => row._id}
          loading={loading}
          components={{
            Toolbar: GridToolbar
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }
          }}
          disableSelectionOnClick
          autoHeight
          density="comfortable"
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
        />
      </Box>

      {/* Job Details Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="job-details-modal"
        aria-describedby="job-details-description"
        BackdropProps={{
          onClick: handleCloseModal // Enable clicking outside to close
        }}
        disableEscapeKeyDown={false} // Enable Esc key to close
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)' // Darken the background
          }
        }}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 800,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxHeight: '90vh',
            overflow: 'auto',
            '&:focus': {
              outline: 'none' // Remove focus outline
            }
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
        >
          {selectedJob && (
            <>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" component="h2">
                  {selectedJob.job_role?.label}
                </Typography>
                
                <IconButton 
                  onClick={handleCloseModal}
                  size="small"
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(0, 0, 0, 0.04)' 
                    } 
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={3}>
                {/* Company Information */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Company Information
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Company:</strong> {selectedJob.company_name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Location:</strong> {selectedJob.cities?.map(city => city.label).join(', ')}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Industry:</strong> {selectedJob.industry_id?.label}
                  </Typography>
                </Grid>

                {/* Job Details */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Job Details
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Experience:</strong> {selectedJob.min_exp} - {selectedJob.max_exp} years
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>CTC:</strong> ₹{selectedJob.min_ctc}L - ₹{selectedJob.max_ctc}L
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Vacancies:</strong> {selectedJob.vacancy}
                  </Typography>
                </Grid>

                {/* Requirements */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Requirements
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Education:</strong> {selectedJob.education?.label}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Notice Period:</strong> {selectedJob.notice_period} days
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Work Mode:</strong> {selectedJob.mode_work?.label}
                  </Typography>
                </Grid>

                {/* Skills */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Required Skills
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedJob.skill?.map(skill => skill.label).join(', ')}
                  </Typography>
                </Grid>

                {/* Skills */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Applied Url
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedJob.applied_url}
                  </Typography>
                </Grid>

                {/* Job Description */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Job Description
                  </Typography>
                  <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                    <Typography 
                      variant="body1" 
                      component="div"
                      dangerouslySetInnerHTML={{ __html: selectedJob.job_desc }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button 
                  variant="contained"
                  onClick={() => {
                    handleCloseModal();
                    navigate('/jobs-edit', {
                      state: { 
                        companies: filterData?.companies,
                        jobRoles: filterData?.jobRoles,
                        educations: filterData?.educations,
                        industries: filterData?.industries,
                        funcCategories: filterData?.funcCategories,
                        cities: filterData?.cities,
                        skills: filterData?.skills,
                        modeWork: filterData?.modeWork,
                        jobData: selectedJob
                      }
                    });
                  }}
                >
                  Edit Job
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default JobsList;
