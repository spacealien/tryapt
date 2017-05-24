import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { fetchEmployees, selectEmployee } from '../actions/employee_action';
import { bindActionCreators } from 'redux';

import MenuTop from '../containers/menu_top.jsx';

/**
 * Defines the view for the /info URL.
 */
class InfoView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MenuTop
                    menu="default"
                    headline="Informasjon" />

                <div className="row">
                    <div className="col-lg-1 text-center">
                        <p>T.A.O Book</p>
                        <p>Versjon 1.0.0</p>
                        <p>Utviklet på vegne av APT</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default InfoView;
