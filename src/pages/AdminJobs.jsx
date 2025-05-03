import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import JobsList from '../components/admin/JobsList';

const AdminJobs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container-xxl bg-white p-0">
      <div className="admin-container">
        <AdminLayout>
          <div className="container-fluid p-4">
            <JobsList />
          </div>
        </AdminLayout>
      </div>
    </div>
  );
};

export default AdminJobs;
