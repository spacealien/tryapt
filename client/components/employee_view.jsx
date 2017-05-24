import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import MenuBottom from '../containers/menu_bottom.jsx';
import MenuTop from '../containers/menu_top.jsx';
import SearchBar from '../components/search_bar.jsx';
import List from '../containers/list.jsx';
import LoginForm from '../containers/login_form.jsx';
import EmployeeDetails from '../containers/employee_details.jsx';

/**
 * EmployeeView includes MenyTop and the List container 
 */

class EmployeeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            mark: false,
        };
    }

    // TODO CHANGE NAME
    markMode() {
        this.setState({ mark: e });
    }

    render() {
        return (
            <div>
                <MenuTop
                    menu="list"
                    headline="Mennesker"
                    onSearchTermChange={(searchTerm) => this.setState({ searchTerm })}
                    searchTerm={this.state.searchTerm}
                    mark={this.state.mark}
                    onMenuClick={(e) => this.onMenuClick(e)}
                />

                <List 
                    mark={this.state.mark}
                    searchTerm={this.state.searchTerm} />
            </div>
        );
    }
}
export default EmployeeView;
