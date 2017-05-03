/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { filterEmployees, hideEmployee, showEmployee, updateSorting, togglePositionEmployee } from '../actions/employee_action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import Popup from 'react-popup';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companytry: true,
            companyapt: true,
            companyopt: true,
            men: true,
            women: true,
            /*controller: true,
             manager: true,
             designer: true,
             digital_p: true,
             it_manager: true,
             cantine_manager: true,
             consultant: true,
             creative_manager: true,
             creator: true,
             customer_manager: true,
             manager_pod: true,
             motion: true,
             producer_motion: true,
             project_leader: true,
             receptionist: true,
             accountant: true,
             developer: true,
             accountant_manager: true,*/
            sort: 'firstname',
            show: 'department',
            refresh: true

        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    filter() {
        if (this.props.employees.checked.length === 0)
        {
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
                        this.props.showEmployee(employee);
                    } else
                    {
                        this.props.hideEmployee(employee);
                    }
                }, this);
            } else {
                this.props.employees.checked.map((employee) => {
                    var s = "company" + employee.company.toString().toLowerCase();
                    if (!document.getElementById(s).checked) {
                        this.props.hideEmployee(employee);
                    }
                });
            }
        }
        
        switch (this.state.sort)
        {
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

            case 'firstname':
                this.props.updateSorting('department');
                if (this.state.show === 'department') {
                    this.props.employees.checked.sort(function (a, b) {
                        return a.company > b.company ? 1 : (a.company < b.company ? -1 : (a.name > b.name ? 1 : -1));

                    });
                } else {
                    
                    console.log("HEY");
                    this.props.employees.checked.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    });
                    console.log(this.props.employees.checked);
                }
                break;
            default:
                break;
        }
        var sortStates = [this.state.sort, this.state.show];
        this.props.updateSorting(sortStates);
        browserHistory.goBack();
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    resetFilter() {
        this.props.employees.checked = [];
        this.setState({companytry: true, companyapt: true, companyopt: true, women: true, men: true, sort: 'firstname'});
    }
    showPositions() {
        browserHistory.push('/people/filter/positions');
        console.log(browserHistory);
    }

    handleSort(e) {

        this.setState({
            sort: e
        });
    }
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
                                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-left-c-128.png" />
                            </div>
                            <div className="col-sm-6">
                                <div className="nav-brand center-block"><p>Filtrering</p></div>
                            </div>
                            <div className="col-sm-3 menu-mark-cl">
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
                                    Try
                                </div>
                
                                <div className="col-sm-2 filter-title">
                                    Apt
                                </div>
                
                                <div className="col-sm-2 filter-title">
                                    Opt
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
                
                
                            <div className="row margin-top">
                                <div className="col-sm-6 filter-title">
                                    Velg kjønn:
                                </div>
                
                                <div className="col-sm-3 filter-title">
                                    Kvinner
                                </div>
                                <div className="col-sm-3 filter-title">
                                    Menn
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6"></div>
                                <div className="col-sm-3 filter-title">
                
                                    <div><label>
                                            <input
                                                name="women"
                                                type="checkbox"
                                                checked={this.state.women}
                                                onChange={this.handleInputChange} />
                                        </label></div></div>
                                <div className="col-sm-3 filter-title">
                                    <div><label>
                                            <input
                                                name="men"
                                                type="checkbox"
                                                checked={this.state.men}
                                                onChange={this.handleInputChange} />
                                        </label></div></div>
                            </div>
                            <ul className="list-group margin-top">
                                <li className="list-group-item filterposition">
                                    <div className="row" onClick={
                    () => this.showPositions()}>
                                        <div className="col-sm-6">Velg stillinger</div>
                                        <div className="col-sm-5">{chosenPositions}</div>
                                        <div className="col-sm-1"><img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_right_48px-48.png"/></div></div></li>
                            </ul>
                            <br/>
                            <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-6 margin-top">
                                    <p className="filter-title">Tilpass sortering</p>
                                </div>
                                <div className="col-sm-3"></div>
                            </div>
                            <div className="btn-group btn-group-lg">
                                <button id='firstname' type="button" className={this.state.sort === 'firstname' ? "btn sort-option btn-sort selected" : "btn sort-option btn-sort" } onClick={this.handleSort.bind(this, 'firstname')}>Fornavn</button>
                                <button id='secondname' type="button" className={this.state.sort === 'secondname' ? "btn sort-option btn-sort selected" : "btn sort-option btn-sort" } onClick={this.handleSort.bind(this, 'secondname')}>Etternavn</button>
                                <button id='position' type="button" className={this.state.sort === 'position' ? "btn sort-option selected" : "btn sort-option" } onClick={this.handleSort.bind(this, 'position')} >Stilling</button>
                
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    Velg visning:
                                </div>
                            </div>
                            <div className="btn-group btn-group-lg">
                                <button id='department' type="button" className={this.state.show === 'department' ? "btn sort-option btn-sort selected" : "btn sort-option btn-sort" } onClick={this.handleShow.bind(this, 'department')}>Etter avdeling</button>
                                <button id='all' type="button" className={this.state.show === 'all' ? "btn sort-option btn-sort selected" : "btn sort-option btn-sort" } onClick={this.handleShow.bind(this, 'all')}>Alle</button>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 margin-top">
                                    <div onClick={() => this.filter()} className="filter-submit">Vis ansatte</div>
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
        {hideEmployee, showEmployee, togglePositionEmployee, updateSorting})(Filter);
