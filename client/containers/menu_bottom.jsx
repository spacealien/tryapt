import React from 'react';
import ListElement from '../components/list_element.jsx';

import { setListView, setGridView } from '../actions/menu_action';
import { connect } from 'react-redux';

/**
 * This class defines the LoginForm
 */
class MenuBottom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: ''
        };
    }



    /**
     * Method for handeling menu clicks. 
     * 
     */
    handleClick(e) {
        var id = e.target.id;
        switch (id) {
            case 'home':
                document.getElementById(id).style.color = "#D1A25F";
                document.getElementById('login').style.color = "#333333";
                document.getElementById('people').style.color = "#333333";
                document.getElementById('info').style.color = "#333333";
                // this.props.setDefaultPeople();
                this.props.browserHistory.push('/');
                this.setState({ active: 'home' });
                break;
            case "login":
                document.getElementById(id).style.color = "#D1A25F";
                document.getElementById('home').style.color = "#333333";
                document.getElementById('people').style.color = "#333333";
                document.getElementById('info').style.color = "#333333";
                this.props.browserHistory.push('/my_page');
                this.setState({ active: 'login' });
                break;
            case "people":
                console.log('people click');
                this.setState({ active: '' });
                document.getElementById('login').style.color = "#333333";
                document.getElementById('home').style.color = "#333333";
                document.getElementById('info').style.color = "#333333";
                if (this.props.listView === 'list') {
                    this.props.setGridView();
                } else {
                    this.props.setListView();
                }
                this.props.browserHistory.push('/people');
                // document.getElementById('people').style.color = "#D1A25F";
                this.setState({ active: 'people' });

                break;
            case 'info':
                document.getElementById(id).style.color = "#D1A25F";
                document.getElementById('login').style.color = "#333333";
                document.getElementById('people').style.color = "#333333";
                document.getElementById('home').style.color = "#333333";
                this.props.browserHistory.push('/info');
                this.setState({ active: 'info' });
                break;
        }
    }

    render() {
        const { listView } = this.props;
        const { active } = this.state;

        var peopleStyle = this.state.active === 'people' ? { color: "#D1A25F" } : { color: "#333333" };

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

                            <div id="listgrid" className="col-sm-3 menu-bottom-cl">
                                <button className="btn menu-bottom" onClick={(e) => this.handleClick(e)}>
                                    {listView === 'list' && <i id="people" className="material-icons icons-menu-bottom grid-icon" style={peopleStyle}> view_module</i>}
                                    {listView === 'grid' && <i id="people" className="material-icons icons-menu-bottom" style={peopleStyle}> view_list</i>}
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

// Function that makes sure the class gets access to redux store.
// Subscribes for any changes related to employees made to the data in the redux store. 
function mapStateToProps(state) {
    return {
        listView: state.menu.listView
    };
}


// Defines the connection to redux and exports the react class wherevere the
// class is imported.
export default connect(mapStateToProps, { setListView, setGridView })(MenuBottom);

