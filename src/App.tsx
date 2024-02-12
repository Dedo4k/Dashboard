import './App.css';

import React from 'react';
import {Grid, GridElement} from "./components/grid";

class App extends React.Component<any, any> {

    render() {
        return (
            <div className="App">
                <div className={"dashboard-view"}>
                    {/*<Dashboard></Dashboard>*/}
                    <Grid rows={30} cols={30} cellSize={40} color={"#6E40BF"}>
                        <GridElement row={1} col={1} width={1} height={1} color={"#D9E3F0"}></GridElement>
                        <GridElement row={1} col={5} width={3} height={4} color={"#FF8A65"}></GridElement>
                        <GridElement row={10} col={3} width={3} height={4} color={"#F47373"}></GridElement>
                        <GridElement row={15} col={15} width={3} height={4} color={"#37D67A"}>
                            <div></div>
                        </GridElement>
                        <GridElement row={20} col={7} width={3} height={4} color={"#2CCCE4"}></GridElement>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default App;
