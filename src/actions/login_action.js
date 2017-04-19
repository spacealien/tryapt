import axios from 'axios';


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function attemptLogin() {
    console.log("attemptLogin()");
    const request = axios.post("/test", {
        email: 'test@apt.no',
        password: 'password'
    }).then(function (res) {
        console.log(res);
    })

    return {
        type: LOGIN_REQUEST,
        payload: request
    }
}
