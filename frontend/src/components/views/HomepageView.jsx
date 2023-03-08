import { Box, Typography, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react'

export default function HomepageView() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  return (
    <> 
      <Box className="home-banner">
        <Box sx={{ mt: "10%"}}>
          <Typography variant="h1" component="h1" sx={{ textAlign: "center", fontSize: "2.25rem", filter: "drop-shadow(1px 1px 5px black)"}}> 
            The easiest way to find the school best suited for your needs.
          </Typography>
        </Box>
       
        <Box sx={{ mt: "5rem", width: "50%" }}>
          <TextField id="outlined-basic" label="Search for schools" variant="filled" sx={{ backgroundColor: "white", width: "100%", borderRadius: "5px",}} />
        </Box>
        <div>
          <Button onClick={handleClickOpen} style={{ background: "#2b2d42" }}>Advance Search</Button>
          <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Filter your Search</DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel htmlFor="dialog-native">Borough</InputLabel>
                  <Select
                    native
                    value={age}
                    onChange={handleChange}
                    input={<OutlinedInput label="Age" id="dialog-native" />}
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>Queens</option>
                    <option value={20}>Brooklyn</option>
                    <option value={30}>Bronx</option>
                    <option value={30}>Manhattan</option>
                    <option value={30}>Staten Island</option>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Search</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  )
}