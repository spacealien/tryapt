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

                            <div className="col-sm-3 menu-bottom-cl">
                                <button className="btn menu-bottom" onClick={(e) => this.handleClick(e)}>
                                    <i id="home" className="material-icons icons-menu-bottom">home</i>
                                </button>
                            </div>

                            <div className="col-sm-3 menu-bottom-cl">
                                <button className="btn menu-bottom" onClick={(e) => this.handleClick(e)}>
                                    <i id="people" className="material-icons icons-menu-bottom">people</i>
                                </button>
                            </div>

                            <div className="col-sm-3 menu-bottom-cl">
                                    <button className="btn menu-botton" onClick={(e) => this.handleClick(e)}>
                                        <i id="login" className="material-icons icons-menu-bottom">account_box</i>
                                    </button>
                            </div>

                            <div className="col-sm-3 menu-bottom-cl">
                                <button className="btn menu-botton" onClick={(e) => this.handleClick(e)}>
                                    <i id="info" className="material-icons icons-menu-bottom">info</i>
                                </button>
                            </div>

                        </div>
                    </div>
                </nav>
            </footer>
        );
    }
}
export default Menu;
