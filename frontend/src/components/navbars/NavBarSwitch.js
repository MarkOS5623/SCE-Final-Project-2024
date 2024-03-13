import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import StudentNavbar from './StudentNavbar';

function NavBarSwitch() {
  const location = useLocation();

  // Check if the current location is the student page or other specific pages
  const isStudentPage = location.pathname.includes('/student');
  const isCreateRequestPage = location.pathname.includes('/create-request');
  const isEditRequestPage = location.pathname.includes('/edit-request');
  const isViewFormPage = location.pathname.includes('/view-form');

  // Render different navbars based on the current route
  if (isStudentPage || isCreateRequestPage || isEditRequestPage || isViewFormPage) {
    return <StudentNavbar />;
  } else {
    return <Navbar />;
  }
}

export default NavBarSwitch;
