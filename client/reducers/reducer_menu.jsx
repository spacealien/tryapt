import _ from 'underscore';
import {
    LIST_VIEW
} from '../actions/menu_action.js';

const INITIAL_STATE = {
    listView: 'default'
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    
        case LIST_VIEW:
            return Object.assign({}, state, {
                listView: action.payload
            });
            
        default:
            return state;
    }
}