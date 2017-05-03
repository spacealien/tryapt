import axios from 'axios';

export default function setAuthorizationToken(token) {
    if (token) {
        console.log("setAuthorizationToken");
        console.log(token);
        
        axios.defaults.headers['Authorization'] = token;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}