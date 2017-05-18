import React from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../actions/api_action';
import validateInput from '../../server/shared/validation/reset_password_validation';

class ForgotResetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {},
            isLoading: false,
            password: '',
            passwordConfirm: ''
        }
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            console.log('not valid');
            console.log(errors);
            this.setState({
                message: errors
            });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ message: {}, isLoading: true });

            this.props.changePassword({
                password: this.state.password,
                passwordConfirm: this.state.passwordConfirm
            }).then(
                (res) => {
                    console.log(res.data);
                    this.setState({
                        message: {
                            message: res.data.message,
                            isLoading: false
                        }
                    });
                },
                (err) => {
                    console.log(err.response.data.error);
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
        console.log('faen');
        console.log(message);

        return (
            <div className="container">
                <h1 className="text-center">Tilbakestill Password</h1>
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

                <button className="btn btn-primary btn-huge" onClick={(e) => this.onSubmit(e)} value="submit">Bekreft</button>
            </div>
        );
    }
};
export default connect(null, { changePassword })(ForgotResetForm);