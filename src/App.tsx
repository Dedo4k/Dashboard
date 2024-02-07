import './App.css';

import React from 'react';
import {Dashboard} from "./components/dashboard";

class App extends React.Component<any, any> {

    render() {
        return (
            <div className="App">
                <div className={"dashboard-view"}>
                    <Dashboard></Dashboard>
                </div>
            </div>
        );
    }
}

export default App;
