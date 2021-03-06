
import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { fetchEmployees, showEmployee, uncheckPositions, togglePosition } from '../actions/employee_action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PositionListElement from '../components/position_list_element.jsx';


class Positions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false
        };
    }


    resetPositions() {
        this.props.uncheckPositions();
        this.setState({ refresh: !this.state.refresh });
    }

    savePositions() {
        browserHistory.goBack();
    }

    handleClick(position) {
        this.props.togglePosition(position);
        this.props.employees.all.forEach(function (employee) {
            if (employee.jobtitle === position)
                this.props.showEmployee(employee, employee.mobile);
        }, this);
        this.setState({ refresh: !this.state.refresh });

    }

    render() {
        var rows = [];
        var lastPosition = null;

        var employeeList = this.props.employees.all;
        employeeList.sort(function (a, b) {
            if (a.jobtitle > b.jobtitle) {
                return 1;
            }
            if (a.jobtitle < b.jobtitle) {
                return -1;
            }
            return 0;
        });

        employeeList.map((employee) => {
            if (employee.jobtitle !== lastPosition) {
                var checked = false;
                this.props.employees.positions.indexOf(employee.jobtitle) > -1 ? checked = true : checked = false;
                rows.push(
                    <PositionListElement
                        onPositionClick={(e) => this.handleClick(e)}
                        jobtitle={employee.jobtitle}
                        key={employee.jobtitle}
                        checked={checked}
                    />);
            }
            lastPosition = employee.jobtitle;
        });
        return (
            <div>
                <div className="navbar navbar-fixed-top ">
                    <div className="row">
                        <div className="col-sm-2 menu-txt" >
                            <img onClick={
                                () =>
                                    browserHistory.goBack()} src="https://cdn4.iconfinder.com/data/icons/developer-set-3/128/arrowleft-48.png" />
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-6">
                            <div className="nav-brand center-block"><p>Filtrer stillinger</p></div>
                        </div>
                        <div className="col-sm-3 menu-txt">
                            <a onClick={() => this.resetPositions()}>Tilbakestill</a>
                        </div>

                    </div>
                </div>
                <form>
                    <ul className="list-group">
                        {rows}
                    </ul>
                </form>
            </div>
        );
    }

}

// Function that makes sure the class gets access to redux store.
// Subscribes for any changes related to employees made to the data in the redux store. 
const mapStateToProps = (state) => {
    return {
        employees: state.employees
    };
};

// Defines the connection to redux and exports the react class wherevere the
// class is imported.
export default connect(mapStateToProps,
    { fetchEmployees, showEmployee, uncheckPositions, togglePosition })(Positions);
