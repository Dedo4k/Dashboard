import React from "react";
import "./styles.css";
import ElementControls from "./element-controls";

type DashboardElementProps = {
    children: React.ReactNode,
    fullscreen?: boolean;
    settings?: boolean;
    onClose?: () => void;
}

type DashboardElementState = {

}

class DashboardElement extends React.Component<DashboardElementProps, DashboardElementState> {

    constructor(props: DashboardElementProps) {
        super(props);
    }

    render() {
        const {fullscreen, settings, onClose} = this.props;

        return <>
            <div className={"dashboard-element"}>
                <ElementControls fullscreen={!!fullscreen} settings={!!settings} onClose={onClose}/>
                <div className={"element-content"}>
                    {this.props.children}
                </div>
            </div>
        </>;
    }
}

export default DashboardElement;