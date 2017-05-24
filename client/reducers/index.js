import { combineReducers } from 'redux';
import EmployeeReducer from './reducer_employee.jsx';
import AuthReducer from './reducer_auth.jsx';
import MenuReducer from './reducer_menu.jsx';


/**
 * The root reducer combines all 
 */


const rootReducer = combineReducers({
    employees: EmployeeReducer,
    auth: AuthReducer,
    menu: MenuReducer
});

export default rootReducer;
