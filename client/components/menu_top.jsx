import React from 'react';
import SearchBar from './search_bar.jsx';
import MarkDropdown from './mark_dropdown.jsx';

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

    enableEmployeeMarking() {
        if (this.props.mark === false) {
            this.props.onMenuClick(true);
            this.setState({ markMode: 'on' });
        } else {
            this.props.onMenuClick(false);
            this.setState({ markMode: 'off' });
            this.props.unmarkAllEmployees();
        }
    }

    showFilter() {
        browserHistory.push('/people/filter');
    }

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

    renderMarkMenu() {
        console.log(this.props.searchTerm);
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
                        <div className="filter-menu btn" onClick={() => this.showFilter()}><img src="https://cdn2.iconfinder.com/data/icons/cute-tech-icon-set-1/512/Filter-128.png" width="80%" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderPeopleMenu() {
        console.log(this.props.searchTerm);
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
                        <div className="filter-menu btn" onClick={() => this.showFilter()}><img src="https://cdn2.iconfinder.com/data/icons/cute-tech-icon-set-1/512/Filter-128.png" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSearchBar() {
        return (
            <div className="navbar navbar-fixed-top ">
                <div className="row">
                    <SearchBar onSearchTermChange={searchTerm => this.props.onSearchTermChange(searchTerm)} />
                </div>
            </div>
        );
    }

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
    /* renderEmployeeMenu() {
         return (
             <div className="navbar navbar-fixed-top ">
                 <div className="row">
                     <div className="col-sm-2 menu-txt">
                     <img onClick={
                         () =>
                             browserHistory.goBack()} src="https://cdn4.iconfinder.com/data/icons/developer-set-3/128/arrowleft-48.png" />
                             
                     </div>
                     <div className="col-sm-8">
                         <div className="nav-brand center-block"><p>{this.props.headline}</p></div>
                     </div>
                     <div className="col-sm-2 menu-txt">
                     </div>
                 </div>
             </div>
         );
     }*/
    renderDefaultBackMenu() {
        return (
            <div className="navbar navbar-fixed-top ">
                <div className="row">
                    <div className="col-sm-2 menu-txt">
                        <img onClick={
                            () =>
                                browserHistory.goBack()} src="https://cdn4.iconfinder.com/data/icons/developer-set-3/128/arrowleft-48.png" />

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
                if (this.state.markMode === 'on')
                    return this.renderMarkMenu();
                else
                    return this.renderPeopleMenu();
            case "myPage":
                return this.renderMyPageMenu();

        }
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { logout, unmarkAllEmployees, markAllEmployees })(MenuTop);
