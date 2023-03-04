import React from 'react'
import ReactDOM from "react-dom";
import  {Provider} from "react-redux"
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyledEngineProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);