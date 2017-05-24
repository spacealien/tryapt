import React from 'react';
import ReactDOM from 'react-dom';
import MenuTop from '../containers/menu_top.jsx';

/**
 * The HomeView component includes the top menu and the main content
 * consisting of APT, TRY and OPT logos. 
 */

class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div>
                    <MenuTop
                        menu="default"
                        headline={"Hjem"} />
                    <div className="home-container">
                    
                        <div className="home-logo">
                            <p className="try-logo"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.29 40.1">
                                    <title>try</title>  
                                    <rect x="23.74" width="2.55" height="40.1" fill="#e96c24"></rect>
                                    <polygon points="9.76 34 5.69 34 1.82 30.13 0.09 31.83 3.34 35.12 0.09 38.37 1.82 40.1 5.48 36.44 9.76 36.44 9.76 34"></polygon>
                                    <path d="M7.27,15.27v3.58L1.49,14.92.09,17l3.08,2.11H2.93a3,3,0,0,0,0,6H9.76V15.24l-2.49,0Zm0,7.68h-4a.81.81,0,0,1-.79-.82.8.8,0,0,1,.79-.82h4Z"></path>
                                    <polygon points="7.21 0 7.21 3.55 0.09 3.55 0.09 6.13 7.21 6.13 7.21 9.67 9.76 9.67 9.76 6.13 9.76 3.55 9.76 0 7.21 0">               
                                    </polygon>
                                </svg> </p>
                        </div>
                        <div className="home-logo">
                            <img src="/apt_logo.jpg" alt="apt_logo"/>
                        </div>
                        <div className="home-logo">  
                            <img src="/opt_logo.jpg" alt="opt_logo"/>
                        </div>
                    </div>
                </div>
                );
    }
}
export default HomeView;
