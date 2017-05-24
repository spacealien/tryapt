import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import MenuBottom from './containers/menu_bottom.jsx';
import { routes } from './routes/routes.jsx';

/**
 * App is the application parent component,
 * all other components are children of this component.
 */

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // The router is created in this component. 
        // the diffrent URLs decides how the application is rendered.
        return (
            <div>
                <Router history={browserHistory} routes={routes} />
                <MenuBottom browserHistory={browserHistory} />
            </div>
        );
    }
}
export default App;

