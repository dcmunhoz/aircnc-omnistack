const axios = require('axios');

const api = axios.create({
    baseURL: 'http://192.168.130.109:3333'
});

export default api;