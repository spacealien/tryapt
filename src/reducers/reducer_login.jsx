import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE

} from '../actions/login_action';

const INITIAL_STATE = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            const data = action.payload[0].data
                .concat(action.payload[1].data);

            return Object.assign({}, state, {
                all: data,
                visible: data
            });
        case LOGIN_SUCCESS:

        case LOGIN_FAILURE:

        default :
            return state;
    }
}