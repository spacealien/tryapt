import React from 'react';
import ListElement from '../components/list_element.jsx';
import GridElement from '../components/grid_element.jsx';
import SearchBar from '../components/search_bar.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { setListView, setGridView } from '../actions/menu_action'
import {
    fetchEmployees,
    selectEmployee,
    markEmployee,
    unmarkEmployee,
    unmarkAllEmployees,
    updateSorting
} from '../actions/employee_action';

/**
 * This class defines the list/grid element in the EmployeeView.
 */
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'list',
        };
    }

    // React lifecycle method that runs before compoment gets mountet and displayed to the view.
    componentWillMount() {
        this.props.fetchEmployees();
        this.props.unmarkAllEmployees();
        this.props.setListView();
    }

    // React lifecycle method that runs before compoment gets unmounted.
    componentWillUnmount() {
        this.props.setGridView();
    }

    // Checks if employee is in the list of marked employees.
    isMarked(employee) {
        var marked = false;
        return this.props.employees.marked.indexOf(employee) > -1 ? marked = true : marked = false;
    }

    // handles click for a list element.
    handleClick(employee) {
        if (this.props.mark === true) {

            this.isMarked(employee) ?
                this.props.unmarkEmployee(employee) : this.props.markEmployee(employee);

        } else {
            const path = '/people/details';
            this.props.selectEmployee(employee);
            browserHistory.push(path);
        }
    }

    // render method for rendering list view.
    renderList() {
        var employees = this.props.employees;
        var { searchTerm } = this.props;

        if (employees.checked.length === 0) {
            var employeeList = employees.all;
        } else {
            var employeeList = employees.checked;
        }

        // returns a list of list elements 
        return employeeList.map((employee) => {

            // filters out diffrent employees based of search term.
            if ((searchTerm === null) ||
                employee.name.toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
                employee.mobile.split(" ").join("").includes(searchTerm) ||
                employee.email.includes(searchTerm) ||
                employee.jobtitle.toLowerCase().includes(searchTerm.toLowerCase())) {


                var marked = this.isMarked(employee);
                return (
                    <ListElement
                        onEmployeeClick={(e) => this.handleClick(e)}
                        key={employee.mobile}
                        employee={employee}
                        mark={this.props.mark}
                        marked={marked}
                    />
                );
            }

        });
    }

    // render method for rendering grid view.
    renderGrid() {
        var employeeList = this.props.employees;
        var { searchTerm } = this.props;
        if (this.props.employees.checked.length === 0) {
            employeeList = this.props.employees.all;
        } else {
            employeeList = this.props.employees.checked;
        }


        // filters out diffrent employees based of search term.
        return employeeList.map((employee) => {
            if ((searchTerm === null) ||
                employee.name.toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
                employee.mobile.split(" ").join("").includes(searchTerm) ||
                employee.email.includes(searchTerm)) {


                var marked = this.isMarked(employee);
                return (
                    <GridElement
                        onEmployeeSelect={(e) => this.handleClick(e)}
                        key={employee.mobile}
                        employee={employee}
                        mark={this.props.mark}
                        marked={marked} />
                );
            }
        });
    }

    // conditionally renders a list with rows or gridview
    render() {
        if (this.props.listView === 'list') {
            return (
                <div>
                    <ul className="list-group list-unstyled">
                        {this.renderList()}
                    </ul>
                </div>

            );
        } else {
            return (
                <div className="grid-view">
                    {this.renderGrid()}
                </div>
            );
        }
    }
}

// Function that makes sure the class gets access to redux store.
// Subscribes for any changes related to employees made to the data in the redux store. 
const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        listView: state.menu.listView
    };
};


// Defines the connection to redux and exports the react class wherevere the
// class is imported.
export default connect(mapStateToProps,
    {
        fetchEmployees,
        selectEmployee,
        markEmployee,
        unmarkEmployee,
        unmarkAllEmployees,
        updateSorting,
        setListView,
        setGridView
    })(List);
