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
                (res) => { },
                (err) => {
                    console.log(err.response.data.error);
                    this.setState({ errors: err.response.data.error, isLoading: false });
                }
                );
        }
    }

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="email" >Nytt passord:</label>
                    <input id="newPassword" onChange={(e) => this.setState({ password: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="email" >Bekreft passord:</label>
                    <input id="confirm" onChange={(e) => this.setState({ passwordConfirm: e.target.value })} />
                </div>

                <button onClick={(e) => this.onSubmit(e)} value="submit">Bekreft</button>
            </div>
        );
    }
};
export default connect(null, { changePassword })(ForgotResetForm);