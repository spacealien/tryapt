import React from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../actions/api_action';
import validateInput from '../../server/shared/validation/email_validation';


class ForgotForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: {},
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
                    this.setState({
                        message: res.data.message,
                        isLoading: false
                    });
                },
                (err) => {
                    this.setState({
                        errors: err.response.data.error,
                        isLoading: false
                    });
                });
        }
    }

    render() {
        const { errors, isLoading } = this.state;

        return (
            <div className="col-sm-12">
                <div className="input-group input-group-lg">
                    {errors.error && <span className="help-block">{errors.error}</span>}


                    <label htmlFor="email">Email: </label>
                    <input id="email" className="form-control" onChange={(e) => this.setState({ email: e.target.value })} />

                    {errors.email && <span className="help-block">{errors.email}</span>}
                    <br></br>
                    <button className="btn" onClick={(e) => this.onSubmit(e)} value="submit">Tilbakestill</button>
                </div>
            </div>
        );
    }
};
export default connect(null, { forgotPassword })(ForgotForm);