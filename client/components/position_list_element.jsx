/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import ReactDom from 'react-dom';

class PositionListElement extends React.Component {

    constructor(props) {
        super(props);

    }
    
    /*handleClick() {
        
        if (document.getElementById(this.props.jobtitle).style.display === "none")
        {document.getElementById(this.props.jobtitle).style.display="initial";}
        else
        {document.getElementById(this.props.jobtitle).style.display="none";}
        
        this.setState({ selected: !this.state.selected });
    }*/

    render() {
        var checkedClassName = this.props.checked === true ? "list-group-item positions checked-position" : "list-group-item positions";
        return (
            <li className={checkedClassName} onClick={() => this.props.onPositionClick(this.props.jobtitle)}>
            <div className="row">
            <div className="col-sm-10">
                {this.props.jobtitle}</div>
            <div className="col-sm-2"><img id={this.props.jobtitle} src="https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/48x48/check.png"
                         /> </div></div></li>
        );
    }
}
export default PositionListElement;