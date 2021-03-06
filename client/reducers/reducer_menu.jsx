import _ from 'underscore';
import { LIST_VIEW } from '../actions/menu_action.js';

const INITIAL_STATE = {
    listView: 'grid'
};


export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    
        case LIST_VIEW:
            // pushes the new listView state sent with action.payload to the redux store.
            return Object.assign({}, state, {
                listView: action.payload
            });
            
        default:
            return state; 
    }
}