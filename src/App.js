import React, {Component} from 'react';
import './App.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faHandLizard} from '@fortawesome/fontawesome-free-solid'

import Login from './components/login'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div style={{width: "30%"}}>
                        <FontAwesomeIcon icon={faHandLizard} border size="3x" pull="left" fixedWidth
                                         style={{borderColor: "rgb(66, 165, 245)"}}/>
                    </div>
                    <div style={{float: "left"}}>
                        <h1 className="App-title">Ribbet</h1>
                    </div>
                    <Login/>

                </header>
            </div>
        );
    }
}

export default App;
