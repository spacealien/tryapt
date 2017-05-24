import React from 'react';
import SearchBar from '../components/search_bar.jsx';
import MarkDropdown from '../components/mark_dropdown.jsx';

import { connect } from 'react-redux';
import { logout } from '../actions/auth_action';
import { browserHistory } from 'react-router'

import {
    fetchMarkedEmployees,
    unmarkAllEmployees,
    markAllEmployees
} from '../actions/employee_action';


class MenuTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markMode: 'off'
        };
    }


    //Enables marking for the list view
    enableEmployeeMarking() {
        if (this.props.mark === false) {
            this.props.markMode(true);
            this.setState({ markMode: 'on' });
        } else {
            this.props.markMode(false);
            this.setState({ markMode: 'off' });
            this.props.unmarkAllEmployees(); // unmark all employees in the redux store.
        }
    }

    showFilter() {
        browserHistory.push('/people/filter');
    }

    // toggle on/off marking of all employees.
    onToggleMarkAll(isAllMarked) {
        if (!isAllMarked) {
            this.props.markAllEmployees();
            this.props.onMenuClick(true);
        } else {
            this.props.unmarkAllEmployees();
            this.props.onMenuClick(false);
        }
    }

    sendToMarked(e) {
        var id = e.target.id;
        switch (id) {
            case 'email':
                this.sendEmailToMarked();
                break;
            case 'sms':
                this.sendSmsToMarked();
                break;
        }
    }

    // sends sms to all marked employees
    sendSmsToMarked() {
        var sendString = '';
        this.props.employees.marked.map((employee) => {
            sendString += employee.mobile.split(" ").join("") + ",";
        });

        if (sendString.length > 0) {
            var link = "sms:" + sendString;
        }
        window.location.href = link;
    }

    // sends email to all marked employees
    sendEmailToMarked() {
        var sendString = '';
        this.props.employees.marked.map((employee) => {
            sendString += employee.email + ";";
        });

        if (sendString.length > 0) {

            var link = "mailto:" + sendString
                + "?cc=myCCaddress@example.com"
                + "&subject=" + escape("Hei");

            window.location.href = link;
        }
    }

    // render the menu for when mark mode is enables
    renderMarkMenu() {
        return (
            <div className="navbar navbar-fixed-top ">
                <div className="row">
                    <div className="col-sm-2 menu-txt" >
                        <MarkDropdown
                            sendToMarked={(e) => this.sendToMarked(e)}
                            onToggleMarkAll={(isAllMarked) => this.onToggleMarkAll(isAllMarked)}
                            onBack={() => this.enableEmployeeMarking()} />
                    </div>
                    <div className="col-sm-8">
                        <div className="nav-brand center-block"><p>{this.props.employees.marked.length} markert</p></div>
                        <div>
                            <SearchBar
                                searchTerm={this.props.searchTerm}
                                onSearchTermChange={searchTerm => this.props.onSearchTermChange(searchTerm)} /></div>
                    </div>
                    <div className="col-sm-2">
                        <div className="filter-menu btn" onClick={() => this.showFilter()}><img src="https://cdn2.iconfinder.com/data/icons/cute-tech-icon-set-1/512/Filter-128.png" width="80%" alt="back-arrow" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // render default the menu for employee view
    renderPeopleMenu() {
        return (
            <div className="navbar navbar-fixed-top ">
                <div className="row">
                    <div className="col-sm-2 menu-txt" onClick={() => this.enableEmployeeMarking()}  >
                        <a>Marker</a>
                    </div>
                    <div className="col-sm-8">
                        <div className="nav-brand center-block"><p>{this.props.headline}</p></div>

                        <div><SearchBar
                            searchTerm={this.props.searchTerm}
                            onSearchTermChange={searchTerm => this.props.onSearchTermChange(searchTerm)} /></div>
                    </div>
                    <div className="col-sm-2">
                        <div className="filter-menu btn" onClick={() => this.showFilter()}><img src="https://cdn2.iconfinder.com/data/icons/cute-tech-icon-set-1/512/Filter-128.png" alt="filter icon" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // default empty top menu, displays logo only.
    renderDefaultMenu() {
        return (
            <div className="navbar navbar-fixed-top ">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="nav-brand center-block"><p>{this.props.headline}</p></div>
                    </div>
                </div>
            </div>
        );
    }

    // render menu for authenticated user in MyPage 
    renderMyPageMenu() {
        return (
            <div className="navbar navbar-fixed-top ">
                <div className="row">
                    <div className="col-sm-3 menu-txt"> </div>
                    <div className="col-sm-6">
                        <div className="nav-brand center-block"><p>{this.props.headline}</p></div>
                    </div>
                    <div className="col-sm-3 menu-txt">
                        <a onClick={(e) => { e.preventDefault(); this.props.logout(); }} >Logg av</a>
                    </div>
                </div>
            </div>
        );
    }

    // render default menu with headline and back button.
    renderDefaultBackMenu() {
        return (
            <div className="navbar navbar-fixed-top ">
                <div className="row">
                    <div className="col-sm-2 menu-txt">
                        <img
                            onClick={() => browserHistory.goBack()}
                            src="https://cdn4.iconfinder.com/data/icons/developer-set-3/128/arrowleft-48.png" alt="back-arrow" />

                    </div>
                    <div className="col-sm-8">
                        <div className="nav-brand center-block"><p>{this.props.headline}</p></div>
                    </div>
                    <div className="col-sm-2 menu-txt">
                    </div>
                </div>
            </div>
        );
    }


    render() {
        switch (this.props.menu) {
            case "default":
                return this.renderDefaultMenu();
            case "default-with-back":
                return this.renderDefaultBackMenu();
            case "list":
                if (this.state.markMode === 'on') return this.renderMarkMenu();
                else return this.renderPeopleMenu();
            case "myPage":
                return this.renderMyPageMenu();
        }
    }
}


// Function that makes sure the class gets access to redux store.
// Subscribes for any changes related to employees made to the data in the redux store. 
const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        isAuthenticated: state.auth.isAuthenticated
    }
}

// Defines the connection to redux and exports the react class wherevere the
// class is imported.
export default connect(mapStateToProps, { logout, unmarkAllEmployees, markAllEmployees })(MenuTop);
