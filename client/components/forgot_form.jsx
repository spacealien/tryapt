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
            isLoading: false
        }
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
            this.props.forgotPassword(this.state).then(
                (res) => { },
                (err) => {
                    console.log(err.response.data.errors);
                    this.setState({ errors: err.response.data.error, isLoading: false });
                }
            );
        }
    }

    render() {
        return (
            <div className="col-sm-12">
                <div className="input-group input-group-lg">
                    <label htmlFor="email">Email: </label>
                    <input id="email" className="form-control" onChange={(e) => this.setState({ email: e.target.value })} />
                    <br></br>
                    <button className="btn" onClick={(e) => this.onSubmit(e)} value="submit">Tilbakestill</button>
                </div>
            </div>
        );
    }
};
export default connect(null, { forgotPassword })(ForgotForm);