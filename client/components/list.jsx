import React from 'react';
import ListElement from './list_element.jsx';
import GridElement from './grid_element.jsx';
import SearchBar from './search_bar.jsx';

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



class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            view: 'list'
        };
    }


    componentWillMount() {
        this.props.fetchEmployees();
        this.props.unmarkAllEmployees();
        this.props.setListView();
    }

    componentWillUnmount() {
        this.props.setGridView();
    }

    isMarked(employee) {
        var marked = false;
        return this.props.employees.marked.indexOf(employee) > -1 ? marked = true : marked = false;
    }

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






    renderList() {

        var employees = this.props.employees;
        console.log(employees.all);
        if (employees.checked.length === 0) {
            var employeeList = employees.all;
        } else {
            var employeeList = employees.checked;
            console.log(employeeList);
        }
        return employeeList.map((employee) => {
            if ((this.props.searchTerm === null) ||
                employee.name.toLowerCase().includes(this.props.searchTerm.toString().toLowerCase())) {

                var marked = false;
                this.props.employees.marked.indexOf(employee) > -1 ? marked = true : marked = false;
                console.log("marked: " + marked);
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

    renderGrid() {

        var employees = this.props.employees;
        if (employees.checked.length === 0) {
            var employeeList = employees.all;
        } else {
            var employeeList = employees.checked;
        }

        return this.props.employees.all.map((employee) => {
            if ((this.props.searchTerm === null) ||
                employee.name.toLowerCase().includes(this.props.searchTerm.toString().toLowerCase())) {


                var marked = false;
                this.props.employees.marked.indexOf(employee) > -1 ? marked = true : marked = false;
                console.log("marked: " + marked);

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

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        listView: state.menu.listView
    };
};

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
