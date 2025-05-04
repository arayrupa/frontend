import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, IconButton, Typography, Paper } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getJobs, masterFilters  } from '../../api';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
    // State for dropdowns
  const [companies, setCompanies] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [educations, setEducations] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [funcCategories, setFuncCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [modeWork, setModeWork] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    { 
      field: 'job_role', 
      headerName: 'Job Title', 
      width: 250,
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
      width: 200,
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
      width: 180,
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
      width: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body2" color="primary">
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'max_ctc', 
      headerName: 'Max CTC', 
      width: 150,
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body2" color="primary">
          {params.value}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      flex: 0.4,
      renderCell: (params) => (
        <Box display="flex" gap={1} justifyContent="flex-end">
          <IconButton 
            onClick={() => navigate(`/admin/jobs/edit/${params.row.id}`)} 
            size="small"
            color="primary"
            sx={{ borderRadius: '8px' }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton 
            onClick={() => handleView(params.row.id)} 
            size="small"
            color="primary"
            sx={{ borderRadius: '8px' }}
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton 
            onClick={() => handleDelete(params.row.id)} 
            size="small"
            color="error"
            sx={{ borderRadius: '8px' }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleView = (id) => {
    navigate(`/admin/jobs/view/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        // Implement delete API call
        await deleteJob(id);
        // Refresh the list
        fetchJobs();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

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
    const fetchDroupDownData = async () => {
      try {
        const response = await masterFilters()
        if (response.data) {
          setCompanies(response.data.companies?.companyList?.map(item => ({
            value: item.id || item.value,
            label: item.name || item.label
          })) || []);
          setJobRoles(response.data.job_roles?.job_RoleList?.map(item => ({
            value: item.id || item.value,
            label: item.name || item.label
          })) || []);
          setEducations(response.data.educations?.educationList?.map(item => ({
            value: item.id || item.value,
            label: item.name || item.label
          })) || []);
          setIndustries(response.data.industries?.industryList?.map(item => ({
            value: item.id || item.value,
            label: item.name || item.label
          })) || []);
          setFuncCategories(response.data.func_categories?.functionsList?.map(item => ({
            value: item.id || item.value,
            label: item.name || item.label
          })) || []);
          setCities(response.data.cities?.citiesList?.map(item => ({
            value: item.id || item.value,
            label: item.name || item.label
          })) || []);
          setSkills(response.data.skills?.skillsList?.map(item => ({
            value: item.id || item.value,
            label: item.name || item.label
          })) || []);
          setModeWork(response.data.work_mode?.workModeList?.map(item => ({
            value: item.id || item.value,
            label: item.name || item.label
          })) || []);
        }
      } catch (error) {
        console.error('Error fetching master data:', error);
      }
    };

    fetchDroupDownData();
  }, []);

  return (
    <>
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: '8px',
        backgroundColor: 'background.paper',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: '100%',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h6" 
          component="h2"
          sx={{ 
            color: 'primary.main',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}
        >
          Job Listings
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Pass dropdown data as state
            navigate('/jobs-add', {
              state: {
                companies,
                jobRoles,
                educations,
                industries,
                funcCategories,
                cities,
                skills,
                modeWork
              }
            });
          }}
          startIcon={<Edit />}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          Add New Job
        </Button>
      </Box>

      <Box 
        sx={{ 
          height: 'calc(100% - 70px)',
          width: '100%',
          backgroundColor: 'background.paper'
        }}
      >
        <DataGrid
          rows={jobs}
          columns={columns}
          loading={loading}
          components={{
            Toolbar: GridToolbar,
          }}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'background.paper',
              borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: 'background.paper',
              borderTop: '1px solid rgba(224, 224, 224, 0.5)',
            },
            '& .MuiDataGrid-row': {
              '&:nth-of-type(odd)': {
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
              },
            },
          }}
        />
      </Box>
    </Paper>
    </>
  );
};

export default JobsList;
