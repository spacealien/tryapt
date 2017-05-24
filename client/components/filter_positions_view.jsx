import React from 'react';
import ReactDOM from 'react-dom';

import Positions from '../containers/positions.jsx';
import { connect } from 'react-redux';
import { addPosition } from '../actions/employee_action';
import { bindActionCreators } from 'redux';

/**
 * The FilterPositionView component includes the top menu and the main content
 * consists of a list of positions. 
 */
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
