import React from 'react';
import { attemptLogin } from '../actions/login_action';
import { connect } from 'react-redux';


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        }
    }

    handleClick(e) {
        e.preventDefault();

        this.props.attemptLogin({
            email: this.state.email,
            password: this.state.password
        });

        return false;
    }

    render() {
        return (
            <div className="container">
                <form className="login">
                    <div className="form-group row">
                        <span className="col-sm-2 glyphicon glyphicon-user login-icons"></span>
                        <div className="col-sm-10">
                            <input onInput={(e) => this.setState({ email: e.target.value })} type="email" className="form-control" id="inputEmail" placeholder="Email" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <span className="col-sm-2 glyphicon glyphicon-asterisk login-icons"></span>
                        <div className="col-sm-10">
                            <input onInput={(e) => this.setState({ password: e.target.value })} type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-group row login-row">
                        <div className="col-sm-12">
                            <button className="btn btn-primary login-btn" type="button" onClick={(e) => this.handleClick(e)} >Logg inn</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default connect(null, { attemptLogin })(LoginForm);

