import React from 'react';


/**
 * Defines the drop down menu for when marking on employee list 
 * is active.
 */

class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            isAllMarked: false,
            markAllOptionText: 'Marker alle'

        };

        this.toggle = this.toggle.bind(this);
    }

    // Method for toggeling visibility for drop down menu
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

    /**
     * Toggle marking for all employees on or off for 
     */
    toggleMarkAll() {
        // onToggleMarkAll is a callback method derived from employee_view
        this.props.onToggleMarkAll(this.state.isAllMarked);


        this.setState({ isAllMarked: !this.state.isAllMarked });
        if (this.state.markAllOptionText == 'Marker Alle') {
            this.setState({ markAllOptionText: 'Marker Ingen' });
        } else {
            this.setState({ markAllOptionText: 'Marker Alle' });
        }
    }


    render() {
        // markAllOptionText is the dropdown option text
        const { markAllOptionText } = this.state;

        return (


            <div className="mark-dropdown"  >
                {/* show dropdown on and off toggle button  */}
                {!this.state.visible && <img
                    className='mark-dropimg'
                    src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-08-128.png"
                    onClick={() => this.toggle()} />}
                {this.state.visible && <img
                    className='mark-dropimg'
                    src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-07-128.png"
                    onClick={() => this.toggle()} />}


                {/* following code defines HTML elements inside the dropdown menu */}
                <div id='markDropdown' className='mark-dropdown-content'>
                    <div
                        className='mark-dropdown-element'
                        onClick={() => this.toggleMarkAll()}>{markAllOptionText}</div>

                    <div id="email" onClick={(e) => this.props.sendToMarked(e)}
                        className='mark-dropdown-element'>
                        Send e-post til markerte<img src='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_right_48px-64.png' />
                    </div>

                    <div id="sms" onClick={(e) => this.props.sendToMarked(e)}
                        className='mark-dropdown-element'>
                        Send SMS til markerte<img src='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_right_48px-64.png' />
                    </div>
                    <div
                        className='mark-dropdown-element'
                        onClick={() => this.props.onBack()}>Avbryt</div>
                </div>
            </div>
        );
    }
}
export default Dropdown;
