import React from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../actions/api_action';
import validateInput from '../../server/shared/validation/reset_password_validation';
import MenuTop from './menu_top.jsx';


/**
 * The form for resetting password
 */
class ForgotResetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {},
            isLoading: false,
            password: '',
            passwordConfirm: ''
        };
    }

    // validates the form
    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({
                message: errors
            });
        }
        return isValid;
    }



    // submits form
    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ message: {}, isLoading: true });

            this.props.changePassword({
                password: this.state.password,
                passwordConfirm: this.state.passwordConfirm
            }).then(
                (res) => {
                    this.setState({
                        message: {
                            message: res.data.message,
                            isLoading: false
                        }
                    });
                },
                (err) => {
                    this.setState({
                        message: {
                            message: err.response.data.error
                        }, isLoading: false
                    });
                }
            );
        }
    }

    render() {
        const { message } = this.state;

        return (

            <div className="container">
                <MenuTop
                    menu="default"
                    headline="Tilbakestill passord"
                />
                <div>
                    <h1 className="text-center">Skriv inn et nytt passord for å endre passord.</h1>
                    <div>
                        {message.message && <span className="help-block">{message.message}</span>}

                        {message.password && <span className="help-block">{message.password}</span>}
                        <label htmlFor="email" >Nytt passord:</label>
                        <input id="newPassword" className="form-control" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                    </div>
                    <div>
                        {message.passwordConfirm && <span className="help-block">{message.passwordConfirm}</span>}
                        <label htmlFor="email" >Bekreft passord:</label>
                        <input id="confirm" className="form-control" type="password" onChange={(e) => this.setState({ passwordConfirm: e.target.value })} />
                    </div>
                    <br />
                    <div className="row margin-top">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8">
                            <button className="btn btnPrimary btn-my-page" onClick={(e) => this.onSubmit(e)} value="submit">Bekreft</button>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
            </div>
        );
    }
};

// Defines the connection to redux and exports the react class wherevere the
// class is imported.
export default connect(null, { changePassword })(ForgotResetForm);