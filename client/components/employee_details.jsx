import React from 'react';
import { connect } from 'react-redux';
import ReactDom from 'react-dom';
import MenuTop from './menu_top.jsx';



class EmployeeDetails extends React.Component {
    constructor(props) {
        super(props);

    }

    handleClick(e) {
        console.log("handleClick");

        /**
        ReactDom.render(
            <Popup />,
            document.getElementById('popupContainer')
        );
        Popup.alert('Popup test');
         */

        var id = e.target.id;
        console.log(id);

        switch (id) {
            case "email":
                console.log("email btn pressed");
                this.sendEmail();
                break;
            case "mobile":
                this.openMobileNumber();
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
        window.location.href = "tel://" + 95888853;
    }

    addContact() {
        console.log("addContact");
    }

    openLinkedInProfile() {
        console.log("openLinkedInProfile");
        window.location.href = "https://www.linkedin.com/in/odd-einar-hoel-14b039107/";
    }

    render() {
        const employee = this.props.selectedEmployee;
        return (
            <div>
                <MenuTop
                    menu="default"
                    headline={employee.name}
                />

                <div className="profile-box">
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
                        <p>Erfaring:</p>
                    </div>
                    <div className="profile-text-area">
                        <p className="textarea-readonly">
                            Lorem ipsum dolor sit amet, vitae salutandi maluisset vix eu, cum ut amet vitae volutpat. Sit ei erat mediocrem democritum. Elit fierent voluptatum pro ea. Ut omnium oportere partiendo quo, ut saperet fierent omittantur cum.
                            </p>
                    </div>

                    <div className="profile-contact-info">

                        <div id="email" className="row" onClick={(e) => this.handleClick(e)} >
                            <div className="col-sm-4">
                                <img src="https://cdn4.iconfinder.com/data/icons/black-white-social-media/32/email_mail_envelope_send_message-128.png" />
                            </div>
                            <div id="email" className="col-sm-8" >
                                {employee.email}
                            </div>
                        </div>

                        <div id="mobile" className="row" onClick={(e) => this.handleClick(e)}>
                            <div className="col-sm-4">
                                <img src="https://cdn3.iconfinder.com/data/icons/black-white-social-media/32/phone_logo_social_media-2-128.png" onClick={(e) => this.handleClick(e)} />
                            </div>
                            <div id="mobile" className="col-sm-8">
                                {employee.mobile}
                            </div>
                        </div>

                        <div id="addContact" className="row" onClick={(e) => this.handleClick(e)} >
                            <div className="col-sm-4">
                                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-add-128.png" />
                            </div>
                            <div id="addContact" className="col-sm-8">
                                Legg til i kontakter
                                </div>
                        </div>

                        <div id="linkedin" className="row" onClick={(e) => this.handleClick(e)}>
                            <div className="col-sm-4">
                                <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_gray-128.png" />
                            </div>
                            <div id="linkedin" className="col-sm-8">
                                linkedin.com/in/brukernavn-123
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

export default connect(mapStateToProps)(EmployeeDetails);


