import axios from 'axios'

const oDAxios = axios.create({
    baseURL: process.env.OPEN_DOTA_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'max-age=0'
    }
})

export default oDAxios;