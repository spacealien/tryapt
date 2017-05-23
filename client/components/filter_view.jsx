import React from 'react';
import ReactDOM from 'react-dom';

import Filter from '../components/filter.jsx';
import { connect } from 'react-redux';
import { addPosition } from '../actions/employee_action';
import { bindActionCreators } from 'redux';
//import { fetchEmployees, selectEmployee } from '../actions/employee_action';
//import { bindActionCreators } from 'redux';


class FilterView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Filter /> 
        );
    }
}
export default FilterView;
