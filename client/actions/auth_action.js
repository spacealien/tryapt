import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken.js';
import jwt from 'jsonwebtoken';


export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UNMARK_ALL_EMPLOYEES = 'UNMARK_ALL_EMPLOYEES';


export function attemptLogin(userInput) {
    console.log("attemptLogin");
    return dispatch => {
        return axios.post("/test", {
            email: userInput.email,
            password: userInput.password
        }).then(function (res) {
            console.log(res);


            dispatch({
                type: SET_CURRENT_USER,
                payload: res
            })
        })
    }
};

export function logutUser() {

    const payload = {

    }

}
