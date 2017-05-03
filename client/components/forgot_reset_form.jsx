import React from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../actions/api_action';

class ForgotResetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passwordConfirm: ''
        }
    }

    componentWillMount() {
        console.dir(this.props);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.changePassword(this.state);
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