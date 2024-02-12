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
            isResizing: false
        };
    }

    setResizing = (x: number | undefined, y: number | undefined, value: boolean) => {
        this.setState((state) => ({
            ...state,
            resizeX: x,
            resizeY: y,
            isResizing: value
        }));
    }

    handleMouseUpEvent = (e: React.MouseEvent) => {
        if (this.resizeHandler.resizingObject) {
            this.resizeHandler.endResize(e.clientX, e.clientY);
        }
    }

    cellDifference = (start: number, end: number): number => {
        const {cellSize} = this.props;

        const diff = start - end;
        let dCell: number;
        const a = Math.trunc(diff / cellSize);
        const da = diff - a * cellSize;
        if (diff > 0) {
            if (da >= cellSize / 2) {
                dCell = a + 1;
            } else {
                dCell = a;
            }
        } else {
            if (Math.abs(da) >= cellSize / 2) {
                dCell = a - 1;
            } else {
                dCell = a;
            }
        }

        return dCell;
    }

    render() {
        const style = {
            ...this.props.style,
            backgroundColor: this.props.color,
            width: this.props.cols * this.props.cellSize,
            height: this.props.rows * this.props.cellSize,
            gridTemplateColumns: `repeat(${this.props.cols}, ${this.props.cellSize}px)`,
            gridTemplateRows: `repeat(${this.props.rows}, ${this.props.cellSize}px)`
        }

        return <Fragment>
            <div ref={this.ref} className={"grid"} style={style}
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