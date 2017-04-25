import React from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/api_action';


import MenuTop from '../components/menu_top.jsx';

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.fetchUserData();
        }
    }

    render() {
        return (
            <div>
                <MenuTop
                    menu="myPage"
                    headline="Min Side" />


                <p>SS</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps, { fetchUserData })(UserPage);
