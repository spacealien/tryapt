import React from 'react';
import { attemptLogin } from '../actions/auth_action';
import { connect } from 'react-redux';
import validateInput from '../../server/shared/validation/login_validation';
import { browserHistory } from 'react-router';
import MenuTop from '../components/menu_top.jsx';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false
        }
    }

    componentWillMount() {
        if(this.props.isAuthenticated) {
            browserHistory.push('/my_page');
        }
    }

    handleClick(e) {

    }

    isValid(e) {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });

            this.props.attemptLogin({
                email: this.state.email,
                password: this.state.password
            }).then(
                (res) => {
                    console.log(res);
                    browserHistory.push("/my_page");
                },
                (err) => {
                    console.log(err);
                    this.setState({ errors: err.response.data.error, isLoading: false });
                });
        } 
    }

    onForget(e) {
        e.preventDefault();
        browserHistory.push("/forgot");
    }

    render() {
        const { errors, email, password, isLoading } = this.state;
        console.log(errors);

        return (
            <div className="container">

                <MenuTop
                    menu="default"
                    headline="Login" />

                <form id="loginForm" className="login" onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group row">
                        <span className="col-sm-2 glyphicon glyphicon-user login-icons"></span>
                        <div className="col-sm-10">

                            <input
                                className="form-control"
                                id="user"
                                onInput={(e) => this.setState({ email: e.target.value })}
                                type="user"
                                placeholder="Email"
                                autoComplete="on" />

                            {errors.email && <span className="help-block">{errors.email}</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <span className="col-sm-2 glyphicon glyphicon-asterisk login-icons"></span>
                        <div className="col-sm-10">

                            <input
                                className="form-control"
                                id="password"
                                onInput={(e) => this.setState({ password: e.target.value })}
                                type="password"
                                placeholder="Password"
                                autoComplete="on" />

                            {errors.password && <span className="help-block">{errors.password}</span>}
                        </div>
                    </div>

                    <div>
                        <a id="forgot" onClick={(e) => this.onForget(e)} href="forgot">Tilbakestill password</a>
                    </div>

                    <div className="form-group row login-row">
                        <div className="col-sm-12">
                            <button className="btn btn-primary login-btn" type="submit" >Logg inn</button>
                        </div>
                    </div>
                </form>
            </div>
        );

        /**
                return (
                    <form id="loginForm" className="login" onSubmit={(e) => this.onSubmit(e)}>
                        <input
                            className="form-control"
                            id="email"
                            onInput={(e) => this.setState({ email: e.target.value })}
                            type="email"
                            placeholder="Email"
                            autoComplete="on" />
        
                        <input
                            className="form-control"
                            id="password"
                            onInput={(e) => this.setState({ password: e.target.value })}
                            type="password"
                            placeholder="Password"
                            autoComplete="on" />
        
                        <button className="btn btn-primary login-btn" type="submit" >Logg inn</button>
                    </form>
                );
         */


    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        selectedEmployee: state.employees.selectedEmployee
    };
}
export default connect(mapStateToProps, { attemptLogin })(LoginForm);

