/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { fetchEmployees, togglePositionEmployee, uncheckPositions, togglePosition} from '../actions/employee_action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PositionListElement from './position_list_element.jsx';
//import Popup from 'react-popup';

class Positions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          refresh: false 
        };
        //this.handleInputChange = this.handleInputChange.bind(this);
    }

    

    /*handleInputChange(event) {
     const target = event.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;
     this.setState({
     [name]: value
     });
     }*/
    resetPositions() {
        this.props.uncheckPositions();
        this.setState({refresh: !this.state.refresh});
    }

    savePositions() {
        browserHistory.goBack();
    }

    handleClick(position) {
        this.props.togglePosition(position);
        this.props.employees.all.forEach(function (employee) {
            //console.log(employee.jobtitle);
            if (employee.jobtitle === position)
                this.props.togglePositionEmployee(employee);
        }, this);
        console.log(this.props.employees.checked);
        this.setState({refresh: !this.state.refresh});

    }

    render() {
        console.log("render");
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
                console.log("Positions før indexOf:");
                console.log(this.props.employees.checked);
                this.props.employees.positions.indexOf(employee.jobtitle) > -1 ? checked = true : checked = false;
                console.log(employee.jobtitle + ": " + checked);
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
                            <div className="col-sm-3" >
                                <img onClick={
                        () =>
                            browserHistory.goBack()} src="https://cdn4.iconfinder.com/data/icons/developer-set-3/128/arrowleft-48.png" />
                            </div>
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
const mapStateToProps = (state) => {
    return {
        employees: state.employees
    };
};
export default connect(mapStateToProps,
        {fetchEmployees, togglePositionEmployee, uncheckPositions, togglePosition})(Positions);
