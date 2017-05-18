import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UNMARK_ALL_EMPLOYEES = 'UNMARK_ALL_EMPLOYEES';

export function setUserData(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    };
}

export function setProfileData(userInput) {
        return {
        type: SET_CURRENT_USER,
        user: user
    };
};

export function setEmployee() {
        return {
        type: SET_CURRENT_USER,
        user: user
    };
}

