import axios from 'axios'
import { getToken } from '../contexts/user-context'


const axiosInstance = axios.create()

//to make retrieving and sending authentication token and request easier. especially for [id] pages as 
//data is being retrieved from external database
axiosInstance.interceptors.request.use(req => {
    const token = getToken();
    if(token){
        req.headers['x-access-token'] = token;
    }
    return req;

},
error => Promise.reject(error)

)

export default axiosInstance;