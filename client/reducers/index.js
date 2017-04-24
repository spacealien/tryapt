import { combineReducers } from 'redux';
import EmployeeReducer from './reducer_employee.jsx';
import AuthReducer from './reducer_auth.jsx';

const rootReducer = combineReducers({
    employees: EmployeeReducer,
    auth: AuthReducer
});

export default rootReducer;