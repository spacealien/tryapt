import React from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../actions/api_action';

class ForgotForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.forgotPassword(this.state);
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