import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        
        componentWillMount() {
            this.checkAuthentication(this.props.isAuthenticated);
        }

        componentWillUpdate(nextProps) {
            this.checkAuthentication(nextProps.isAuthenticated);
        }

        checkAuthentication(isAuthenticated) {
            if(!isAuthenticated) {
                browserHistory.push('/my_page/login');
            } 
        }

        render() {
            return (
                <ComposedComponent { ...this.props } />
            )
        };
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }
    return connect(mapStateToProps,null)(Authenticate);
}