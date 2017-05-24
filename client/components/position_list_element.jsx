import React from 'react';
import ReactDom from 'react-dom';

/**
 *  This class is responsible for creating a list element 
 *  which displays the diffrent jobtitles the 
 *  filter view.
 */
class PositionListElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // checks if the jobtitle for the current jobtitle element is checked off. 
        // If checked is true, it will use checked-position class on the list element.
        var checkedClassName = this.props.checked === true ? "list-group-item positions checked-position" : "list-group-item positions";
        
        return (
            <li className={checkedClassName} onClick={() => this.props.onPositionClick(this.props.jobtitle)}>
                <div className="row">
                    <div className="col-sm-10">
                        {this.props.jobtitle}</div>
                    <div className="col-sm-2">
                        <img id={this.props.jobtitle} src="https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/48x48/check.png" alt="check icon" />
                    </div>
                </div>
            </li>
        );
    }
}
export default PositionListElement;