import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { fetchEmployees, selectEmployee } from '../actions/employee_action';
import { bindActionCreators } from 'redux';

import MenuTop from '../components/menu_top.jsx';


// TODO
class LoginView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p> TODO </p>
            </div>
        );
    }
}
export default LoginView;
