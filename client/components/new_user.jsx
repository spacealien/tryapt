import React from 'react';
import { connect } from 'react-redux';
import { newUser } from '../actions/api_action';
import MenuTop from './menu_top.jsx';
import validateInput from '../../server/shared/validation/email_validation';

//kopiert fra forgot_form^

class NewPasswordForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            message: {},
            isLoading: false //Vet ikke om den skal være der hilsen Marthe
        };
    }

    //FRA FORGOT_FORM
    isValid(e) {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({
                message: {
                    errors: errors
                }
            });
        }
        return isValid;
    }

    //FRA FORGOT_FORM
    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});

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
        const {message, isLoading} = this.state; //FRA FORGOT_FORM


        return (
                <div className="container" >
        <MenuTop
            menu="default-with-back"
            headline="Ny bruker"
            />
        <div className="new-user-container"> 
                    <h1>Er du nyansatt? Skriv inn din e-postadresse som er tilknyttet jobb og ønsket passord, for å opprette ny bruker.</h1>
                    <br/>
                    <br/>
                    <div className="input-group margin-top">
                
                        {message.errors && <span className="help-block error">{message.errors}</span>}
                        {message.message && <span className="help-block">{message.message}</span>}
                        <br/>
                        <label htmlFor="email">E-postadresse: </label>
                        <input id="email" className="form-control" type="email" onChange={(e) => this.setState({email: e.target.value })} />
                         <br/>   
                         <br/>   
                        <label htmlFor="email">Bekreft passord: </label>
                        <input id="email" className="form-control" type="password" onChange={(e) => this.setState({password: e.target.value })} />
                        <br/>
                        <br/>   
                        <label htmlFor="email">Bekreft passord: </label>
                        <input id="email" className="form-control" type="password" onChange={(e) => this.setState({password2: e.target.value })} />
                        <br/>
                        <br/>
                        <br/>
                        <div className="row margin-top">
                            <div className="col-sm-12 center">
                                <button className="btn btnPrimary main-btn reset-btn" disabled={isLoading} onClick={(e) => this.onSubmit(e)} value="submit">
                                    Opprett bruker
                                </button>
                            </div>
                        </div>
                
                </div> 
                    </div>
                </div>
                    );
        }
    };
    
    export default connect(null, {newUser})(NewPasswordForm);