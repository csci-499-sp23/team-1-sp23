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
    
    return (
        <Stack sx={{justifyContent:"center", alignItems:"center", width: 300, margin: "auto" }}>
            <Autocomplete 
                id="school_names_test"
                getOptionLabel={(jsonResults) => `${jsonResults.school_name}`}
                options={jsonResults}
                sx={{width: 500}}
                isOptionEqualToValue={(option, value) =>
                    option.school_name == value.school_name
                }
                noOptionsText={"School name not found."}
                renderOption={(props, jsonResults) => (
                    <Box component="li" {...props} key={jsonResults.id}>
                        {jsonResults.school_name}
                    </Box>
                )}
                renderInput={(params) => <TextField {...params} 
                label= "Search for schools..."
                variant="filled"
                sx={{ backgroundColor: "white", width: "100%", borderRadius: "5px",}}
                 />}
            />
        </Stack>
    );
}

export default LiveSearch;