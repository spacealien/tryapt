/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { filterEmployees, hideEmployee, showEmployee, updateSorting, emptyFilterList, uncheckPositions } from '../actions/employee_action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

    /*
     * This class renders the filter view and handles the filtration of employees
     */
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companytry: true,
            companyapt: true,
            companyopt: true,
            sort: 'name',
            show: 'department',
            refresh: true

        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    /*
     * This method filters the employees. If the result list is empty, employees
     * are added to the list of results if their company is checked.
     * If the result list is not empty, the method checks wether any positions are
     * chosen. If not, the employees are either added to or removed from the list
     * of results, based on wether or not their company is checked.
     * If the result list is not empty, and positions are checked, only employees
     * with chosen positions and checked companies will be added to the list.
     */
    filter(e) {
        e.preventDefault();

        if (this.props.employees.checked.length === 0) {
            this.props.employees.all.forEach(function (employee) {
                var s = "company" + employee.company.toString().toLowerCase();
                if (document.getElementById(s).checked)
                    this.props.showEmployee(employee);
            }, this);
        } else {
            if (this.props.employees.positions.length === 0) {
                this.props.employees.all.forEach(function (employee) {
                    var s = "company" + employee.company.toString().toLowerCase();
                    if (document.getElementById(s).checked) {
                        this.props.showEmployee(employee, employee.mobile);
                    } else {
                        this.props.hideEmployee(employee, employee.mobile);
                    }
                }, this);
            } else {
                this.props.emptyFilterList();
                this.props.employees.all.map((employee) => {
                    var s = "company" + employee.company.toString().toLowerCase();
                    if (document.getElementById(s).checked) {
                        this.props.employees.positions.forEach(function (position) {
                            if (employee.jobtitle === position)
                                this.props.showEmployee(employee, employee.mobile);
                        }, this);
                    }
                });
            }
        }
        /*
         * This statement handles the way the employees are sorted in the list
         */
        switch (this.state.sort) {
            case 'position':
                if (this.state.show === 'department') {
                    this.props.employees.checked.sort(function (a, b) {
                        return a.company > b.company ? 1 : (a.company < b.company ? -1 : (a.jobtitle > b.jobtitle ? 1 : -1));
                    });
                } else {
                    this.props.employees.checked.sort(function (a, b) {
                        if (a.jobtitle > b.jobtitle) {
                            return 1;
                        }
                        if (a.jobtitle < b.jobtitle) {
                            return -1;
                        }
                        return 0;
                    });
                }
                break;

            case 'name':
                this.props.updateSorting('department');
                if (this.state.show === 'department') {
                    this.props.employees.checked.sort(function (a, b) {
                        return a.company > b.company ? 1 : (a.company < b.company ? -1 : (a.name > b.name ? 1 : -1));

                    });
                } else {

                    this.props.employees.checked.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    });
                }
                break;
            default:
                break;
        }
        var sortStates = [this.state.sort, this.state.show];
        this.props.updateSorting(sortStates);
        browserHistory.goBack();
    }

    /*
     * This method handles the change of states when an event is fired on a
     * checkbox
     */
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    /*
     * This method resets the filters, both the result lists, position list and
     * sets the states.
     */
    resetFilter() {
        this.props.emptyFilterList();
        this.props.uncheckPositions();
        this.setState({ companytry: true, companyapt: true, companyopt: true, sort: 'name', show: 'department' });
    }

    /*
     * Show list of positions
     */
    showPositions() {
        browserHistory.push('/people/filter/positions');
    }

    //Change sort option, name or position
    handleSort(e) {

        this.setState({
            sort: e
        });
    }
    //Change sort option, department or all
    handleShow(e) {

        this.setState({
            show: e
        });
    }

    render() {
        var chosenPositions = this.props.employees.positions.length > 1 ? this.props.employees.positions.length + " stillinger valgt" : (this.props.employees.positions.length > 0 ? this.props.employees.positions.length + " stilling valgt" : "");
        return (
            <div>
                <div className="navbar navbar-fixed-top ">
                    <div className="row">
                        <div className="col-sm-3" >
                        </div>
                        <div className="col-sm-6">
                            <div className="nav-brand center-block"><p>Filtrering</p></div>
                        </div>
                        <div className="col-sm-3 menu-txt">
                            <a onClick={() => this.resetFilter()}>Tilbakestill</a>
                        </div>

                    </div>
                </div>
                <div className="filter-box">
                    <form>
                        <div className="row margin-top">
                            <div className="col-sm-6 filter-title">
                                Velg selskap:
                                </div>
                            <div className="col-sm-2 filter-title">
                                TRY
                                </div>

                            <div className="col-sm-2 filter-title">
                                APT
                                </div>

                            <div className="col-sm-2 filter-title">
                                OPT
                                </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">

                            </div>
                            <div className="col-sm-2 filter-title">
                                <label>
                                    <input
                                        id="companytry"
                                        name="companytry"
                                        type="checkbox"
                                        checked={this.state.companytry}
                                        onChange={this.handleInputChange} />
                                </label>
                            </div>

                            <div className="col-sm-2 filter-title">
                                <label>
                                    <input
                                        id="companyapt"
                                        name="companyapt"
                                        type="checkbox"
                                        checked={this.state.companyapt}
                                        onChange={this.handleInputChange} />
                                </label>
                            </div>


                            <div className="col-sm-2 filter-title">

                                <div><label>
                                    <input
                                        id="companyopt"
                                        name="companyopt"
                                        type="checkbox"
                                        checked={this.state.companyopt}
                                        onChange={this.handleInputChange} />
                                </label></div></div>
                        </div>


                        <ul className="list-group margin-top">
                            <li className="list-group-item filterposition">
                                <div className="row" onClick={
                                    () => this.showPositions()}>
                                    <div className="col-sm-6">Velg stillinger</div>
                                    <div className="col-sm-5">{chosenPositions}</div>
                                    <div className="col-sm-1"><img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_right_48px-48.png" /></div></div></li>
                        </ul>
                        <br />
                        <br />
                        <br />

                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6 margin-top">
                                <p className="filter-title">Tilpass sortering</p>
                            </div>
                            <div className="col-sm-3"></div>

                        </div>
                        <div className="margin-top btn-group btn-group-lg">
                            <button id='name' type="button" className={this.state.sort === 'name' ? "btn sort-option btn-sort btn-long selected" : "btn sort-option btn-long btn-sort"} onClick={this.handleSort.bind(this, 'name')}>Navn</button>
                            <button id='position' type="button" className={this.state.sort === 'position' ? "btn sort-option btn-long selected" : "btn sort-option btn-long"} onClick={this.handleSort.bind(this, 'position')} >Stilling</button>

                        </div>
                        <br />
                        <br />
                        <div className="row margin-top">
                            <div className="col-sm-12">
                                <p className="filter-title">Velg visning:</p>
                            </div>
                        </div>
                        <div className="margin-top btn-group btn-group-lg">
                            <button id='department' type="button" className={this.state.show === 'department' ? "btn sort-option btn-sort btn-long selected" : "btn sort-option btn-sort btn-long"} onClick={this.handleShow.bind(this, 'department')}>Etter avdeling</button>
                            <button id='all' type="button" className={this.state.show === 'all' ? "btn sort-option btn-long selected" : "btn sort-option btn-long"} onClick={this.handleShow.bind(this, 'all')}>Alle</button>
                        </div>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-sm-12 margin-top">
                                <button onClick={(e) => this.filter(e)} className="btn btnPrimary main-btn full-btn">Vis ansatte</button>
                            </div>
                        </div>

                    </form>
                </div>
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
    { hideEmployee, showEmployee, emptyFilterList, updateSorting, uncheckPositions })(Filter);
