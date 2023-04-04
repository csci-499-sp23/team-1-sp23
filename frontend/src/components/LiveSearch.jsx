import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material/";
import { Box } from "@mui/system";
import SchoolsData from "../schoolData";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function LiveSearch() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const Schools = SchoolsData();
  const navigate = useNavigate();
  
  const handleSchoolSelection = (event, value) => {
    setSelectedSchool(value);
    navigate(`/school/${value.school_name}`, {state: {school: value} });
  }

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        margin: "auto",
      }}
    >
      <Autocomplete
        id="school_names_ID"
        getOptionLabel={(Schools) => `${Schools.school_name}`}
        options={Schools}
        sx={{ width: {xs: 320, sm: 450, md: 500} }}
        isOptionEqualToValue={(option, value) =>
          option.school_name == value.school_name
        }
        noOptionsText={"School name not found."}
        renderOption={(props, Schools) => (
          <Box component="li" {...props} key={Schools.dbn}>
            {Schools.school_name}
          </Box>
        )}        
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for schools..."
            variant="filled"
            sx={{
              backgroundColor: "white",
              width: "100%",
              borderRadius: "5px",
            }}
          />
        )}
        onChange={handleSchoolSelection}
      />
      {selectedSchool && (
        <Link to={{ pathname: `/school/${selectedSchool.school_name}`, state:{school: selectedSchool} }}>
          Go to School page
        </Link>
      )}
    </Stack>
  );
}

export default LiveSearch;
