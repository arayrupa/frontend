import React from 'react';
import { Link } from 'react-router-dom';
const ErrorSection = () => {
  return (
    <div class="container-xxl py-5 bg-dark page-header mb-5">
      <div class="container my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown">404 Error</h1>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb text-uppercase">
            <Link to="/" class="breadcrumb-item">Home</Link>
            <Link class="breadcrumb-item text-white active" aria-current="page">404 Error</Link>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default ErrorSection;
