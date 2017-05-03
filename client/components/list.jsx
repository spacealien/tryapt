import React from 'react';
import ListElement from './list_element.jsx';
import GridElement from './grid_element.jsx';
import GridListTab from './grid_list_tab.jsx';
import SearchBar from './search_bar.jsx';

import { connect } from 'react-redux';
import { fetchEmployees, selectEmployee, markEmployee, unmarkAllEmployees, updateSorting } from '../actions/employee_action';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';


class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            view: 'list'
        };
    }

    

    getGridListTab() {
        return (
                <GridListTab
                    onChangeView={(view) => this.setState({view: view })}
                    view={this.state.view}
                    />
                    );
        }

        handleClick(employee) {
            console.log(employee);
            if (this.props.mark === true) {
                this.props.markEmployee(employee);
            } else {
                const path = '/people/details';
                this.props.selectEmployee(employee);
                browserHistory.push(path);
            }
            console.log(this.props.employees.marked);
        }

        renderList() {
            
            var employees = this.props.employees;
            if (employees.checked.length === 0)
            {   
                var employeeList = employees.all;
                console.log(employeeList);
            } else
            {
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
            return this.props.employees.all.map((employee) => {
                if ((this.props.searchTerm === null)
                        || employee.name.toLowerCase().includes(this.props.searchTerm.toString().toLowerCase())) {

                    return (
                            <GridElement
                                onEmployeeSelect={(e) => this.handleClick(e)}
                                key={employee.mobile}
                                employee={employee}
                                mark={this.props.mark} />
                            );
                }
            });
        }

        render() {
            console.log(this.props.employees.mark);
            if (this.state.view === 'list') {
                return (
                        <ul className="list-group list-unstyled">
                            {this.renderList()}
                        </ul>
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
            employees: state.employees
        };
    };

    export default connect(mapStateToProps,
            {fetchEmployees, selectEmployee, markEmployee, unmarkAllEmployees, updateSorting})(List);