import React from 'react';
import { attemptLogin } from '../actions/auth_action';
import { connect } from 'react-redux';
import validateInput from '../../server/shared/loginValidator';

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
                (res) => { console.log(res) },
                (err) => console.log(err));
        } else {

        }
    }

    render() {
        const { errors, email, password, isLoading } = this.state;

        return (
            <div className="container">
                <form className="login">
                    <div className="form-group row">
                        <span className="col-sm-2 glyphicon glyphicon-user login-icons"></span>
                        <div className="col-sm-10">

                            <input className="form-control" id="inputEmail"
                                value={email}
                                onInput={(e) => this.setState({ email: e.target.value })}
                                type="email"
                                placeholder="Email" />
                            {errors.email && <span className="help-block">{errors.email}</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <span className="col-sm-2 glyphicon glyphicon-asterisk login-icons"></span>
                        <div className="col-sm-10">

                            <input className="form-control" id="inputPassword"
                                value={password}
                                onInput={(e) => this.setState({ password: e.target.value })}
                                type="password"
                                placeholder="Password" />
                            {errors.password && <span className="help-block">{errors.password}</span>}
                        </div>
                    </div>
                    
                    <div className="form-group row login-row">
                        <div className="col-sm-12">
                            <button className="btn btn-primary login-btn" type="button" onClick={(e) => this.onSubmit(e)} >Logg inn</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        selectedEmployee: state.employees.selectedEmployee
    };
}
export default connect(mapStateToProps, { attemptLogin })(LoginForm);

