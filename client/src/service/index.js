import axios from "axios";


const api = axios.create();
const statusCheck = {
    validateStatus: (status) => {
        if (status === 401) {
            // remove token from local storage unAuthorize
            localStorage.jwtToken = ''
            window.location.reload(true)
        } else if (status === 500) {
            alert('Could not connect to server')
        } else {
            return true;
        }
    }
}

function onError(response) {
    return response;
}

function onSuccess(response) {
    return response;
}

export const setToken = (token) => {
    axios.defaults.headers.common["Authorization"] = token;
    api.defaults.headers.common['Authorization'] = token;
}
export const removeToken = () => {
    api.defaults.headers.common['Authorization'] = '';
    axios.defaults.headers.common["Authorization"] = '';
}

api.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;
api.defaults.headers.post["Content-Type"] = "multipart/form-data";
api.defaults.headers.post["Accept"] = "*/*";
api.defaults.headers.common['Authorization'] = localStorage.jwtToken || ''

const baseUrl = {
    auth: '/v1/auth/',
    messenger: '/v1/messenger',
}

export const authService = {
    signUp: (data) => api.post(baseUrl.auth + `signup`, data, statusCheck).then(onSuccess, onError),
    signIn: (data) => api.post(baseUrl.auth + `signin`, data, statusCheck).then(onSuccess, onError),
    signOut: (data) => api.post(baseUrl.auth + `signout`, data, statusCheck).then(onSuccess, onError),
}

export const messengerService = {
    getRooms: (data) => api.post(baseUrl.messenger + `/getRooms`, data, statusCheck).then(onSuccess, onError),
    getUsers: (data) => api.post(baseUrl.messenger + `/getUsers`, data, statusCheck).then(onSuccess, onError),
    getMessages: (data) => api.post(baseUrl.messenger + `/messages`, data, statusCheck).then(onSuccess, onError),
    createOneToOneRoom: (data) => api.post(baseUrl.messenger + `/createOneToOneRoom`, data, statusCheck).then(onSuccess, onError),
}