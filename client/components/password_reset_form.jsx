import React from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../actions/api_action';
import validateInput from '../../server/shared/validation/reset_password_validation';

class ForgotResetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            isLoading: false,
            password: '',
            passwordConfirm: ''
        }
    }

    isValid(e) {
        const { errors, isValid } = validateInput(this.state);
        if (!this.isValid()) {
            this.setState({ errors });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });

            this.props.changePassword({
                password: this.state.password,
                passwordConfirm: this.state.passwordConfirm
            }).then(
                (res) => {
                    
                 },
                (err) => {
                    console.log(err.response.data.error);
                    this.setState({ errors: err.response.data.error, isLoading: false });
                }
                );
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Tilbakestill Password</h1>
                <div>
                    <label htmlFor="email" >Nytt passord:</label>
                    <input id="newPassword" className="form-control" onChange={(e) => this.setState({ password: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="email" >Bekreft passord:</label>
                    <input id="confirm" className="form-control" onChange={(e) => this.setState({ passwordConfirm: e.target.value })} />
                </div>

                <button className="btn btn-primary btn-huge" onClick={(e) => this.onSubmit(e)} value="submit">Bekreft</button>
            </div>
        );
    }
};
export default connect(null, { changePassword })(ForgotResetForm);