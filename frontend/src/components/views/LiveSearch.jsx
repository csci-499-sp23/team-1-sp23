import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material/";
import { Box } from "@mui/system";
import SchoolsData from "../../schoolData";

function LiveSearch() {
  const Schools = SchoolsData();

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        margin: "auto",
      }}
    >
      <Autocomplete
        id="school_names_test"
        getOptionLabel={(Schools) => `${Schools.school_name}`}
        options={Schools}
        sx={{ width: 500 }}
        isOptionEqualToValue={(option, value) =>
          option.school_name == value.school_name
        }
        noOptionsText={"School name not found."}
        renderOption={(props, Schools) => (
          <Box component="li" {...props} key={Schools.id}>
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
      />
    </Stack>
  );
}

export default LiveSearch;
