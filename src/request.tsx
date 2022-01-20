import axios from "axios"

let url = {
  development: "http://localhost:8000/api/",
  production: "",
};

axios.defaults.withCredentials = true;

const request = axios.create({
  /* @ts-ignore */
  baseURL: url[process.env.NODE_ENV],
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;