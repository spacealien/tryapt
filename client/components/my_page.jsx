import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { fetchEmployees, selectEmployee } from '../actions/employee_action';
import { bindActionCreators } from 'redux';
import MenuTop from '../containers/menu_top.jsx';


/**
 * Acts as a parent component for login and 
 * user page.
 */
class UserView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/* Renders child components consisting of either login view or 
                    the my_pagen, which require authentication.
                    The children is defined in the /client/routes/routers.jsx file. */}
                {this.props.children}
            </div>
        );
    }
}
export default UserView;
