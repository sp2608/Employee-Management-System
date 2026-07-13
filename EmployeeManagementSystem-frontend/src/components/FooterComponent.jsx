import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto shadow-lg">
      <div className="container">
        <span className="fw-semibold">
          © {new Date().getFullYear()} Employee Management System | All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default FooterComponent;