import React from 'react';


const GridElement = ({ employee, onEmployeeSelect, marked }) => {

    var markedClassName = marked === true ? "col-xs-4 thumb mark-grid-element btn" : "col-xs-4 thumb btn";

    return (

        <div className={markedClassName} onClick={() => onEmployeeSelect(employee)}>
            <div className="media">
                <img className="img-thumbnail" src={employee.image} width="200" height="200" />
                <div className="firstName">{employee.name.substring(0, employee.name.indexOf(' '))}</div>
            </div>
        </div>

    );
};
export default GridElement;
