import axios from 'axios';

export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const SELECT_EMPLOYEE = 'SELECT_EMPLOYEE';
export const SEARCH_EMPLOYEE = 'SEARCH_EMPLOYEE';
export const FILTER_EMPLOYEE = 'FILTER_EMPLOYEE';
export const TOGGLE_POSITION = 'TOGGLE_POSITION';
export const UNCHECK_ALL_POSITIONS = 'UNCHECK_ALL_POSITIONS';
export const UNCHECK_ALL_EMPLOYEES = 'UNCHECK_ALL_EMPLOYEES';
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_CHECKED = 'UPDATE_CHECKED';
export const MARK_EMPLOYEE = 'MARK_EMPLOYEE';
export const UNMARK_EMPLOYEE = 'UNMARK_EMPLOYEE';
export const MARK_ALL_EMPLOYEES = 'MARK_ALL_EMPLOYEES';
export const UNMARK_ALL_EMPLOYEES = 'UNMARK_ALL_EMPLOYEES';
export const FETCH_EMPLOYEE = 'FETCH_EMPLOYEE';
export const SET_AUTHENTICATED_EMPLOYEE = 'SET_AUTHENTICATED_EMPLOYEE';


export function fetchEmployees() {
    return dispatch => {
        return axios.get('/api/people')
        .then((request) => {
            dispatch({
                type: FETCH_EMPLOYEES,
                payload: request.data.employees
            });
        });
    };
}

export function findEmployeeByUser(user) {
    return {
        type: FETCH_EMPLOYEE,
        payload: user
    }
}

export function selectEmployee(employee) {
    return {
        type: SELECT_EMPLOYEE,
        payload: employee
    };
}

export function setAuthenticatedEmployee(employee) {
    return {
        type: SET_AUTHENTICATED_EMPLOYEE,
        payload: employee
    }
}

export function searchEmployees(term) {
    return {
        type: SEARCH_EMPLOYEE,
        payload: term
    };
}

export function filterEmployees(filter) {
    return {
        type: FILTER_EMPLOYEE,
        payload: filter
    };
}


export function togglePosition(position) {
    return {
        type: TOGGLE_POSITION,
        payload: position
    };
}

export function uncheckPositions() {
    return {
        type: UNCHECK_ALL_POSITIONS
    };
}
export function emptyFilterList() {
    return {
        type: UNCHECK_ALL_EMPLOYEES
    };
}


export function hideEmployee(employee, mobile) {
    return {
        type: REMOVE_EMPLOYEE,
        mobile: mobile,
        payload: employee
    };
}

export function showEmployee(employee, mobile) {
    return {
        type: ADD_EMPLOYEE,
        mobile: mobile,
        payload: employee
    };
}
export function updateSorting(states) {
    return {
        type: UPDATE_CHECKED,
        payload: states
    };
}

export function markEmployee(employee) {
    return {
        type: MARK_EMPLOYEE,
        payload: employee
    };
}

export function unmarkEmployee(employee) {
    return {
        type: UNMARK_EMPLOYEE,
        payload: employee
    };

}

export function markAllEmployees() {
    return {
        type: MARK_ALL_EMPLOYEES
    };
}

export function unmarkAllEmployees() {
    return {
        type: UNMARK_ALL_EMPLOYEES
    };
}





