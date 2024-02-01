import React from "react";
import "./styles.css";
import {Button} from "react-bootstrap";

type ElementControlsProps = {
    fullscreen: boolean;
    settings: boolean;
    onClose?: () => void;
}

type ElementControlsState = {}

class ElementControls extends React.Component<ElementControlsProps, ElementControlsState> {

    constructor(props: ElementControlsProps) {
        super(props);
    }

    render() {
        const {onClose, settings, fullscreen} = this.props;

        return <>
            <div className={"element-controls"}>
                {settings &&
                    <Button variant={"outline-dark"} size={"sm"} className={"control-btn"}>
                        <i className={"bi bi-gear"}></i>
                    </Button>
                }
                {fullscreen &&
                    <Button variant={"outline-dark"} size={"sm"} className={"control-btn"}>
                        <i className={"bi bi-window-fullscreen"}></i>
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