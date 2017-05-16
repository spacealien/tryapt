import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import MenuBottom from '../components/menu_bottom.jsx';
import MenuTop from '../components/menu_top.jsx';
import SearchBar from '../components/search_bar.jsx';
import List from '../components/list.jsx';
import LoginForm from '../components/login_form.jsx';
import EmployeeDetails from '../components/employee_details.jsx';


class EmployeeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: null,
            view: 'list',
            mark: false,
            viewTab: 'visible'
        };

    }

    onMenuClick(e) {
        this.setState({ mark: e });
        this.setState({ markedEmployeeList: [] });
    }

    render() {
        return (
            <div>
                <MenuTop
                    menu="list"
                    headline="Mennesker"
                    onSearchTermChange={(searchTerm) => this.setState({ searchTerm })}
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
