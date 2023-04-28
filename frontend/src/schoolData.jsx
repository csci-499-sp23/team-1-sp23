import React, { useState, useEffect } from "react";

function SchoolsData() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function fetchSchools() {
      const response = await fetch("https://data.cityofnewyork.us/resource/23z9-6uk9.json");
      const data = await response.json();
      // data.forEach(school => {
      //   console.log(school.language_classes)
      // })
      setSchools(data);
    }

    fetchSchools();
  }, []);

  return schools;
}

export default SchoolsData;
