import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  faBriefcase,
  faHome,
  faSignOutAlt,
  faUserCircle,
  faBars,
  faTimes,
  faBuilding,
  faSearch,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../api';

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <div className="admin-layout d-flex flex-column min-vh-100">
        {/* Header */}
        <header className="admin-header bg-white shadow-sm position-sticky top-0 w-100 z-3" style={{ height: '64px' }}>
          <nav className="navbar navbar-expand-lg navbar-light h-100">
            <div className="container-fluid px-3 h-100">
              {/* Toggle button for sidebar */}
              <button
                className="btn btn-link text-dark d-lg-none me-2 align-self-center"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#adminNavbar"
              >
                <FontAwesomeIcon icon={faBars} size="lg" />
              </button>

              {/* Brand */}
              <Link to="/dashboard" className="navbar-brand d-flex align-items-center me-3">
                <FontAwesomeIcon icon={faBriefcase} className="me-2" size="lg" />
                <span className="fw-bold text-primary">JobEntry Admin</span>
              </Link>

              {/* Navbar content */}
              <div className="collapse navbar-collapse justify-content-end h-100" id="adminNavbar">
                <ul className="navbar-nav h-100">
                  {/* Search */}
                  <li className="nav-item d-none d-lg-block me-3 h-100">
                    <div className="input-group h-100 align-items-center">
                      <input 
                        type="text" 
                        className="form-control form-control-sm"
                        placeholder="Search..."
                        style={{ height: '32px' }}
                      />
                      <button className="btn btn-outline-primary btn-sm" style={{ height: '32px' }}>
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </div>
                  </li>

                  {/* Notifications */}
                  <li className="nav-item me-3 h-100 d-flex align-items-center">
                    <button className="btn btn-link text-dark position-relative p-2">
                      <FontAwesomeIcon icon={faBell} size="lg" />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        3
                        <span className="visually-hidden">unread notifications</span>
                      </span>
                    </button>
                  </li>

                  {/* User dropdown */}
                  <li className="nav-item h-100 d-flex align-items-center">
                    <Link
                      className="nav-link dropdown-toggle d-flex align-items-center"
                      to="#"
                      data-bs-toggle="dropdown"
                    >
                      <FontAwesomeIcon icon={faUserCircle} size="lg" />
                      <span className="ms-2 d-none d-md-inline">Admin</span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                      <li>
                        <Link 
                          className="dropdown-item d-flex align-items-center py-2"
                          to="/admin/profile"
                        >
                          <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button 
                          className="dropdown-item text-danger d-flex align-items-center py-2"
                          onClick={handleLogout}
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        

        {/* Main layout (below header) */}
        <div className="admin-main-layout d-flex flex-grow-1 overflow-hidden">
          {/* Sidebar */}
          <aside 
            className={`admin-sidebar bg-dark text-white ${isCollapsed ? 'collapsed' : ''}`}
            style={{
              width: isCollapsed ? '80px' : '240px',
              transition: 'width 0.3s ease',
              position: 'fixed',
              top: '64px',
              left: 0,
              bottom: 0,
              zIndex: 1000,
              boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
            }}
          >
            {/* Toggle button */}
            <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom border-light">
              {/* <h6 className="text-white m-0 d-none d-md-inline">Menu</h6> */}
              <button 
                className="btn btn-link text-light d-md-none admin-toggle"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} size="lg" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-grow-1">
              <ul className="nav flex-column mt-3">
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className={`nav-link px-3 py-2 ${isActive('/admin') ? 'bg-primary text-white' : ''}`}
                  >
                    <FontAwesomeIcon icon={faHome} className="me-2" />
                    {!isCollapsed && 'Dashboard'}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/jobs"
                    className={`nav-link px-3 py-2 ${isActive('/jobs') ? 'bg-primary text-white' : ''}`}
                  >
                    <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                    {!isCollapsed && 'Jobs'}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className={`nav-link px-3 py-2 ${isActive('/Applicants') ? 'bg-primary text-white' : ''}`}
                  >
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                    {!isCollapsed && 'Applicants'}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className={`nav-link px-3 py-2 ${isActive('/Companies') ? 'bg-primary text-white' : ''}`}
                  >
                    <FontAwesomeIcon icon={faBuilding} className="me-2" />
                    {!isCollapsed && 'Companies'}
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Logout button */}
            <div className="border-top border-light p-3 mt-auto">
              <button 
                className="btn btn-outline-light w-100 rounded-pill py-2"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                {!isCollapsed && 'Logout'}
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="admin-main-layout d-flex flex-grow-1 overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
            <div className="admin-content flex-grow-1 overflow-hidden">
              <div className="content-wrapper">
                {children || <Outlet />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
