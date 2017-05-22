import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import EmployeeView from '../components/employee_view.jsx';
import MyPage from '../components/my_page_view.jsx';
import HomeView from '../components/home_view.jsx';
import InfoView from '../components/info_view.jsx';
import EmployeeFilter from '../components/filter_view.jsx';
import FilterPositions from '../components/filter_positions_view.jsx';
import EmployeeDetails from '../containers/employee_details.jsx';
import List from '../containers/list.jsx';
import LoginForm from '../containers/login_form.jsx';
import UserPage from '../containers/user_page.jsx';
import ForgotForm from '../containers/forgot_form.jsx';
import RegisterForm from '../containers/register_form.jsx';
import ForgotResetForm from '../containers/password_reset_form.jsx';
import requireAuth from '../utils/requireAuth.js';


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
                <Route path="/newuser" component={RegisterForm}/>
                <Route path="/info" component={InfoView} />
        </Route>
);


