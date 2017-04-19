import React from 'react';


const GridElement = ({employee, onEmployeeSelect}) => {
    return (
            <div  className="col-xs-4 thumb" onClick={ () => onEmployeeSelect(employee) }>
                <div className="media">
                    <img className="img-thumbnail" src={employee.image} width="200" height="200"/>
                    <div className="media-body">{employee.name.substring(0, employee.name.indexOf(' '))}</div>
                </div>
            </div>

            );
};
export default GridElement;
