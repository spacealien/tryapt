import React from 'react';
import { connect }
    from 'react-redux';
import ReactDom from 'react-dom';
import MenuTop from './menu_top.jsx';
import { fetchProfileData }
    from '../actions/api_action';


class EmployeeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        };
    }

    componentWillMount() {
        const employee = this.props.selectedEmployee;
        this.props.fetchProfileData(employee.email).then(
            (res) => {
                this.setState({ profile: res.data.profile });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    handleTextArea(e) {

        var btnText = document.getElementById(e.target.id).innerHTML;
        if (btnText === "Se mer") {
            document.getElementById(e.target.id).innerHTML = "Lukk";
            document.getElementById('bioText').rows = 18;
        }
        else {
            document.getElementById(e.target.id).innerHTML = "Se mer";
            document.getElementById('bioText').rows = 2;
        }

        this.setState({ textArea: !this.state.textArea });
    }

    handleClick(e) {
        console.log("handleClick");
        var id = e.target.id;
        console.log(id);
        switch (id) {
            case "email":
                this.sendEmail();
                break;
            case "mobile":
                this.openMobileNumber();
                break;
            case "sms":
                this.sendSms();
                break;
            case "addContact":
                this.addContact();
                break;
            case "linkedin":
                this.openLinkedInProfile();
                break;
        }
    }

    sendEmail() {
        var link = "mailto:odd.hoel@hotmail.com"
            + "?cc=myCCaddress@example.com"
            + "&subject=" + escape("This is my subject");
        window.location.href = link;
    }

    openMobileNumber() {
        window.location.href = "tel://" + employee.mobile.split(" ").join("");
    }

    sendSms() {
        const employee = this.props.selectedEmployee;
        window.location.href = "sms:" + employee.mobile.split(" ").join("");
    }

    addContact() {
        console.log("addContact");
    }

    openLinkedInProfile() {
        const profile = this.state.profile;
        console.log("openLinkedInProfile");
        window.location.href = "https://www.linkedin.com" + profile.linkedin;
    }

    render() {
        const employee = this.props.selectedEmployee;
        const profile = this.state.profile;
        const parsedUrl = this.props.selectedEmployee.image.replace('http', 'https');
        console.log(profile);
        return (
            <div>
                <MenuTop
                    menu="default-with-back"
                    headline={employee.name}
                />

                <div className="profile-box">
                    <div className="profile-info row">
                        <div className="col-sm-5 profile-img-container">
                            <img className="img-thumbnail" src={parsedUrl} width="100%" />
                        </div>
                        <div className="col-sm-7">
                            <div className="profile-name capitalize"><p>{employee.name}</p></div>
                            <div className="profile-position capitalize"><p>{employee.jobtitle}</p></div>
                            <div className="profile-company capitalize"><p>{employee.company}</p></div>
                        </div>
                    </div>

                    <div className="profile-textarea-header">
                        <p>Erfaring:</p>
                    </div>
                    <div>
                        <textarea
                            id="bioText"
                            disabled={true}
                            value={profile.experience} >
                        </textarea>
                    </div>

                    <div className="row">
                        <div className="col-sm-8"></div>
                        <div className="col-sm-4">
                            <button
                                id="toggleTextArea"
                                className="btn btnPrimary btn-expand-textarea"
                                type="button" onClick={(e) => this.handleTextArea(e)} >Se mer</button>
                        </div>
                    </div>

                    <div className="profile-contact-info">

                        <div id="email" className="row" onClick={(e) => this.handleClick(e)} >
                            <div className="col-sm-3">
                                <img src="https://cdn4.iconfinder.com/data/icons/black-white-social-media/32/email_mail_envelope_send_message-128.png" />
                            </div>
                            <div id="email" className="col-sm-9" >
                                {employee.email}
                            </div>
                        </div>

                        <div id="mobile" className="row" onClick={(e) => this.handleClick(e)}>
                            <div className="col-sm-3">
                                <img src="https://cdn3.iconfinder.com/data/icons/black-white-social-media/32/phone_logo_social_media-2-128.png" />
                            </div>
                            <div id="mobile" className="col-sm-9">
                                {employee.mobile}
                            </div>
                        </div>

                        <div id="sms" className="row" onClick={(e) => this.handleClick(e)}>
                            <div className="col-sm-3">
                                <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/speech_bubble-128.png" />
                            </div>

                            <div id="sms" className="col-sm-9">
                                Send SMS
                            </div>
                        </div>

                        <div id="linkedin" className="row" onClick={(e) => this.handleClick(e)}>
                            <div className="col-sm-3">
                                <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_gray-128.png" />
                            </div>
                            <div id="linkedin" className="col-sm-9">
                                {profile.linkedin}
                            </div>
                        </div>

                        <div id="popupContainer"></div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedEmployee: state.employees.selectedEmployee
    };
}

export default connect(mapStateToProps, { fetchProfileData }
)(EmployeeDetails);


