import React from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../actions/api_action';
import validateInput from '../../server/shared/validation/email_validation';


class ForgotForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: {},
            isLoading: false
        }
    }

    isValid(e) {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors: errors });
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });

            this.props.forgotPassword(this.state).then(
                (res) => {
                    console.log(res);
                    this.setState({
                        message: res.data,
                        isLoading: false
                    });
                },
                (err) => {
                    console.log(err.response);
                    this.setState({
                        message: err.response.data,
                        isLoading: false
                    });
                });
        }
    }

    render() {
        const {message, isLoading} = this.state;

        return (
            <div className="container" >
                 <h1 className="text-center">Tilbakestill Password</h1>
                <div className="input-group">
                    {message.errors && <span className="help-block">{message.errors}</span>}
                    {message.message && <span className="help-block">{message.message}</span>}

                    <label htmlFor="email">Email: </label>
                    <input id="email" className="form-control" type="email" onChange={(e) => this.setState({ email: e.target.value })} />
                    <br></br>


                    <button className="btn primary btn-huge" disabled={isLoading} onClick={(e) => this.onSubmit(e)} value="submit">
                        Tilbakestill
                     </button>


                </div>
            </div>
        );
    }
};
export default connect(null, { forgotPassword })(ForgotForm);