import React from 'react'
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
