import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { fetchEmployees, selectEmployee } from '../actions/employee_action';
import { bindActionCreators } from 'redux';

import MenuTop from '../containers/menu_top.jsx';

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
                    <div className="info-container">
                    <h1>T.A.O. book</h1>
                    <div className="info-inner">
                    <p>Versjon 1.0.0</p>
                    <p>Denne applikasjonen er utviklet på vegne av Apt.</p>  
                </div>
                </div>
            </div>
        );
    }
}
export default InfoView;
