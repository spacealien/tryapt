import React from 'react';
import { connect } from 'react-redux';






export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        
        componentWillMount() {
            if(!this.props.isAuthenticated) {
                this.context.router.push('/my_page/login');
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