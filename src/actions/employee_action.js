import axios from 'axios';

export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEE';
export const SELECT_EMPLOYEE = 'SELECT_EMPLOYEE';
export const SEARCH_EMPLOYEE = 'SEARCH_EMPLOYEE';
export const FILTER_EMPLOYEE = 'FILTER_EMPLOYEE';
export const MARK_EMPLOYEE = 'MARK_EMPLOYEE';
export const MARK_ALL_EMPLOYEES = 'MARK_ALL_EMPLOYEES';
export const UNMARK_ALL_EMPLOYEES = 'UNMARK_ALL_EMPLOYEES';

export function fetchEmployees() {
    const request = axios.all([
        axios.get('../apt_persons.json'),
        axios.get('../try_persons.json')
    ]);

    return {
        type: FETCH_EMPLOYEES,
        payload: request
    }
}

export function selectEmployee(employee) {
    return {
        type: SELECT_EMPLOYEE,
        payload: employee
    }
}

export function searchEmployees(term) {
    return {
        type: SERACH_EMPLOYEE,
        payload: term
    }
}

export function filterEmployees(filter) {
    return {
        type: FILTER_EMPLOYEE,
        payload: filter
    }
}

export function markEmployee(employee) {
    return {
        type: MARK_EMPLOYEE,
        payload: employee
    }
}

export function markAllEmployees() {
    return {
        type: MARK_ALL_EMPLOYEES
    }
}

export function unmarkAllEmployees() {
    return {
        type: UNMARK_ALL_EMPLOYEES
    }
}





