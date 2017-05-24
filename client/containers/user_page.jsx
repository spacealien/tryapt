import React from 'react';
import { connect } from 'react-redux';
import { findEmployeeByUser, setAuthenticatedEmployee } from '../actions/employee_action';
import { logout } from '../actions/auth_action';
import {
    fetchUserData,
    fetchProfileData,
    fetchEmployee,
    submitProfileChanges
} from '../actions/api_action';

import { browserHistory } from 'react-router';
import MenuTop from './menu_top.jsx';
import LoadingScreen from '../components/loading_screen.jsx';


/**
 * The user page is responsible for the view 
 * when the user logs into the application.
 */
class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            userData: null,
            profile: null,
            edit: false,
            isLoading: false,
            experience: '',
            linkedin: '',
            textArea: false,
            chars_left: 800
        };
    }

    // Finds employee data 
    getEmployee(userToken) {
        // Checks of all employees is fetched before calling API
        if (this.props.employees.length == 0) {
            console.log("fetching employee");
            this.props.fetchEmployee(userToken.email).then(
                (res) => {
                    this.props.setAuthenticatedEmployee(res.data.employee);
                    this.setState({ employee: res.data.employee });
                },
                (error) => {
                    console.log(error);
                }
            )
        } else {
            this.props.findEmployeeByUser(userToken);
        }
    }

    // Gets linkedin and experience from server
    getProfile(userToken) {
        this.props.fetchProfileData(userToken.email).then(
            (res) => {
                this.setState({
                    profile: res.data.profile,
                    experience: res.data.profile.experience,
                    linkedin: res.data.profile.linkedin,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    // Meant for user for fetching private user data. sickdays and what not.
    getUserData() {
        this.props.fetchUserData().then(
            (res) => {
                this.setState({ userData: res.data.userData });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            var user = JSON.parse(this.props.userToken);

            var now = Math.floor(Date.now() / 1000)

            /**
             * Checks if token is expired.
             * If token is expired
             * user gets redirected to 
             * login view.
             */
            if (user.exp < now) {
                this.props.logout();
                browserHistory.push("/my_page/login");
            }

            // fetch all data.
            this.getEmployee(user);
            this.getProfile(user);
            this.getUserData();
        } else {
            browserHistory.push("/my_page/login");
        }
    }

    // handles changes to the experience text field
    handleChange(event) {
        var input = event.target.value;
        this.setState({ chars_left: 800 - input.length, experience: input });
    }

    // handles textArea logic.
    textAreaClick(e) {
        var btnText = document.getElementById(e.target.id).innerHTML;


        if (btnText === "Se og rediger") {
            document.getElementById(e.target.id).innerHTML = "Lagre";
            document.getElementById('bioText').rows = 18;
            document.getElementById('charCounter').style.display = "initial";
        }
        else {
            document.getElementById(e.target.id).innerHTML = "Se og rediger";
            document.getElementById('bioText').rows = 2;
            document.getElementById('charCounter').style.display = "none";
            this.submitChanges();
        }

        this.setState({
            term: '',
            textArea: !this.state.textArea,
            chars_left: 800 - document.getElementById('bioText').value.length
        });
    }

    handleClick(e) {
        var id = e.target.id;
        switch (id) {
            case 'toggleTextArea':
                this.textAreaClick(e);
                break;
            case 'edit':
                this.setState({ edit: true });
                document.getElementById('linkedInTxt').disabled = false;
                this.refs.txtField.focus();
                break;
            case 'save':
                this.submitChanges();
                document.getElementById('linkedInTxt').disabled = true;
                this.setState({ edit: false });
                break;
        }
    }

    // Submits changes to the server
    submitChanges() {
        const limitLength = (str, length) => str.substring(0, length);
        var linkedIn;
        if (this.state.linkedin === '') {
            linkedIn = '';
        }
        else
            linkedIn = this.state.linkedIn;
        var profile = {
            linkedin: linkedIn,
            experience: limitLength(this.state.experience, 800)
        };

        this.setState({ isLoading: true });
        this.props.submitProfileChanges(profile).then(
            (res) => {
                this.setState({
                    edit: false,
                    isLoading: false
                });
            },
            (error) => {
                this.setState({ isLoading: false });
            }
        );
    }


    render() {
        // userData is private data, sick days and what not.
        const { userData, profile, isLoading } = this.state;
        const employee = this.props.employee;
        console.log(employee);


        if (!userData && !profile && !employee) {
            return (
                <div>
                    <MenuTop
                        menu="myPage"
                        headline="Min Side" />

                    <LoadingScreen />
                </div>
            );
        } else {
            const parsedUrl = employee.image.replace('http', 'https');
            return (
                <div>
                    <MenuTop
                        menu="myPage"
                        headline="Min side" />

                    <div className="my-profile-box">
                        <div className="profile-info row">
                            <div className="col-sm-5 profile-img-container">
                                <img className="img-thumbnail" src={parsedUrl} />
                            </div>
                            <div className="col-sm-7">
                                <div className="profile-name"><p>{employee.name}</p></div>
                                <div className="profile-position"><p>{employee.jobtitle}</p></div>
                                <div className="profile-company capitalize"><p>{employee.company}</p></div>
                            </div>
                        </div>

                        <div className="profile-textarea-header">
                            <p>Din erfaring:  (Max 800 tegn)</p>
                        </div>
                        <div className="profile-text-area">
                            <form>

                                <textarea
                                    id="bioText"
                                    placeholder="Skriv om deg selv her.."
                                    maxLength="800"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.experience}
                                    disabled={!this.state.textArea} >
                                </textarea>

                                <div className="row">
                                    <div className="col-sm-8">
                                        <p id="charCounter">Gjenværende tegn: {this.state.chars_left}</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <button
                                            id="toggleTextArea"
                                            className="btn btnPrimary btn-expand-textarea"
                                            type="button" onClick={(e) => this.handleClick(e)} >Se og rediger</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="profile-contact-info">

                            <div id="email" className="row" >
                                <div className="col-sm-2">
                                    <img src="https://cdn4.iconfinder.com/data/icons/black-white-social-media/32/email_mail_envelope_send_message-128.png" alt="email-icon" />
                                </div>
                                <div className="col-sm-10" >
                                    {employee.email}
                                </div>
                            </div>

                            <div id="mobile" className="row" >
                                <div className="col-sm-2">
                                    <img src="https://cdn3.iconfinder.com/data/icons/black-white-social-media/32/phone_logo_social_media-2-128.png" alt="mobile-icon" />
                                </div>
                                <div className="col-sm-10">
                                    {employee.mobile}
                                </div>
                            </div>


                            <div id="linkedin" className="row"  >
                                <div className="col-sm-2">
                                    <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_gray-128.png" alt="linkedin icon" />
                                </div>
                                <div id="linkedin" className="col-sm-4">
                                    <p>linkedin.com/in/</p>
                                </div>
                                <div className="col-sm-6">
                                    <form>
                                        <input id="linkedInTxt" className="linkedInTextField" type="text" name="linkedInUserName"
                                            onChange={(e) => { this.setState({ linkedin: e.target.value }) }}
                                            placeholder="Skriv ditt brukernavn"
                                            value={this.state.linkedin}
                                            ref='txtField'
                                            disabled='true' />
                                    </form>
                                </div>
                            </div>
                            <div className="row margin-top">
                                <div className="col-sm-8"></div>
                                <div className="col-sm-4">
                                    {!this.state.edit &&
                                        <button id="edit" className="btn btnPrimary btn-my-page" type="button" onClick={(e) => this.handleClick(e)}>Endre</button>}
                                    {this.state.edit &&
                                        <button id="save" className="btn btnPrimary btn-my-page" type="button" onClick={(e) => this.handleClick(e)}>Lagre</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
    }
}

// Function that makes sure the class gets access to redux store.
// Subscribes for any changes related to employees made to the data in the redux store. 
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userToken: state.auth.user,
        employee: state.employees.authenticatedEmployee,
        employees: state.employees.all
    };
};

// Defines the connection to redux and exports the react class wherevere the
// class is imported.
export default connect(mapStateToProps, {
    fetchUserData,
    fetchProfileData,
    fetchEmployee,
    findEmployeeByUser,
    submitProfileChanges,
    logout,
    setAuthenticatedEmployee

})(UserPage);
