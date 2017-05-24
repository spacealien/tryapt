import {
    FETCH_EMPLOYEES,
    SELECT_EMPLOYEE,
    SEARCH_EMPLOYEE,
    FILTER_EMPLOYEE,
    TOGGLE_POSITION,
    UNCHECK_ALL_EMPLOYEES,
    REMOVE_EMPLOYEE,
    ADD_EMPLOYEE,
    UNCHECK_ALL_POSITIONS,
    UPDATE_CHECKED,
    MARK_EMPLOYEE,
    UNMARK_EMPLOYEE,
    MARK_ALL_EMPLOYEES,
    UNMARK_ALL_EMPLOYEES,
    FETCH_EMPLOYEE,
    SET_AUTHENTICATED_EMPLOYEE
} from '../actions/employee_action';

const INITIAL_STATE = {
    all: [],
    visible: [],
    marked: [],
    checked: [],
    positions: [],
    showAfter: 'department',
    selectedEmployee: null,
    authenticatedEmployee: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case FETCH_EMPLOYEES:  // pushes all employees to the redux store.
            const data = action.payload.apt
                .concat(action.payload.opt)
                .concat(action.payload.try)
            return Object.assign({}, state, {
                all: data,
                visible: data
            });
        case SELECT_EMPLOYEE: // saves the selected employee from list view to the store. 
            return Object.assign({}, state, {
                selectedEmployee: action.payload
            });

        case FILTER_EMPLOYEE:
            return Object.assign({}, state, {
                visible: newList
            });

        case FETCH_EMPLOYEE: // finds a specific employee within the list of all employees.
            var emp = null;
            for (var i = 0; i < state.all.length; i++) {
                if (state.all[i].email.toLowerCase() == action.payload.email.toLowerCase()) {
                    emp = state.all[i];
                    return Object.assign({}, state, {
                        authenticatedEmployee: emp
                    });
                }
            }
            return Object.assign({}, state, {
                authenticatedEmployee: null
            });

        case SET_AUTHENTICATED_EMPLOYEE: // pushes data about authentiacted used to the redux store.
            return Object.assign({}, state, {
                authenticatedEmployee: action.payload
            });
        case TOGGLE_POSITION: // hva gjør denne marthe?
            var positionList = state.positions;
            var index = positionList.indexOf(action.payload);

            if (index !== -1) {
                positionList.splice(index, 1);
                return Object.assign({}, state, {
                    positions: positionList
                });
            } else {
                return Object.assign({}, state, {
                    positions: positionList.concat(action.payload)
                });
            }
        case UNCHECK_ALL_EMPLOYEES:
            return Object.assign({}, state, {
                checked: []
            });

        case REMOVE_EMPLOYEE:
            var list1 = state.checked;
            var index = list1.findIndex((employee) => employee.mobile === action.mobile);
            if (index !== -1) {
                list1.splice(index, 1);
                return Object.assign({}, state, {
                    checked: list1
                });
            } else {
                return Object.assign({}, state, {
                    checked: list1
                });
            }
        case ADD_EMPLOYEE:
            var list2 = state.checked;
            var index = list2.findIndex((employee) => employee.mobile === action.mobile);
            if (index === -1) {
                return Object.assign({}, state, {
                    checked: list2.concat(action.payload)
                });
            } else {
                return Object.assign({}, state, {
                    checked: list2
                });
            }

        case UNCHECK_ALL_POSITIONS:
            return Object.assign({}, state, {
                positions: []
            });

        case UPDATE_CHECKED:
            switch (action.payload[0]) {
                case 'position':
                    if (action.payload[1] === 'department') {
                        state.showAfterDepartment = true;
                        state.checked.sort(function (a, b) {
                            return a.company > b.company ? 1 : (a.company < b.company ? -1 : (a.jobtitle > b.jobtitle ? 1 : -1));
                        });
                    } else {
                        state.showAfterDepartment = false;
                        state.checked.sort(function (a, b) {
                            if (a.jobtitle > b.jobtitle) {
                                return 1;
                            }
                            if (a.jobtitle < b.jobtitle) {
                                return -1;
                            }
                            return 0;
                        });
                    }
                    break;

                case 'firstname':
                    if (action.payload[1] === 'department') {
                        state.showAfterDepartment = true;
                        state.checked.sort(function (a, b) {
                            return a.company > b.company ? 1 : (a.company < b.company ? -1 : (a.name > b.name ? 1 : -1));

                        });
                    } else {
                        state.showAfterDepartment = false;
                        state.checked.sort(function (a, b) {
                            if (a.name > b.name) {
                                return 1;
                            }
                            if (a.name < b.name) {
                                return -1;
                            }
                            return 0;
                        });
                    }
                    break;
                default:
                    break;
            }
            return Object.assign({}, state, {
                checked: state.checked
            });

        case MARK_EMPLOYEE: // adds marked employee to the list of employees
            var array = state.marked;
            return Object.assign({}, state, {
                marked: array.concat(action.payload)
            });

        case UNMARK_EMPLOYEE:
            // Removes empoyee from list of marked employees and
            // pushes the new list to the store.
            var array = state.marked;
            var index = array.indexOf(action.payload);

            if (index !== -1) {
                array.splice(index, 1);
                return Object.assign({}, state, {
                    marked: array
                });
            }
            break;
        case MARK_ALL_EMPLOYEES:
            // Mark all employees and send the new state to the redux store.
            const array = state.all;
            return Object.assign({}, state, {
                marked: array.slice()
            });

        case UNMARK_ALL_EMPLOYEES:
            // Unmark all employees and send the new state to the redux store.
            return Object.assign({}, state, {
                marked: []
            });
        default:
            return state;
    }
}