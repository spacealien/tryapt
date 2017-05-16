import React from 'react';
import { connect } from 'react-redux';
import { findEmployeeByUser } from '../actions/employee_action';
import { logout } from '../actions/auth_action';
import {
    fetchUserData,
    fetchProfileData,
    fetchEmployee,
    submitProfileChanges
} from '../actions/api_action';


import { browserHistory } from 'react-router';
import MenuTop from '../components/menu_top.jsx';
import LoadingScreen from './loading_screen.jsx';

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
            linkedin: ''
        };
    }

    getEmployee(userToken) {
        // checks of all profile data is allready fetched
        if (this.props.employees.length == 0) {

            this.props.fetchEmployee().then(
                (res) => {
                    this.props.setEmployee(res.data.employee);
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

    getProfile(userToken) {
        this.props.fetchProfileData(userToken.email).then(
            (res) => {
                console.log(res);

                this.setState({
                    profile: res.data.profile,
                    experience: res.data.profile.experience,
                    linkedin: res.data.profile.linkedin
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

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
            console.log(user);

            var now = Math.floor(Date.now() / 1000)
            if (user.exp < now) {
                this.props.logout();
                browserHistory.push("/my_page/login");
            }

            this.getEmployee(user);
            this.getProfile(user);
            this.getUserData();
        } else {
            browserHistory.push("/my_page/login");
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        console.log(nextProps.isAuthenticated);
    }

    textAreaClick(e) {

        var btnText = document.getElementById(e.target.id).innerHTML;
        if (btnText === "Utvid") {
            document.getElementById(e.target.id).innerHTML = "Minimer";
            document.getElementById('bioText').rows = 18;
        }
        else {
            document.getElementById(e.target.id).innerHTML = "Utvid";
            document.getElementById('bioText').rows = 2;
        }

        this.setState({
            term: ''
        });
    }

    handleClick(e) {
        var id = e.target.id;
        console.log(id);

        switch (id) {
            case 'edit':
                this.setState({ edit: true });
                break;
            case 'save':
                this.submitChanges();
                break;
        }
    }

    submitChanges() {
        console.log("submitChanges");
        var profile = {
            linkedin: this.state.linkedin,
            experience: this.state.experience
        }

        this.props.submitProfileChanges(profile).then(
            (res) => {
                console.log(res);
            },
            (error) => {
                console.log(error);
            }
        );
        this.setState({ edit: false });
    }

    render() {

        // userData is private data, sick days and what not.
        const userData = this.state.userData;
        const profile = this.state.profile;
        const employee = this.props.employee;

        if (!userData && !profile && !employee) {
            return (
                <div>
                    <MenuTop
                        menu="myPage"
                        headline="Min Side" />

                    <LoadingScreen />
                </div>
            );

        } else
            return (
                <div>
                    <MenuTop
                        menu="myPage"
                        headline="Min Side" />

                    <div className="my-profile-box">
                        <div className="profile-info row">
                            <div className="col-sm-5 profile-img-container">
                                <img className="img-thumbnail" src={employee.image} width="100%" />
                            </div>
                            <div className="col-sm-7">
                                <div className="profile-name"><p>{employee.name}</p></div>
                                <div className="profile-position"><p>{employee.jobtitle}</p></div>
                                <div className="profile-company"><p>{employee.company}</p></div>
                            </div>
                        </div>

                        <div className="profile-textarea-header">
                            <p>Din erfaring:  (Max 100 ord)</p>
                        </div>
                        <div className="profile-text-area">
                            <form>

                                <textarea
                                    id="bioText"
                                    placeholder="Skriv om deg selv her.."
                                    onChange={(e) => this.setState({ experience: e.target.value })}
                                    value={this.state.experience}
                                    disabled={!this.state.edit} >
                                </textarea>

                                <div className="row">
                                    <div className="col-sm-8"></div>
                                    <div className="col-sm-4">
                                        <button
                                            id="toggleTextArea"
                                            className="btn btn-primary btn-expand-textarea"
                                            type="button" onClick={(e) => this.textAreaClick(e)} >Utvid</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="profile-contact-info">

                            <div id="email" className="row" onClick={(e) => this.handleClick(e)} >
                                <div className="col-sm-2">
                                    <img src="https://cdn4.iconfinder.com/data/icons/black-white-social-media/32/email_mail_envelope_send_message-128.png" />
                                </div>
                                <div id="email" className="col-sm-10" >
                                    {employee.email}
                                </div>
                            </div>

                            <div id="mobile" className="row" onClick={(e) => this.handleClick(e)}>
                                <div className="col-sm-2">
                                    <img src="https://cdn3.iconfinder.com/data/icons/black-white-social-media/32/phone_logo_social_media-2-128.png" onClick={(e) => this.handleClick(e)} />
                                </div>
                                <div id="mobile" className="col-sm-10">
                                    {employee.mobile}
                                </div>
                            </div>


                            <div id="linkedin" className="row" onClick={(e) => this.handleClick(e)}>
                                <div className="col-sm-2">
                                    <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_gray-128.png" />
                                </div>
                                <div id="linkedin" className="col-sm-4">
                                    <p>linkedin.com/</p>
                                </div>
                                <div id="linkedin" className="col-sm-6">
                                    <form>
                                        <input className="linkedInTextField" type="text" name="linkedInUserName"
                                            onChange={(e) => { this.setState({ linkedin: e.target.value }) }}
                                            value={this.state.linkedin}
                                            disabled={!this.state.edit} />
                                    </form>
                                </div>
                            </div>
                            <div id="popupContainer"></div>
                        </div>
                    </div>

                    {!this.state.edit &&
                        <button id="edit" className="btn btn-primary" type="button" onClick={(e) => this.handleClick(e)}>Endre</button>}
                    {this.state.edit &&
                        <button id="save" className="btn btn-primary" type="button" onClick={(e) => this.handleClick(e)}>Lagre</button>}

                </div>
            );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userToken: state.auth.user,
        employee: state.employees.authenticatedEmployee,
        employees: state.employees.all
    };
}

export default connect(mapStateToProps, {
    fetchUserData,
    fetchProfileData,
    fetchEmployee,
    findEmployeeByUser,
    submitProfileChanges,
    logout

})(UserPage);
