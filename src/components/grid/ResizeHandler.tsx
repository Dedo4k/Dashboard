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
            const newRow = this.resizingObject?.state.row!! + dRow;

            if (!this.resizingObject?.validateCords(newRow, this.resizingObject?.state.col)) {
                this.resetResizer();
                return;
            }

            this.resizingObject?.setResizedPosition(newRow,
                this.resizingObject?.state.col,
                this.resizingObject?.state.width,
                this.resizingObject?.state.height + -dRow);
        } else if (this.direction === "left" || this.direction === "right") {

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