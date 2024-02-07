import "./styles.css";

import React, {Fragment} from "react";
import {ElementControls} from "./element-controls";
import Dashboard from "../Dashboard";

export type BasicElementProps = {
    dashboard: Dashboard,
    uniqueKey: string,
    settings?: boolean,
    fullscreen?: boolean,
    onClose?: () => void
}

export type BasicElementState = {
    fullscreen: boolean
}

class BasicElement extends React.Component<BasicElementProps, BasicElementState> {

    constructor(props: BasicElementProps) {
        super(props);

        this.state = {
            fullscreen: false
        };

        this.onClose = this.onClose.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.setFullscreen = this.setFullscreen.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
    }

    setFullscreen(value: boolean) {
        this.setState((state) => ({
            ...state,
            fullscreen: value
        }));
    }

    onClose() {
        const {dashboard, uniqueKey} = this.props;

        this.props.onClose && this.props.onClose();
        dashboard.removeElement(uniqueKey);
    }

    toggleFullscreen() {
        this.setFullscreen(!this.state.fullscreen);
    }

    renderContent() {
        return <p>{this.props.uniqueKey}</p>
    }

    render() {
        const {fullscreen, settings} = this.props;
        const {onClose, toggleFullscreen} = this;

        return <Fragment>
            <div className={`dashboard-element ${this.state.fullscreen ? "fullscreen-element" : ""}`}>
                <ElementControls fullscreen={!!fullscreen} toggleFullscreen={toggleFullscreen}
                                 settings={!!settings} onClose={onClose} element={this}/>
                <div className={"element-content"}>
                    {this.renderContent()}
                </div>
            </div>
        </Fragment>;
    }
}

export default BasicElement;