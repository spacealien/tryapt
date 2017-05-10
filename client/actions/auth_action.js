import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';


export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UNMARK_ALL_EMPLOYEES = 'UNMARK_ALL_EMPLOYEES';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    }
}

export function attemptLogin(userInput) {
    return dispatch => {
        return axios.post("/my_page/login", {
            email: userInput.email,
            password: userInput.password
        }).then(function (res) {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwtDecode(token)));
        });
    }
};

export function logout(data) {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
  }
}
