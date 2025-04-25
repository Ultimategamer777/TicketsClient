import axios from "axios"; 

import { useAuthStore } from "../../store/auth.store";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_HOST_API}`,
    withCredentials: true
})

api.interceptors.request.use((config)=>{
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  })

  export default api; 