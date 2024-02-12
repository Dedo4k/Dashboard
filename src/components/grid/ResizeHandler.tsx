import Grid from "./Grid";
import GridElement from "./GridElement";

class ResizeHandler {

    grid: Grid;
    resizeStartX?: number;
    resizeStartY?: number;
    resizingObject?: GridElement;
    direction?: string;

    constructor(grid: Grid) {
        this.grid = grid;
    }

    startResize = (gridElement: GridElement, x: number, y: number, direction: string) => {
        this.resizingObject = gridElement;
        this.resizeStartX = x;
        this.resizeStartY = y;
        this.direction = direction;
    }

    endResize = (x: number, y: number) => {
        const cellSize = this.grid.props.cellSize;
        if (this.direction === "top" || this.direction === "bottom") {
            const dy = y - this.resizeStartY!!;

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
            if (this.direction === "top") {
                const newRow = this.resizingObject?.state.row!! + dRow;

                if (!this.resizingObject?.validateCords(newRow,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width,
                    this.resizingObject?.state.height - dRow)) {
                    this.resetResizer();
                    return;
                }

                this.resizingObject?.setResizedPosition(newRow,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width,
                    this.resizingObject?.state.height - dRow);
            } else {
                if (!this.resizingObject?.validateCords(this.resizingObject?.state.row,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width,
                    this.resizingObject?.state.height + dRow)) {
                    this.resetResizer();
                    return;
                }

                this.resizingObject?.setResizedPosition(this.resizingObject?.state.row,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width,
                    this.resizingObject?.state.height + dRow);
            }
        } else if (this.direction === "left" || this.direction === "right") {
            const dx = x - this.resizeStartX!!;

            let dCol: number;
            const b = Math.trunc(dx / cellSize);
            const db = dx - b * cellSize;
            if (dx > 0) {
                if (db >= cellSize / 2) {
                    dCol = b + 1;
                } else {
                    dCol = b;
                }
            } else {
                if (Math.abs(db) >= cellSize / 2) {
                    dCol = b - 1;
                } else {
                    dCol = b;
                }
            }
            if (this.direction === "right") {
                if (!this.resizingObject?.validateCords(this.resizingObject?.state.row,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width + dCol,
                    this.resizingObject?.state.height)) {
                    this.resetResizer();
                    return;
                }

                this.resizingObject?.setResizedPosition(this.resizingObject?.state.row,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width + dCol,
                    this.resizingObject?.state.height);
            } else {
                const newCol = this.resizingObject?.state.col!! + dCol;

                if (!this.resizingObject?.validateCords(this.resizingObject?.state.row,
                    newCol,
                    this.resizingObject?.state.width - dCol,
                    this.resizingObject?.state.height)) {
                    this.resetResizer();
                    return;
                }

                this.resizingObject?.setResizedPosition(this.resizingObject?.state.row,
                    newCol,
                    this.resizingObject?.state.width - dCol,
                    this.resizingObject?.state.height);
            }
        }

        this.resetResizer();
    }

    resetResizer = () => {
        this.resizingObject = undefined;
        this.resizeStartX = undefined;
        this.resizeStartY = undefined;
        this.direction = undefined;
    }
}

export default ResizeHandler;