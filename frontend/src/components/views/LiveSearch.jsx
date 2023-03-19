import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
//import { Autocomplete } from '@mui/material/Autocomplete';
import {Box} from '@mui/system';

function LiveSearch(){
    const [jsonResults, setJsonResults] = useState([]);

    useEffect(() => {
        fetch("https://data.cityofnewyork.us/resource/23z9-6uk9.json")
        .then((response) => response.json())
        .then((json) => setJsonResults(json))
    }, [])

    console.log(jsonResults);
    return <div></div>
}

export default LiveSearch;