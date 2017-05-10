import React from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/api_action';


import MenuTop from '../components/menu_top.jsx';

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {term: ''};
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.fetchUserData();
        }
    }

    textAreaClick(e) {
        
        var btnText = document.getElementById(e.target.id).innerHTML;
        if (btnText === "Utvid") {
            document.getElementById(e.target.id).innerHTML="Minimer";
            document.getElementById('bioText').rows = 18;
        }
        else {
            document.getElementById(e.target.id).innerHTML="Utvid";
            document.getElementById('bioText').rows = 2;
        }
        
        this.setState({
            term: ''
        });
    }
    /*SetNewSize(e) {
        const textarea = e.target;
        if (textarea.value.length > 5) {
            textarea.cols = 50;
            textarea.rows = 50;
        } else {
            textarea.cols = 10;
            textarea.rows = 15;
        }
    }*/
    handleCLick(e) {
        //
    }
    render() {
        const user = this.props.user;
        return (
                <div>
                    <MenuTop
                        menu="myPage"
                        headline="Min Side" />
                
                    <div className="my-profile-box">
                        <div className="profile-info row">
                            <div className="col-sm-5 profile-img-container">
                                <img className="img-thumbnail" src={user.image} width="100%" />
                            </div>
                            <div className="col-sm-7">
                                <div className="profile-name"><p>{user.name}</p></div>
                                <div className="profile-position"><p>{user.jobtitle}</p></div>
                                <div className="profile-company"><p>{user.company}</p></div>
                            </div>
                        </div>
                
                        <div className="profile-textarea-header">
                            <p>Din erfaring:  (Max 100 ord)</p>
                        </div>
                        <div className="profile-text-area">
                            <form> 
                                <textarea id="bioText" placeholder="Skriv om deg selv her.." >
                                </textarea>
                                <div className="row">
                                    <div className="col-sm-8"></div>
                                    <div className="col-sm-4">
                                        <button id="toggleTextArea" className="btn btn-primary btn-expand-textarea" type="button" onClick={(e) => this.textAreaClick(e)} >Utvid</button>
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
                                    {user.email}
                                </div>
                            </div>
                
                            <div id="mobile" className="row" onClick={(e) => this.handleClick(e)}>
                                <div className="col-sm-2">
                                    <img src="https://cdn3.iconfinder.com/data/icons/black-white-social-media/32/phone_logo_social_media-2-128.png" onClick={(e) => this.handleClick(e)} />
                                </div>
                                <div id="mobile" className="col-sm-10">
                                    {user.mobile}
                                </div>
                            </div>
                
                
                            <div id="linkedin" className="row" onClick={(e) => this.handleClick(e)}>
                                <div className="col-sm-2">
                                    <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_gray-128.png" />
                                </div>
                                <div id="linkedin" className="col-sm-4">
                                    <p>linkedin.com/in/</p> 
                                </div>
                                <div id="linkedin" className="col-sm-6">
                                    <form>
                                        <input className="linkedInTextField" type="text" name="linkedInUserName" placeholder="Ditt brukernavn"/>
                                    </form>
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
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
}
export default connect(mapStateToProps, {fetchUserData})(UserPage);
