/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

class MarkDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,

            isAllMarked: false,
            markAllOptionText: 'Marker Alle'

        };


        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        if (!this.state.visible) {
            document.getElementById('markDropdown').style.display = 'block';
        }
        else {
            document.getElementById('markDropdown').style.display = 'none';
        }
        this.setState({
            visible: !this.state.visible
        });
    }

    toggleMarkAll() {
        this.props.onToggleMarkAll(this.state.isAllMarked);
        this.setState({ isAllMarked: !this.state.isAllMarked });
        if (this.state.markAllOptionText == 'Marker Alle') {
            this.setState({ markAllOptionText: 'Marker Ingen' });
        } else {
            this.setState({ markAllOptionText: 'Marker Alle' });
        }
    }


    render() {
        const { markAllOptionText } = this.state;

        return (
            <div className="mark-dropdown"  >

                <img
                    className='mark-dropimg'
                    src='https://cdn1.iconfinder.com/data/icons/pixel-perfect-at-16px-volume-2/16/5001-128.png'
                    onClick={() => this.toggle()} />

                <div id='markDropdown' className='mark-dropdown-content'>

                    <div
                        className='mark-dropdown-element'
                        onClick={() => this.toggleMarkAll()}>{markAllOptionText}</div>

                    <div className='mark-dropdown-element'>Send til markerte<img src='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_right_48px-64.png' /> </div>
                </div>
            </div>
        );
    }
}
export default MarkDropdown;