import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from "./NavBar";

function HelloWorldView() {
  const { schoolName } = useParams();
  console.log(schoolName);
  return (
    <>
    <NavBar/>
    <div>
      <h1>{schoolName}</h1>
    </div>
    </>
  );
}

export default HelloWorldView;
