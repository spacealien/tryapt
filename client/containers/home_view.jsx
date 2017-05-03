import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { fetchEmployees, unmarkAllEmployees, selectEmployee } from '../actions/employee_action';
import { bindActionCreators } from 'redux';

import MenuTop  from '../components/menu_top.jsx';


class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.fetchEmployees();
        this.props.unmarkAllEmployees();
    }

    render() {
        return (
            <div>
                <MenuTop
                    menu="default"
                    headline={"Home"} />

                <p> Home </p>
            </div>
        );
    }
}
    const mapStateToProps = (state) => {
        return {
            employees: state.employees
        };
    };

    export default connect(mapStateToProps,
            {fetchEmployees, selectEmployee, unmarkAllEmployees})(HomeView);
