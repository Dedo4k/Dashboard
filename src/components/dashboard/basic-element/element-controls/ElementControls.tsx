import "./styles.css";

import React from "react";
import {Button} from "react-bootstrap";
import BasicElement from "../BasicElement";

type ElementControlsProps = {
    element: BasicElement,
    fullscreen: boolean,
    settings: boolean,
    onClose: () => void,
    toggleFullscreen: () => void,
}

type ElementControlsState = {}

class ElementControls extends React.Component<ElementControlsProps, ElementControlsState> {

    constructor(props: ElementControlsProps) {
        super(props);
    }

    render() {
        const {element, onClose, settings, fullscreen, toggleFullscreen} = this.props;

        return <>
            <div className={"element-controls"}>
                {settings &&
                    <Button variant={"outline-dark"} size={"sm"} className={"control-btn"}>
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