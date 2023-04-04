import SchoolpageView from "../views/SchoolpageView"
import React, { useEffect, useState } from 'react';

export default function SchoolpageContainer() {
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    if (selectedSchool) {
      document.title = selectedSchool.school_name;
    }
  }, [selectedSchool]);

  return (
    <SchoolpageView
      onSchoolSelection={setSelectedSchool}
      selectedSchool={selectedSchool}
    />
  );
}
