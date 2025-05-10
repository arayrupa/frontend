import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Grid,
  Container, 
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
  ThemeProvider,
  createTheme,
  TextField,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useLocation } from 'react-router-dom';
import { createJob, updateJob } from '../../api';
import CloseIcon from '@mui/icons-material/Close';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162',
    },
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          '& .ck-editor__editable': {
            minHeight: '200px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
            '&:focus': {
              outline: 'none',
              boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.3)',
            },
          },
        },
      },
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const ScrollWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(3),
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControl-root': {
    minWidth: '240px',
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const AddJobs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = Boolean(location.state?.jobData);
  
  const [formData, setFormData] = useState(
    location.state?.jobData || {
      company: '',
      job_role: '',
      edu_id: '',
      vacancy: '',
      min_exp: '',
      max_exp: '',
      min_ctc: '',
      max_ctc: '',
      age: '',
      notice_period: '',
      industry_id: '',
      mode_work: '',
      func_category_id: '',
      cities: '',
      skill: '',
      job_desc: ''
    }
  );

  // Get dropdown data from location state
  const [companies, setCompanies] = useState(location.state?.companies || []);
  const [jobRoles, setJobRoles] = useState(location.state?.jobRoles || []);
  const [educations, setEducations] = useState(location.state?.educations || []);
  const [industries, setIndustries] = useState(location.state?.industries || []);
  const [funcCategories, setFuncCategories] = useState(location.state?.funcCategories || []);
  const [cities, setCities] = useState(location.state?.cities || []);
  const [skills, setSkills] = useState(location.state?.skills || []);
  const [modeWork, setModeWork] = useState(location.state?.modeWork || []);
  const [files, setFiles] = useState({
    resume: null,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.jobData) {
      // Transform the job data to match form structure
      const jobData = location.state.jobData;
      setFormData({
        ...jobData,
        company: jobData.company || '',
        job_role: jobData.job_role || '',
        education: jobData.education || '',
        vacancy: jobData.vacancy || '',
        min_exp: jobData.min_exp || '',
        max_exp: jobData.max_exp || '',
        min_ctc: jobData.min_ctc || '',
        max_ctc: jobData.max_ctc || '',
        age: jobData.age || '',
        notice_period: jobData.notice_period || '',
        industry_id: jobData.industry_id || '',
        mode_work: jobData.mode_work || '',
        func_category_id: jobData.func_category_id || '',
        cities: {value: jobData.cities[0]?.value, label: jobData.cities[0]?.label} || '',
        skill: {value: jobData.skill[0]?.value, label: jobData.skill[0]?.label} || '',
        job_desc: jobData.job_desc || ''
      });
    }
  }, [location.state]);

  // If no data in location state, fetch from API
  useEffect(() => {
    if (!location.state) {
      // fetchDropdownData();
    } else {
      // Use the data from location state
      setCompanies(location.state.companies || []);
      setJobRoles(location.state.jobRoles || []);
      setEducations(location.state.educations || []);
      setIndustries(location.state.industries || []);
      setFuncCategories(location.state.funcCategories || []);
      setCities(location.state.cities || []);
      setSkills(location.state.skills || []);
      setModeWork(location.state.modeWork || []);
    }
  }, [location.state]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedValue = typeof value === 'object' ? value : value;
    setFormData(prev => ({
      ...prev,
      [name]: selectedValue
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles(prev => ({
      ...prev,
      [name]: selectedFiles[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Enhanced job description validation
    const jobDesc = formData.job_desc || '';
    const plainText = jobDesc.replace(/<[^>]*>/g, '').trim(); // Remove HTML tags and trim

    if (!plainText) {
      setError('Job description is required and cannot be empty');
      setLoading(false);
      return;
    }

    if (plainText.length < 50) {
      setError('Job description must be at least 50 characters long');
      setLoading(false);
      return;
    }

    try {
      // Create FormData
      const formDataValue = new FormData();
      
      // Add form data fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'object' && value !== null) {
            formDataValue.append(key, value.value || value);
          } else {
            formDataValue.append(key, value);
          }
        }
      });

      if (isEditMode) {
        if(formDataValue.get('expired_date')) {
          formDataValue.delete('expired_date')
        }
        if(formDataValue.get('createdAt')) {
          formDataValue.delete('createdAt')
        }
        if(formDataValue.get('updatedAt')) {
          formDataValue.delete('updatedAt')
        }
        if(formDataValue.get('status')) {
          formDataValue.delete('status')
        }
        await updateJob(location.state.jobData._id, formDataValue);
      } else {
        // Add files only for new job creation
        // if (files) {
        //   formDataValue.append('resume', files?.resume);
        // }
        await createJob(formDataValue);
      }

      navigate('/jobs');
    } catch (error) {
      console.error('Job Operation Error:', error);
      setError(error.message || 'Failed to save job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: 'calc(100vh - 120px)' }}>
        <StyledPaper>
          <Box sx={{ px: 4, pt: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 2 }}>
              {isEditMode ? 'Edit Job' : 'Add New Job'}
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => setError('')}
                  sx={{ float: 'right' }}
                >
                  <CloseIcon />
                </IconButton>
              </Alert>
            )}
          </Box>

          <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <ScrollWrapper>
              {/* Basic Information Section */}
              <FormSection>
                <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
                  Basic Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Company</InputLabel>
                      <Select
                        name="company"
                        value={companies.find(r => r.value === formData.company?.value)}
                        onChange={handleChange}
                        label="Company"
                        required
                      >
                        {companies?.map((role, index) => (
                          <MenuItem key={index} value={role}>
                            {role.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Job Role</InputLabel>
                      <Select
                        name="job_role"
                        value={jobRoles.find(r => r.value === formData.job_role?.value)}
                        onChange={handleChange}
                        label="Job Role"
                        required
                      >
                        {jobRoles?.map((role, index) => (
                          <MenuItem key={index} value={role}>
                            {role.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Work Mode</InputLabel>
                      <Select
                        name="mode_work"
                        value={modeWork.find(r => r.value === formData.mode_work?.value)}
                        onChange={handleChange}
                        label="Work Mode"
                        required
                      >
                        {modeWork?.map((role, index) => (
                          <MenuItem key={index} value={role}>
                            {role.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormSection>

              {/* Job Description Section */}
              <FormSection>
                <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
                  Job Description
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        width: '900px',
                        minHeight: '300px',
                        '& .ck-editor__editable_inline': {
                          minHeight: '200px',
                        }
                      }}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={formData.job_desc || '<p></p>'}
                        onReady={editor => {
                          console.log('Editor is ready');
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setFormData(prev => ({
                            ...prev,
                            job_desc: data
                          }));
                        }}
                        onError={(error, { willPrevent }) => {
                          console.error('CKEditor error:', error);
                          willPrevent();
                        }}
                      />
                    </Box>
                    {error && (
                      <FormHelperText error sx={{ mt: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </FormSection>

              <FormSection>
                <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
                  Job Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="vacancy"
                      label="Vacancy"
                      value={formData.vacancy}
                      onChange={handleChange}
                      required
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography variant="body2">#</Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'divider',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="min_exp"
                      label="Min Experience"
                      value={formData.min_exp}
                      onChange={handleChange}
                      required
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="body2">years</Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'divider',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="max_exp"
                      label="Max Experience"
                      value={formData.max_exp}
                      onChange={handleChange}
                      required
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="body2">years</Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'divider',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="min_ctc"
                      label="Min CTC"
                      value={formData.min_ctc}
                      onChange={handleChange}
                      required
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="body2">LPA</Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'divider',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="max_ctc"
                      label="Max CTC"
                      value={formData.max_ctc}
                      onChange={handleChange}
                      required
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="body2">LPA</Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'divider',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="age"
                      label="Age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="body2">years</Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'divider',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="notice_period"
                      label="Notice Period"
                      value={formData.notice_period}
                      onChange={handleChange}
                      required
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="body2">days</Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'divider',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </FormSection>

              {/* Education & Industry Section */}
              <FormSection>
                <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
                  Education & Industry
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Education</InputLabel>
                      <Select
                        name="edu_id"
                        value={educations.find(e => e.value === formData.education?.value)}
                        onChange={handleChange}
                        label="Education"
                        required
                      >
                        {educations?.map((edu, index) => (
                          <MenuItem key={index} value={edu}>
                            {edu.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Industry</InputLabel>
                      <Select
                        name="industry_id"
                        value={industries.find(i => i.value === formData.industry_id?.value)}
                        onChange={handleChange}
                        label="Industry"
                        required
                      >
                        {industries?.map((industry, index) => (
                          <MenuItem key={index} value={industry}>
                            {industry.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormSection>

              {/* Location & Skills Section */}
              <FormSection>
                <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
                  Location & Skills
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Function Category</InputLabel>
                      <Select
                        name="func_category_id"
                        value={funcCategories.find(fc => fc.value === formData.func_category_id?.value)}
                        onChange={handleChange}
                        label="Function Category"
                        required
                      >
                        {funcCategories?.map((category, index) => (
                          <MenuItem key={index} value={category}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>City</InputLabel>
                      <Select
                        name="cities"
                        value={cities?.find(c => c.value === formData.cities?.value)}
                        onChange={handleChange}
                        label="City"
                        required
                      >
                        {cities?.map((city, index) => (
                          <MenuItem key={index} value={city}>
                            {city.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Skills</InputLabel>
                      <Select
                        name="skill"
                        value={skills?.find(s => s.value === formData.skill?.value)}
                        onChange={handleChange}
                        label="Skills"
                        required
                      >
                        {skills?.map((skill, index) => (
                          <MenuItem key={index} value={skill}>
                            {skill.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormSection>

              {/* File Uploads */}
              <FormSection>
                <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
                Applied URL
                </Typography>
                <TextField
                  fullWidth
                  name="applied_url"
                  value={formData.applied_url}
                  onChange={handleChange}
                  label="Applied URL"
                  required
                />
                {/* <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <input
                      accept="application/pdf"
                      style={{ display: 'none' }}
                      id="resume-upload"
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="resume-upload">
                      <Button
                        fullWidth
                        variant={files.resume ? 'contained' : 'outlined'}
                        component="span"
                        size="small"
                      >
                        {files.resume ? 'Resume Selected' : 'Upload Resume'}
                      </Button>
                    </label>
                  </Grid>
                </Grid> */}
              </FormSection>
            </ScrollWrapper>

            <Box sx={{ px: 4, pb: 4, pt: 2, borderTop: '1px solid rgba(0,0,0,0.12)' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{
                  height: '48px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                {loading ? <CircularProgress size={24} /> : isEditMode ? 'Update Job' : 'Create Job Opening'}
              </Button>
            </Box>
          </form>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default AddJobs;
