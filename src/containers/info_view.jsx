import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { fetchEmployees, selectEmployee } from '../actions/employee_action';
import { bindActionCreators } from 'redux';

import MenuTop from '../components/menu_top.jsx';

class InfoView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MenuTop
                    menu="default"
                    headline="Info" />
                <p> info </p>
            </div>
        );
    }
}
export default InfoView;
