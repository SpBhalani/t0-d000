import axios from 'axios'

const token = window.localStorage.getItem('token')

export const axiosInstance = axios.create({
    baseURL:"http://localhost:5000",
    headers:{
        authorization : token ? `Bearer ${token}` : " "
    }
})