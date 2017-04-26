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
            <div>
                <label value="email" htmlFor="email" >E-post:</label>
                <input id="email" onChange={ (e) => this.setState({ email: e.target.value })} />
                <button onClick={(e) => this.onSubmit(e)} value="submit">Tilbakestill</button>
            </div>
        );
    }
};
export default connect(null, { forgotPassword })(ForgotForm);