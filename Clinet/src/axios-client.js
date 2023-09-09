import axios from "axios";
import {useStateContext} from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
  baseURL: `http://localhost:8000/api`
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  try{
    const {response} = error;
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN')
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
      console.log(`${process.env.API_BASE_URL}/api`);
    }
  } catch(e){
    console.log(e);
  }
  

  throw error;
})

export default axiosClient