import React from 'react';
import { attemptLogin } from '../actions/auth_action';
import { connect } from 'react-redux';
import validateInput from '../../server/shared/validation/login_validation';
import { browserHistory } from 'react-router';
import MenuTop from './menu_top.jsx';

/**
 * This class defines the LoginForm
 */
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

    // React lifecycle method that runs before compoment gets mountet and displayed to the view.
    componentWillMount() {
        if (this.props.isAuthenticated) {
            browserHistory.push('/my_page');
        }
    }

    // method for validating input fields.
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
                    browserHistory.push("/my_page");
                },
                (err) => {
                    this.setState({ errors: err.response.data.error, isLoading: false });
                });
        }
    }

    // redirect to forgot password view
    onForget(e) {
        e.preventDefault();
        browserHistory.push("/forgot");
    }

    // redirect to registration
    newUser(e) {
        browserHistory.push("/newuser");
    }

    render() {
        const { errors, email, password, isLoading } = this.state;

        return (
            <div className="container">

                <MenuTop
                    menu="default"
                    headline="Logg inn" />

                <form id="loginForm" className="login" onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group row">

                        {errors.message && <span className="help-block">{errors.message}</span>}

                        <span className="col-sm-2 glyphicon glyphicon-user login-icons"></span>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                id="user"
                                onInput={(e) => this.setState({ email: e.target.value })}
                                type="email"
                                placeholder="Email" />

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

                            {errors.password && <span className="help-block error">{errors.password}</span>}
                        </div>
                    </div>
                    <div className="form-group row login-row">
                        <div className="col-sm-12">
                            <button className="btn btnPrimary main-btn" type="submit" disabled={isLoading} >Logg inn</button>
                        </div>
                    </div>
                    <br />
                    <div className="row margin-top">
                        <div className="col-sm-12 center">
                            <a id="forgot" onClick={(e) => this.onForget(e)} href="forgot">Tilbakestill passord</a>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="row margin-top">
                        <div className="col-sm-12 center new-user-link">
                            <a id="register" onClick={(e) => this.newUser(e)} >Nyansatt? Klikk her</a>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

// Function that makes sure the class gets access to redux store.
// Subscribes for any changes related to employees made to the data in the redux store. 
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        selectedEmployee: state.employees.selectedEmployee
    };
}


// Defines the connection to redux and exports the react class wherevere the
// class is imported.
export default connect(mapStateToProps, { attemptLogin })(LoginForm);

