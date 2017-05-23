import React from 'react';
import ReactDOM from 'react-dom';

import Positions from '../containers/positions.jsx';
import { connect } from 'react-redux';
import { addPosition } from '../actions/employee_action';
import { bindActionCreators } from 'redux';
//import { fetchEmployees, selectEmployee } from '../actions/employee_action';
//import { bindActionCreators } from 'redux';


class FilterPositionsView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Positions /> 
        );
    }
}
export default FilterPositionsView;
