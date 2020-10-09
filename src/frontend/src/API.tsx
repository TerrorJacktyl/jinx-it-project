import axios from 'axios';


const BASE_URL = process.env.REACT_APP_API_URL;

// const apiClient = axios.create({
//     baseURL: BASE_URL
// })

export default axios.create({
    baseURL: BASE_URL,
    // responseType: 'json',
})