import React from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/api_action';

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    fetchUserData() {
        this.props.fetchUserData();
    }

    render() {
        this.fetchUserData();
        return (
            <p>SS</p>
        );
    }
}
export default connect(null, { fetchUserData })(UserPage);
