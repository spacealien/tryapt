import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UNMARK_ALL_EMPLOYEES = 'UNMARK_ALL_EMPLOYEES';


// Method for pushing authenticated user to the store.
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    };
}

// Method for creating a post request for logging in. 
export function attemptLogin(userInput) {
    return dispatch => {
        return axios.post("/my_page/login", {
            email: userInput.email,
            password: userInput.password
        }).then(function (res) {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token); // setes token in local storage
            setAuthorizationToken(token); // sets token http header for future requests.
            dispatch(setCurrentUser(jwtDecode(token))); // pushes decoded token data to the redux store
        });
    }
};

// Logout method, removes token thorughout the application.
export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
  }
}

