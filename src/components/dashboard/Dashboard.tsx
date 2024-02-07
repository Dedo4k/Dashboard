import "./styles.css";

import React, {Fragment} from "react";
import {DashboardNavbar} from "./dashboard-navbar";
import {EmptyElement} from "./empty-element";

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

        return <Fragment>
            <div className={"dashboard-container"}>
                <DashboardNavbar/>
                <div className={"dashboard"}>
                    {
                        elements.map((el, index) => <Fragment key={index}>{el}</Fragment>)
                    }
                    <EmptyElement dashboard={this}/>
                </div>
            </div>
        </Fragment>;
    }
}

export default Dashboard;