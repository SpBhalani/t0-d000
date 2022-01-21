import axios from 'axios'

const token = window.localStorage.getItem('token')

export const axiosInstance = axios.create({
    baseURL:"https://t0-d00.herokuapp.com/api",
    headers:{
        authorization : token ? `Bearer ${token}` : " "
    }
})