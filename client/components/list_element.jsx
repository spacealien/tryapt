import React from 'react';

/**
 * This component is represents one employee row in the in the list
 * of employees. 
 */

class ListElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var markedClassName = this.props.marked === true ? "list-group-item mark btn" : "list-group-item btn";
        const parsedUrl = this.props.employee.image.replace('http','https');

        return (
            <li className={markedClassName} onClick={() => this.props.onEmployeeClick(this.props.employee)} >
                <div className="row" >
                    <div className="col-sm-3">
                        <div className="image-container">
                            <img className="img-thumbnail" src={parsedUrl} alt="employee profile picture" width="200" height="200" />
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="info-box-container">
                            <div className="names"><h4>{this.props.employee.name}</h4></div>
                            <div className="positions"><p>{this.props.employee.company}, {this.props.employee.jobtitle}</p></div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}
export default ListElement;