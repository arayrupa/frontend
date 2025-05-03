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
import { createJob } from '../../api';
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
  const [formData, setFormData] = useState({
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
    city_id: '',
    skill: '',
    job_desc: ''
  });

  // Get dropdown data from location state
  const location = useLocation();
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
    // audio_1: null,
    // audio_2: null,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If no data in location state, fetch from API
  useEffect(() => {
    setCompanies(location.state?.companies || []);
    setJobRoles(location.state?.jobRoles || []);
    setEducations(location.state?.educations || []);
    setIndustries(location.state?.industries || []);
    setFuncCategories(location.state?.funcCategories || []);
    setCities(location.state?.cities || []);
    setSkills(location.state?.skills || []);
    setModeWork(location.state?.modeWork || []);
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
    const selectedValue = typeof value === 'object' ? value.value : value;
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
  
    // Validate job description
    if (!formData.job_desc || formData.job_desc.trim() === '') {
      setError('Job description is required');
      setLoading(false);
      return;
    }
  
    try {
      // Create FormData
      const formDataVlaue = new FormData();
      
      // Add form data fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          if (typeof value === 'object') {
            formDataVlaue.append(key, value.value);
          } else {
            formDataVlaue.append(key, value);
          }
        }
      });
  
      // Add files
        if (files) {
          console.log("inside")
          formDataVlaue.append('resume', files?.resume);
        }
      console.log("Files before sending:", files?.resume);
      console.log("formDataVlaue:", formDataVlaue);
  
      await createJob(formDataVlaue);
      navigate('/jobs');
    } catch (error) {
      console.error('Create Job Error:', error);
      setError(error.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');
  //   // Validate job description
  //   if (!formData.job_desc || formData.job_desc.trim() === '') {
  //     setError('Job description is required');
  //     setLoading(false);
  //     return;
  //   }
  //   try {
  //     // Create a new object to store the data
  //     const payload = {};
  //     // First handle the form data
  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (value) {
  //         if (typeof value === 'object') {
  //           // For Select components, use the value property
  //           payload[key] = value.value;
  //         } else {
  //           payload[key] = value;
  //         }
  //       }
  //     });
  
  //     // Then handle the files
  //     console.log("files",files)
  //     Object.entries(files).forEach(([key, value]) => {
  //       if (value) {
  //         payload[key] = value;
  //       }
  //     });
  //     console.log("payload",payload)
  //     // Send the data
  //     await createJob(payload);
  //     navigate('/jobs');
  //   } catch (error) {
  //     console.error('Create Job Error:', error);
  //     setError(error.message || 'Failed to create job');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: 'calc(100vh - 120px)' }}>
        <StyledPaper>
          <Box sx={{ px: 4, pt: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 2 }}>
              Add New Job Opening
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

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
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
                        name="companies"
                        value={companies.find(r => r.value === formData.company)}
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
                        value={jobRoles.find(r => r.value === formData.job_role)}
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
                        value={modeWork.find(r => r.value === formData.mode_work)}
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
                        data="<p></p>"
                        onReady={(editor) => {
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData()
                          setFormData({ ...formData, job_desc: data })
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
                        value={educations.find(e => e.value === formData.edu_id)}
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
                        value={industries.find(i => i.value === formData.industry_id)}
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
                        value={funcCategories.find(fc => fc.value === formData.func_category_id)}
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
                        name="city_id"
                        value={cities.find(c => c.value === formData.city_id)}
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
                        value={skills.find(s => s.value === formData.skill)}
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
                  Required Documents
                </Typography>
                <Grid container spacing={3}>
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
                  {/* <Grid item xs={12} sm={4}>
                      <input
                        accept="audio/*"
                        style={{ display: 'none' }}
                        id="audio1-upload"
                        type="file"
                        name="audio_1"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="audio1-upload">
                        <Button
                          fullWidth
                          variant={files.audio_1 ? 'contained' : 'outlined'}
                          component="span"
                          size="small"
                        >
                          {files.audio_1 ? 'Audio 1 Selected' : 'Upload Audio 1'}
                        </Button>
                      </label>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <input
                        accept="audio/*"
                        style={{ display: 'none' }}
                        id="audio2-upload"
                        type="file"
                        name="audio_2"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="audio2-upload">
                        <Button
                          fullWidth
                          variant={files.audio_2 ? 'contained' : 'outlined'}
                          component="span"
                          size="small"
                        >
                          {files.audio_2 ? 'Audio 2 Selected' : 'Upload Audio 2'}
                        </Button>
                      </label>
                    </Grid> */}
                </Grid>
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
                {loading ? <CircularProgress size={24} /> : 'Create Job Opening'}
              </Button>
            </Box>
          </form>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default AddJobs;
