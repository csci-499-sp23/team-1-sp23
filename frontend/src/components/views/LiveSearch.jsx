import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Autocomplete } from '@mui/material/';
import {Box} from '@mui/system';

function LiveSearch(){
    const [jsonResults, setJsonResults] = useState([]);

    useEffect(() => {
        fetch("https://data.cityofnewyork.us/resource/23z9-6uk9.json")
        .then((response) => response.json())
        .then((json) => setJsonResults(json))
    }, [])

    console.log(jsonResults);
    return (
        <Stack sx={{ width: 300, margin: "auto" }}>
            <Autocomplete 
                id="school_names_test"
                getOptionLabel={(jsonResults) => `${jsonResults.school_name}`}
                options={jsonResults}
                sx={{width: 300}}
                isOptionEqualToValue={(option, value) =>
                    option.school_name == value.school_name
                }
                noOptionsText={"School NOT FOUND"}
                renderOption={(props, jsonResults) => (
                    <Box component="li" {...props} key={jsonResults.id}>
                        {jsonResults.school_name}
                    </Box>
                )}
                renderInput={(params) => <TextField {...params} label= "Search for schools" />}
            />
        </Stack>
    );
}

export default LiveSearch;