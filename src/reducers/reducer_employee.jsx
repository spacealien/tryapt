import {
    FETCH_EMPLOYEES,
    SELECT_EMPLOYEE,
    SEARCH_EMPLOYEE,
    FILTER_EMPLOYEE,
    MARK_EMPLOYEE,
    UNMARK_EMPLOYEE,
    MARK_ALL_EMPLOYEES,
    UNMARK_ALL_EMPLOYEES
} from '../actions/employee_action';

const INITIAL_STATE = {
    all: [],
    visible: [],
    marked: [],
    selectedEmployee: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_EMPLOYEES:
            const data = action.payload[0].data
                .concat(action.payload[1].data);

            return Object.assign({}, state, {
                all: data,
                visible: data
            });

        case SELECT_EMPLOYEE:
            return Object.assign({}, state, {
                selectedEmployee: action.payload
            });

        case SEARCH_EMPLOYEE:
            return Object.assign({}, state, {
                visible: action.payload
            });

        case FILTER_EMPLOYEE:
            // filtrere data her her


            return Object.assign({}, state, {
                visible: newList
            });

        case MARK_EMPLOYEE:
            var array = state.marked;
            var index = array.indexOf(action.payload);
            
            if (index !== -1) {
                array.splice(index, 1);
                return Object.assign({}, state, {
                    marked: array
                });
            } else {
                return Object.assign({}, state, {
                    marked: array.concat(action.payload)
                });
            }

        case MARK_ALL_EMPLOYEES:
            const array = state.all;
            return Object.assign({}, state, {
                marked: array
            });

        case UNMARK_ALL_EMPLOYEES:
            return Object.assign({}, state, {
                marked: []
            });

        default:
            return state;
    }
}