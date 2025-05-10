import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import Category from "./pages/Category";
import Testimonial from "./pages/Testimonial";
import Contact from "./pages/Contact";
import Error404 from "./pages/404";
import Login from './components/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminJobs from './pages/AdminJobs';
import AddJobs from './pages/AddJobs';

// PrivateRoute component to protect admin routes
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token"); // Assuming you store auth token in localStorage
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/job-detail" element={<JobDetail />} />
        <Route path="/category" element={<Category />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/jobs" element={<PrivateRoute element={<AdminJobs />} />} />
        <Route path="/jobs-add" element={<PrivateRoute element={<AddJobs />} />} />
        <Route path="/admin/jobs/edit" element={<PrivateRoute element={<AddJobs />} />} />
      </Routes>
    </Router>
  );
}

export default App;
