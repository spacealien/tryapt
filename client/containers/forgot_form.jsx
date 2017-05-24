import React from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../actions/api_action';
import MenuTop from './menu_top.jsx';
import validateInput from '../../server/shared/validation/email_validation';

/**
 * ForgetForm is the form used for reseting user password. 
 */

class ForgotForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: {},
            isLoading: false
        }
    }

    // Method for checking if input is valid.
    isValid(e) {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({
                message: {
                    errors: errors
                }
            });
        }
        return isValid;
    }


    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });

            // calls forgotPassword defined in api_action.js
            this.props.forgotPassword(this.state).then(
                (res) => {
                    this.setState({
                        message: res.data,
                        isLoading: false
                    });
                },
                (err) => {
                    this.setState({
                        message: err.response.data,
                        isLoading: false
                    });
                });
        }
    }

    render() {
        // isLoading is used to disable submit button between server requests and response.
        // message variable contains messages from either validation method or server response.
        const { message, isLoading } = this.state;

        
        return (
            <div className="container" >
                <MenuTop
                    menu="default-with-back"
                    headline="Tilbakestill passord"
                />
                <div className="reset-container">
                    <h1>Skriv inn e-postadressen din for å tilbakestille passordet</h1>
                    <br />
                    <br />
                    <div className="input-group margin-top">

                        {message.errors && <span className="help-block error">{message.errors}</span>}
                        {message.message && <span className="help-block">{message.message}</span>}

                        <label htmlFor="email">E-postadresse: </label>
                        <input id="email" className="form-control" type="email" onChange={(e) => this.setState({ email: e.target.value })} />
                        <br />
                        <br />
                        <br />
                        <div className="row margin-top">
                            <div className="col-sm-12 center">
                                <button className="btn btnPrimary main-btn reset-btn" disabled={isLoading} onClick={(e) => this.onSubmit(e)} value="submit">
                                    Tilbakestill passord
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


// Defines the connection to redux and exports the react class wherevere the
// class is imported.
export default connect(null, { forgotPassword })(ForgotForm);