import React, { useEffect } from 'react';
import NavBar from "./NavBar";
import { useLocation } from 'react-router-dom';

function SchoolpageView() {
  const location = useLocation();
  const school = location.state.school;
  return (
    <>
    <NavBar/>
    <div>
      <h1>{school?.school_name}</h1>
      <p>Address: {school?.location}</p>
      <p>Phone: {school?.phone_number}</p>
    </div>
    
    </>
  );
}

export default SchoolpageView;
