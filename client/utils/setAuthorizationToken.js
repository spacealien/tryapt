import axios from 'axios';

export default function setAuthorizationToken(token) {
    console.log("setAuthorizationToken");
    console.log(token);
    if (token) {
        axios.defaults.headers['Authorization'] = token;
        console.log(axios.defaults.headers.common);
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}