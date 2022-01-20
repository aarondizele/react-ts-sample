import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import axios from "axios"

import { Provider } from "react-redux"
import store from "./store";

import countries from "i18n-iso-countries";
import localeFR from "i18n-iso-countries/langs/fr.json"

import './index.css'
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

initializeIcons();
initializeFileTypeIcons();

axios.defaults.withCredentials = true;
axios.defaults.headers = {
  /* @ts-ignore */
  Accept: "application/json",
};
axios.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers!.Authorization = `Bearer ${token}`;
  }
  return req;
})

// ISO Code Setting Language
countries.registerLocale(localeFR);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
