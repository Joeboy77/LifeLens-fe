import axios from "axios";

const API_URL = "http://localhost:8080"; // Backend Base URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // To handle cookies (if necessary)
});

export default api;
