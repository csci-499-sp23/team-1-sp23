import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "./NavBar";

import { useLocation } from 'react-router-dom';

function HelloWorldView() {
  const location = useLocation();
  const school = location.state.school;
  return (
    <>
    <NavBar/>
  
    <div>
      <h1>School Name: {school?.school_name}</h1>
      <p>Address: {school?.location}</p>
      <p>Phone: {school?.phone_number}</p>
      {/* ...and so on */}
    </div>
    
    </>
  );
}

export default HelloWorldView;
