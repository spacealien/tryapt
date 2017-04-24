import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';


import LoginForm from '../components/login_form.jsx';
import EmployeeView from '../containers/employee_view.jsx';
import LoginView from '../containers/login_view.jsx';
import EmployeeDetails from '../components/employee_details.jsx';
import List from '../components/list.jsx';
import HomeView from '../containers/home_view.jsx';
import InfoView from '../containers/info_view.jsx';
import MyPage from '../components/my_page.jsx';


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
                <Route path="/my_page" component={LoginForm} />
                <Route path="/my_page/user" component={MyPage} />
                <Route path="/info" component={InfoView} />
        </Route>
);


