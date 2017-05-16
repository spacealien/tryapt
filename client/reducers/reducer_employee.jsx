import {
    FETCH_EMPLOYEES,
    SELECT_EMPLOYEE,
    SEARCH_EMPLOYEE,
    FILTER_EMPLOYEE,
    TOGGLE_POSITION,
    TOGGLE_EMPLOYEE,
    REMOVE_EMPLOYEE,
    ADD_EMPLOYEE,
    UNCHECK_ALL_POSITIONS,
    UPDATE_CHECKED,
    MARK_EMPLOYEE,
    UNMARK_EMPLOYEE,
    MARK_ALL_EMPLOYEES,
    UNMARK_ALL_EMPLOYEES,
    FETCH_EMPLOYEE
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
        case FETCH_EMPLOYEES:

            const data = action.payload.apt;
            data.concat(action.payload.try);
            data.concat(action.payload.opt);

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

        case FETCH_EMPLOYEE:
            var emp = null;

            for (var i = 0; i < state.all.length; i++) {

                if (state.all[i].email == action.payload.email) {
                    console.log("MATCH");
                    emp = state.all[i];
                    return Object.assign({}, state, {
                        authenticatedEmployee: emp
                    });
                }
            }

            return Object.assign({}, state, {
                authenticatedEmployee: null
            });


        case TOGGLE_POSITION:
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

        case TOGGLE_EMPLOYEE:
            var filteredList = state.checked;
            var index = filteredList.indexOf(action.payload);

            if (index !== -1) {
                filteredList.splice(index, 1);
                return Object.assign({}, state, {
                    checked: filteredList
                });
            } else {
                return Object.assign({}, state, {
                    checked: filteredList.concat(action.payload)
                });
            }

        case REMOVE_EMPLOYEE:
            var list1 = state.checked;
            var index = list1.indexOf(action.payload);

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
            var index = list2.indexOf(action.payload);
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