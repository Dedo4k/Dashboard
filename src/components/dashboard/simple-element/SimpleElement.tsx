import React from "react";
import "./styles.css";
import ElementControls from "./element-controls";

export type SimpleElementProps = {
    fullscreen?: boolean;
    settings?: boolean;
}

export type SimpleElementState = {}

class SimpleElement<P extends SimpleElementProps, S> extends React.Component<P, S> {

    constructor(props: P) {
        super(props);
    }

    onClose(): void {
    };

    content(): React.ReactNode {
        return null;
    };

    render() {
        const {fullscreen, settings} = this.props;
        const {onClose} = this;

        return <>
            <div className={"dashboard-element"}>
                <ElementControls fullscreen={!!fullscreen} settings={!!settings} onClose={onClose}/>
                <div className={"element-content"}>
                    {this.content()}
                </div>
            </div>
        </>;
    }
}

export default SimpleElement;