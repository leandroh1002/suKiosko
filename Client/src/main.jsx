import React from "react"; 
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; 
import { Provider } from 'react-redux';
import App from './App'; 
import store from './redux/store/index';
import axios from "axios";
import './index.css'
const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;


axios.defaults.baseURL = REACT_APP_API_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);