import React from 'react';
import ListElement from './list_element.jsx';

import { setListView, setGridView } from '../actions/menu_action';
import { connect } from 'react-redux';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        var id = e.target.id;

        switch (id) {
            case 'home':
                document.getElementById(id).style.color="#D1A25F";
                document.getElementById('login').style.color="#333333";
                document.getElementById('listgrid').style.color="#333333";
                document.getElementById('info').style.color="#333333";
                this.props.setDefaultPeople();
                this.props.browserHistory.push('/info');
                this.props.browserHistory.push('/');
                break;
            case "login":
                document.getElementById(id).style.color="#D1A25F";
                document.getElementById('home').style.color="#333333";
                document.getElementById('listgrid').style.color="#333333";
                document.getElementById('info').style.color="#333333";
                this.props.browserHistory.push('/my_page');
                break;
            case "people":
                
                if(this.props.listView==='list') {
                    this.props.setGridView();
                } else {
                    this.props.setListView();
                }
                document.getElementById('login').style.color="#333333";
                document.getElementById('home').style.color="#333333";
                document.getElementById('info').style.color="#333333";
                document.getElementById('listgrid').style.color="#D1A25F";
                this.props.browserHistory.push('/people');
                break;
            case 'info':
                document.getElementById(id).style.color="#D1A25F";
                document.getElementById('login').style.color="#333333";
                document.getElementById('listgrid').style.color="#333333";
                document.getElementById('home').style.color="#333333";
                this.props.browserHistory.push('/info');
                break;
        }
    }

    render() {

        const { listView } = this.props;


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
                                    {listView==='list' && <i id="people" className="material-icons icons-menu-bottom">view_module</i>} 
                                    {listView==='grid' && <i id="people" className="material-icons icons-menu-bottom">view_list</i>} 
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


function mapStateToProps(state) {
    return {
        listView: state.menu.listView
    };
}
export default connect(mapStateToProps, { setListView, setGridView })(Menu);

