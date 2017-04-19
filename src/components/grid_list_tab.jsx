/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

class GridListTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = { view: 'visible' };
    }

    showGridListTab() {
        this.setState({ view: 'visible' });
    }

    hideGridListTab() {
        this.setState({ view: 'hidden' });
    }

    handleClick(e) {
        var id = e.target.id;
        switch (id) {
            case "list":
                this.props.onChangeView('list');
                break;
            case "grid":
                this.props.onChangeView('grid');
                break;
        }
    }

    render() {

        return (
            <div id="view-tab" className="viewTab row">
                <div className="col-sm-4">
                    <img id="list" src="https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/Menu1-128.png" onClick={(e) => this.handleClick(e)} />
                </div>
                <div className="col-sm-4 minimize-space">
                    <img className="rotate-line" src="https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_line-128.png" />
                </div>
                <div className="col-sm-4">
                    <img id="grid" src="https://cdn0.iconfinder.com/data/icons/layout-and-location/24/Untitled-2-30-128.png" onClick={(e) => this.handleClick(e)} />
                </div>

            </div>
        );
    }
}
export default GridListTab;