import React, {Fragment} from "react";
import "./styles.css";
import SimpleElement, {SimpleElementProps, SimpleElementState} from "./simple-element";
import DashboardNavbar from "./dashboard-navbar";
import EmptyElement from "./empty-element";
import TestElement from "./dashboard-elements";

type DashboardProps = {}

type DashboardState = {
    elements: SimpleElement<SimpleElementProps, SimpleElementState>[]
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            elements: [
                new TestElement({value: "1", fullscreen: true, settings: true}),
                new TestElement({value: "2"}),
                new TestElement({value: "3", settings: false}),
                new TestElement({value: "4", fullscreen: true, settings: false}),
                new TestElement({value: "5", fullscreen: true}),
                new TestElement({value: "6", settings: true}),
                new TestElement({value: "7", fullscreen: false, settings: true}),
            ]
        };
    }

    render() {
        const {elements} = this.state;

        return <>
            <div className={"dashboard-container"}>
                <DashboardNavbar/>
                <div className={"dashboard"}>
                    {
                        elements.map((el, index) => <Fragment key={index}>{el.render()}</Fragment>)
                    }
                    <EmptyElement/>
                </div>
            </div>
        </>;
    }
}

export default Dashboard;