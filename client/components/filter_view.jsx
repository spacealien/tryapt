import React from 'react';
import ReactDOM from 'react-dom';

import Filter from '../components/filter.jsx';
import { connect } from 'react-redux';
import { addPosition } from '../actions/employee_action';
import { bindActionCreators } from 'redux';

/**
 * The FilterView component includes the top menu and the main content
 * consists of buttons and choices to filter and sort the list of employees. 
 */
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
