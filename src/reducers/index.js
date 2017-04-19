import { combineReducers } from 'redux';
import EmployeeReducer from './reducer_employee.jsx';

const rootReducer = combineReducers({
    employees: EmployeeReducer,
});

export default rootReducer;