import axios from 'axios';


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function attemptLogin(userInput) {

    const request = axios.post("/test", {
        email: userInput.email,
        password: userInput.password
    }).then(function (res) {
        console.log(res);
    })

    return {
        type: LOGIN_REQUEST,
        payload: request
    }
}
