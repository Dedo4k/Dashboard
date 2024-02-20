import "./styles.css";

import React from "react";
import {Button} from "react-bootstrap";
import BasicElement, {BasicElementProps, BasicElementState} from "../BasicElement";

type ElementControlsProps<T> = {
    element: T,
    fullscreen: boolean,
    settings: boolean,
    onClose: () => void,
    toggleFullscreen: () => void,
    toggleConfiguration?: () => void;
}

type ElementControlsState = {}

class ElementControls<T extends BasicElement<BasicElementProps, BasicElementState>> extends React.Component<ElementControlsProps<T>, ElementControlsState> {

    constructor(props: ElementControlsProps<T>) {
        super(props);
    }

    render() {
        const {element, onClose, settings, fullscreen, toggleFullscreen, toggleConfiguration} = this.props;

        return <>
            <div className={"element-controls"}>
                {settings &&
                    <Button variant={"outline-dark"} size={"sm"} className={"control-btn"} onClick={toggleConfiguration}>
                        <i className={"bi bi-gear"}></i>
                    </Button>
                }
                {fullscreen &&
                    <Button variant={"outline-dark"} size={"sm"} className={"control-btn"} onClick={toggleFullscreen}>
                        {
                            !element.state.fullscreen ?
                                <i className={"bi bi-window-fullscreen"}></i>
                                :
                                <i className={"bi bi-dash-lg"}></i>
                        }
                    </Button>
                }
                <Button variant={"outline-dark"} size={"sm"} className={"control-btn"} onClick={onClose}>
                    <i className={"bi bi-x-lg"}></i>
                </Button>
            </div>
        </>;
    }
}

export default ElementControls;