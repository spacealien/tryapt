import _ from 'underscore';
import {
    SET_CURRENT_USER
} from '../actions/auth_action.js';

const INITIAL_STATE = {
    isAuthenticated: false,
    user: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        // pushes the token, which holds information about a user to the redux store.
        case SET_CURRENT_USER:
            return Object.assign({}, state, {
                isAuthenticated: !_.isEmpty(action.user),
                user: action.user.token
            });
        default:
            return state;
    }
}