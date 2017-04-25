import React from 'react';
import ListElement from './list_element.jsx';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        var id = e.target.id;

        switch (id) {
            case 'home':
                this.props.browserHistory.push('/');
                break;
            case "login":
                this.props.browserHistory.push('/my_page');
                break;
            case "people":
                this.props.browserHistory.push('/people');
                break;
            case 'info':
                this.props.browserHistory.push('/info');
                break;
        }
    }

    render() {
        return (
            <footer>
                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="navbar-header">
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="menu-bottom-cl">
                                    <i id="home" onClick={(e) => this.handleClick(e)} className="material-icons icons-menu-bottom">home</i>

                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="menu-bottom-cl">
                                    <i id="people" onClick={(e) => this.handleClick(e)} className="material-icons icons-menu-bottom">people</i>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="menu-bottom-cl">
                                    <i id="login" onClick={(e) => this.handleClick(e)} className="material-icons icons-menu-bottom">account_box</i>

                                </div>
                            </div>
                            <div className="col-sm-3">

                                <div className="menu-bottom-cl">
                                    <i id="info" className="info" onClick={(e) => this.handleClick(e)} className="material-icons icons-menu-bottom">info</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </footer>
        );
    }
}
export default Menu;
