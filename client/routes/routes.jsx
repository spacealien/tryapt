import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';


import EmployeeView from '../containers/employee_view.jsx';
import MyPage from '../containers/my_page_view.jsx';
import HomeView from '../containers/home_view.jsx';
import InfoView from '../containers/info_view.jsx';
import EmployeeFilter from '../containers/filter_view.jsx';
import FilterPositions from '../containers/filter_positions_view.jsx';
import EmployeeDetails from '../components/employee_details.jsx';
import List from '../components/list.jsx';
import LoginForm from '../components/login_form.jsx';
import UserPage from '../components/user_page.jsx';
import ForgotForm from '../components/forgot_form.jsx';
import ForgotResetForm from '../components/password_reset_form.jsx';
import requireAuth from '../utils/requireAuth.js';



/*
 export const routes = (
        <Route path='/' component={HomeView}>
                <Route path="/people" component={EmployeeView} >
                        <IndexRoute component={List} />
                        <Route path="grid" component={Grid} />
                        <Route path="details" component={EmployeeDetails} />
                        <Route path="filter" component={EmployeeFilter} />
                </Route>
                <Route path="/login" component={LoginForm} />
                <Route path="/info" component={InfoView} />
        </Route>
);
*/

export const routes = (
        <Route path='/' >
                <IndexRoute component={HomeView} />
                <Route path="/people" component={EmployeeView} />
                <Route path="/people/details" component={EmployeeDetails} />
                <Route path="/people/filter" component={EmployeeFilter} />
                <Route path="/people/filter/positions" component={FilterPositions} />
                <Route path="/login" component={LoginForm} />
                <Route path="/my_page" component={MyPage} >
                        <IndexRoute component={ requireAuth(UserPage)} />
                        <Route path="login" component={LoginForm} />
                </Route>
                <Route path="/forgot" component={ForgotForm}/>
                <Route path="/reset*" component={ForgotResetForm} />
                <Route path="/info" component={InfoView} />
                        
        </Route>
);


