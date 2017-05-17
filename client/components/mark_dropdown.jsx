/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,

            isAlled: false,
            AllOptionText: 'er Alle'

        };


        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        if (!this.state.visible) {
            document.getElementById('Dropdown').style.display = 'block';
        }
        else {
            document.getElementById('Dropdown').style.display = 'none';
        }
        this.setState({
            visible: !this.state.visible
        });
    }

    toggleAll() {
        this.props.onToggleAll(this.state.isAlled);
        this.setState({ isAlled: !this.state.isAlled });
        if (this.state.AllOptionText == 'er Alle') {
            this.setState({ AllOptionText: 'er Ingen' });
        } else {
            this.setState({ AllOptionText: 'er Alle' });
        }
    }


    render() {
        const { AllOptionText } = this.state;

        return (
            <div className="-dropdown"  >

                <img
                    className='-dropimg'
                    src='https://cdn1.iconfinder.com/data/icons/pixel-perfect-at-16px-volume-2/16/5001-128.png'
                    onClick={() => this.toggle()} />

                <div id='Dropdown' className='-dropdown-content'>

                    <div
                        className='-dropdown-element'
                        onClick={() => this.toggleAll()}>{AllOptionText}</div>

                    <div className='-dropdown-element'
                    onClick={() => this.props.sendToMarked()}>Send til erte<img src='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_right_48px-64.png' /> </div>
                </div>
            </div>
        );
    }
}
export default Dropdown;