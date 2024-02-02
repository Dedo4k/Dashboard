import React, {Fragment} from "react";
import "./styles.css";
import SimpleElement, {SimpleElementProps, SimpleElementState} from "./simple-element";
import DashboardNavbar from "./dashboard-navbar";
import EmptyElement from "./empty-element";
import {ElementDescription} from "./dashboard-elements";

type DashboardProps = {}

type DashboardState = {
    elements: SimpleElement<SimpleElementProps, SimpleElementState>[]
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            elements: []
        };
    }

    setElements = (elements: SimpleElement<SimpleElementProps, SimpleElementState>[]) => {
        this.setState((state) => ({
            ...state,
            elements: elements
        }));
    }

    addElement = (elementDescription: ElementDescription, config: any) => {
        const {elements} = this.state;
        config.dashboard = this;

        this.setElements(elements.concat(new (elementDescription.elementType as any)(config)));
    }

    removeElement = (element: SimpleElement<SimpleElementProps, SimpleElementState>) => {
        const {elements} = this.state;

        this.setElements(elements.filter(el => el !== element));
    }

    render() {
        const {elements} = this.state;
        const {addElement} = this;

        return <>
            <div className={"dashboard-container"}>
                <DashboardNavbar/>
                <div className={"dashboard"}>
                    {
                        elements.map((el, index) => <Fragment key={index}>{el.render()}</Fragment>)
                    }
                    <EmptyElement onAdd={addElement}/>
                </div>
            </div>
        </>;
    }
}

export default Dashboard;