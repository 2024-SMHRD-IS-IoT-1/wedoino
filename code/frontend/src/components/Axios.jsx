import axios from 'axios'
//axios 설정
const instance = axios.create({
    baseURL : 'http://192.168.219.61:8000/'
})


export default instance 