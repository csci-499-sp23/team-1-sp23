import React from "react"
import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({schoolsPerPage, totalSchools, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalSchools/schoolsPerPage); i++) {
        pageNumbers.push(i)
    }

    const handleChange = (e, page) => {
       paginate(page)
    }

    return (
        <Pagination 
            count={pageNumbers.length} 
            onChange={handleChange} 
            variant="outlined" 
            shape="rounded" 
            sx={{
                m: 4, 
                width: "100%", 
                display: "flex",
                justifyContent: "flex-end"
            }}>

        </Pagination>
    )
}

export default PaginationComponent