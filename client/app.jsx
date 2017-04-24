import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import MenuBottom from './components/menu_bottom.jsx';
import { routes } from './routes/routes.jsx';

import reducers  from './reducers';


class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router history={browserHistory} routes={routes} />
                <MenuBottom browserHistory={browserHistory} />
            </div>
        );
    }
}
export default App;

