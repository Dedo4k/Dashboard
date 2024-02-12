import "./styles.css";

import React, {Fragment} from "react";
import ResizeHandler from "./ResizeHandler";

export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
    rows: number;
    cols: number;
    cellSize: number;
    children?: any;
    color?: string;
}

export type GridState = {
    clientX: number;
    clientY: number;
    isResizing: boolean;
    resizeX?: number;
    resizeY?: number;
}

class Grid extends React.Component<GridProps, GridState> {

    ref: React.RefObject<HTMLDivElement>;
    resizeHandler: ResizeHandler;

    constructor(props: GridProps) {
        super(props);

        this.ref = React.createRef();
        this.resizeHandler = new ResizeHandler(this);

        this.state = {
            clientX: 0,
            clientY: 0,
            isResizing: false
        };
    }

    setCords = (x: number, y: number) => {
        this.setState((state) => ({
            ...state,
            clientX: x,
            clientY: y
        }));
    }

    setResizing = (x: number | undefined, y: number | undefined, value: boolean) => {
        this.setState((state) => ({
            ...state,
            resizeX: x,
            resizeY: y,
            isResizing: value
        }));
    }

    handleMouseMoveEvent = (e: React.MouseEvent) => {
        this.setCords(e.clientX, e.clientY);
    }

    handleMouseUpEvent = (e: React.MouseEvent) => {
        if (this.resizeHandler.resizingObject) {
            this.resizeHandler.endResize(e.clientX, e.clientY);
        }
    }

    render() {
        const style = {
            ...this.props.style,
            backgroundColor: this.props.color,
            width: this.props.cols * this.props.cellSize + 6 * (this.props.cols - 1),
            height: this.props.rows * this.props.cellSize + 6 * (this.props.rows - 1),
            gridTemplateColumns: `repeat(${this.props.cols}, ${this.props.cellSize}px)`,
            gridTemplateRows: `repeat(${this.props.rows}, ${this.props.cellSize}px)`
        }

        return <Fragment>
            <div>ClientX: {this.state.clientX} ClientY: {this.state.clientY}</div>
            <div ref={this.ref} className={"grid"} style={style} onMouseMove={this.handleMouseMoveEvent}
                 onMouseUp={this.handleMouseUpEvent}>
                {
                    React.Children.map(this.props.children, (ch) => {
                        return React.cloneElement(ch, {
                            grid: this,
                            setResize: this.setResizing,
                            resizeHandler: this.resizeHandler
                        });
                    })
                }
            </div>
        </Fragment>;
    }
}

export default Grid;