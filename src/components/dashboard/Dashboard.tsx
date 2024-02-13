import "./styles.css";

import React, {Fragment} from "react";
import {DashboardNavbar} from "./dashboard-navbar";
import {EmptyElement} from "./empty-element";
import {Grid, GridElement} from "../grid";

export type DashboardProps = {}

export type DashboardState = {
    elements: React.ReactElement[]
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {


    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            elements: []
        };
    }

    setElements(elements: React.ReactElement[]) {
        this.setState((state) => ({
            ...state,
            elements: elements
        }));
    }

    addElement(element: React.ReactElement) {
        const {elements} = this.state;

        this.setElements(elements.concat(element))
    }

    removeElement(uniqueKey: string) {
        const {elements} = this.state;

        this.setElements(elements.filter((el) => el.props.uniqueKey != uniqueKey));
    }

    render() {
        const {elements} = this.state;

        const cells = Math.trunc(window.innerWidth / 10) - 5;

        return <Fragment>
            <div className={"dashboard-container"}>
                <DashboardNavbar/>
                <div className={"dashboard"}>
                    <Grid rows={cells} cols={cells} cellSize={10}>
                        {
                            elements.map((el, index) =>
                                <GridElement row={1} col={1} width={40} height={40} key={index}>{el}</GridElement>)
                        }
                        <GridElement row={1} col={1} width={30} height={20}>
                            <EmptyElement dashboard={this}/>
                        </GridElement>
                    </Grid>
                </div>
            </div>
        </Fragment>;
    }
}

export default Dashboard;