import SchoolpageView from "../views/SchoolpageView";
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SchoolpageContainer() {
  const location = useLocation();

  useEffect(() => {
    const originalTitle = document.title;

    if (location.state && location.state.school) {
      document.title = `${location.state.school.school_name} | School Name`;
    }

    return () => {
      document.title = originalTitle;
    };
  }, [location]);

  return (
    <SchoolpageView />
  );
}
