import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://192.168.219.52:3000/'
})


export default axios