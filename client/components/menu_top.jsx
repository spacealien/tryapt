import React from 'react';
import SearchBar from './search_bar.jsx';
import MarkDropdown from './mark_dropdown.jsx';

import { connect } from 'react-redux';
import { fetchMarkedEmployees, unmarkAllEmployees } from '../actions/employee_action';

class MenuTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markMode: 'off'
        };
    }

    enableSearchBar() {
        this.setState({ menu: 'search' });
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

    renderMarkMenu() {
        return (
            <div className="navbar navbar-fixed-top ">
                <div className="row">
                    <div className="col-sm-2 menu-mark-cl" onClick={() => this.enableEmployeeMarking()} >
                        <img src='https://cdn2.iconfinder.com/data/icons/navigation-set-arrows-part-two/32/Arrow_Back-128.png' width='70%' />
                    </div>
                    <div className="col-sm-2 menu-mark-cl" >
                        <MarkDropdown />
                    </div>
                    <div className="col-sm-4"><span className="nav-brand center-block">{this.props.employees.marked.length} Markert</span></div>

                    <div className="col-sm-2">
                         <div><SearchBar onSearchTermChange={searchTerm => this.props.onSearchTermChange(searchTerm)} /></div>
                    </div>
                    <div className="col-sm-2">
                        <div className="filter-menu"><img src="https://cdn2.iconfinder.com/data/icons/cute-tech-icon-set-1/512/Filter-128.png" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderPeopleMenu() {
        return (
                <div className="navbar navbar-fixed-top ">
                    <div className="row">
                        <div className="col-sm-2 menu-mark-cl" onClick={() => this.enableEmployeeMarking()}  >
                            <img src='https://cdn0.iconfinder.com/data/icons/logistic-2/450/list-512.png' width='70%' />
                        </div>
                        <div className="col-sm-8">
                            <div className="nav-brand center-block"><p>{this.props.headline}</p></div>

                            <div><SearchBar onSearchTermChange={searchTerm => this.props.onSearchTermChange(searchTerm)} /></div>
                        </div>
                        <div className="col-sm-2">
                            <div className="filter-menu"><img src="https://cdn2.iconfinder.com/data/icons/cute-tech-icon-set-1/512/Filter-128.png" />
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

    render() {
        switch (this.props.menu) {
            case "default":
                return this.renderDefaultMenu();
            case "list":
                if (this.state.markMode === 'on')
                 return this.renderMarkMenu();
                else return this.renderPeopleMenu();
        }
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps, {unmarkAllEmployees})(MenuTop);
