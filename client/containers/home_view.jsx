import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';



import MenuTop from '../components/menu_top.jsx';


class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MenuTop
                    menu="default"
                    headline="Home" />
            </div>
        );
    }
}
export default HomeView;
