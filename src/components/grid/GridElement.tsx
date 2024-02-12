import "./styles.css";

import React, {Fragment} from "react";
import Grid from "./Grid";
import ResizeHandler from "./ResizeHandler";

export type GridElementProps = {
    row: number;
    col: number;
    width: number;
    height: number;
    children?: React.ReactNode;
    color?: string;
    setResize?: (x: number, y: number, value: boolean) => void;
    grid?: Grid;
    resizeHandler?: ResizeHandler;
}

export type GridElementState = {
    row: number;
    col: number;
    width: number;
    height: number;
    startX?: number;
    startY?: number;
}

class GridElement extends React.Component<GridElementProps, GridElementState> {

    ref: React.RefObject<HTMLDivElement>;

    constructor(props: GridElementProps) {
        super(props);

        this.state = {
            col: this.props.col,
            row: this.props.row,
            width: this.props.width,
            height: this.props.height,
        }
        this.ref = React.createRef();
    }

    setPosition = (row: number, col: number) => {
        this.setState((state) => ({
                ...state,
                col: col,
                row: row,
                startX: undefined,
                startY: undefined
            })
        );
    }

    setResizedPosition = (row: number, col: number, width: number, height: number) => {
        this.setState((state) => ({
                ...state,
                col: col,
                row: row,
                width: width,
                height: height
            })
        );
    }

    setStartCords = (x: number | undefined, y: number | undefined) => {
        this.setState((state) => ({
            ...state,
            startX: x,
            startY: y
        }));
    }

    handleDragStartEvent = (e: React.DragEvent<HTMLDivElement>) => {
        const {clientX, clientY} = e;
        if (this.state.startX || this.state.startY) {
            return;
        }
        this.setStartCords(clientX, clientY);
    }

    handleDragEndEvent = (e: React.DragEvent) => {
        const {clientX, clientY} = e;
        if (!this.state.startX || !this.state.startY) {
            return;
        }
        const dx = clientX - this.state.startX;
        const dy = clientY - this.state.startY;
        const cellSize = this.props.grid?.props.cellSize!!;
        let dCol: number;
        const a = Math.trunc(dx / cellSize);
        const da = dx - a * cellSize;
        if (dx > 0) {
            if (da >= cellSize / 2) {
                dCol = a + 1;
            } else {
                dCol = a;
            }
        } else {
            if (Math.abs(da) >= cellSize / 2) {
                dCol = a - 1;
            } else {
                dCol = a;
            }
        }
        let dRow: number;
        const b = Math.trunc(dy / cellSize);
        const db = dy - b * cellSize;
        if (dy > 0) {
            if (db >= cellSize / 2) {
                dRow = b + 1;
            } else {
                dRow = b;
            }
        } else {
            if (Math.abs(db) >= cellSize / 2) {
                dRow = b - 1;
            } else {
                dRow = b;
            }
        }
        const newCol = this.state.col + dCol;
        const newRow = this.state.row + dRow;

        if (!this.validateCords(newRow, newCol, this.state.width, this.state.height)) {
            this.setStartCords(undefined, undefined);
            return;
        }

        this.setPosition(newRow, newCol);
    }

    validateCords = (row: number, col: number, width: number, height: number): boolean => {
        const {rows, cols} = this.props.grid!!.props;
        return !(row <= 0 || row > rows!! + 1 ||
            col <= 0 || col > cols!! + 1 ||
            row + height > rows!! + 1 ||
            col + width > cols!! + 1 ||
            width <= 0 ||
            height <= 0);
    }

    handleResizeStartEvent = (e: React.MouseEvent<HTMLDivElement>, dir: string) => {
        e.preventDefault();
        const {clientX, clientY} = e;

        if (this.props.resizeHandler?.resizeStartX || this.props.resizeHandler?.resizeStartX) {
            return;
        }

        this.props.resizeHandler!!.startResize(this, clientX, clientY, dir);
    }

    render() {
        const rowEnd = this.state.row + this.state.height;
        const colEnd = this.state.col + this.state.width;

        const style = {
            gridRow: `${this.state.row} / ${rowEnd}`,
            gridColumn: `${this.state.col} / ${colEnd}`,
            backgroundColor: this.props.color
        }

        return <Fragment>
            <div className={"grid-element"} style={style}>
                <div className={"top-resizer"}
                     onMouseDown={(e) => this.handleResizeStartEvent(e, "top")}></div>
                <div className={"right-resizer"} onMouseDown={(e) => this.handleResizeStartEvent(e, "right")}></div>
                <div className={"bottom-resizer"} onMouseDown={(e) => this.handleResizeStartEvent(e, "bottom")}></div>
                <div className={"left-resizer"} onMouseDown={(e) => this.handleResizeStartEvent(e, "left")}></div>
                <div ref={this.ref} className={"grid-element-content"} draggable={true}
                     onDragStart={this.handleDragStartEvent}
                     onDragEnd={this.handleDragEndEvent}>
                    {this.state.row}/{this.state.col}/{this.state.width}/{this.state.height}
                    {this.props.children}
                </div>
            </div>
        </Fragment>;
    }
}

export default GridElement;