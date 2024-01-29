import React from 'react';
import './App.css';
import Dashboard from "./components/dashboard";

class App extends React.Component<any, any> {

    render() {
        return (
            <div className="App">
                <Dashboard></Dashboard>
            </div>
        );
    }
}

export default App;
