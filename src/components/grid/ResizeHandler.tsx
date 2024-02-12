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
        if (!this.resizeStartX || !this.resizeStartY) {
            return;
        }

        if (this.direction === "top" || this.direction === "bottom") {
            let dRow = this.grid.cellDifference(this.resizeStartY, y);

            if (this.direction === "top") {
                const newRow = this.resizingObject?.state.row!! - dRow;

                if (!this.resizingObject?.validateCords(newRow,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width,
                    this.resizingObject?.state.height + dRow)) {
                    this.resetResizer();
                    return;
                }

                this.resizingObject?.setResizedPosition(newRow,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width,
                    this.resizingObject?.state.height + dRow);
            } else {
                if (!this.resizingObject?.validateCords(this.resizingObject?.state.row,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width,
                    this.resizingObject?.state.height - dRow)) {
                    this.resetResizer();
                    return;
                }

                this.resizingObject?.setResizedPosition(this.resizingObject?.state.row,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width,
                    this.resizingObject?.state.height - dRow);
            }
        } else if (this.direction === "left" || this.direction === "right") {
            let dCol = this.grid.cellDifference(this.resizeStartX, x);

            if (this.direction === "right") {
                if (!this.resizingObject?.validateCords(this.resizingObject?.state.row,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width - dCol,
                    this.resizingObject?.state.height)) {
                    this.resetResizer();
                    return;
                }

                this.resizingObject?.setResizedPosition(this.resizingObject?.state.row,
                    this.resizingObject?.state.col,
                    this.resizingObject?.state.width - dCol,
                    this.resizingObject?.state.height);
            } else {
                const newCol = this.resizingObject?.state.col!! - dCol;

                if (!this.resizingObject?.validateCords(this.resizingObject?.state.row,
                    newCol,
                    this.resizingObject?.state.width + dCol,
                    this.resizingObject?.state.height)) {
                    this.resetResizer();
                    return;
                }

                this.resizingObject?.setResizedPosition(this.resizingObject?.state.row,
                    newCol,
                    this.resizingObject?.state.width + dCol,
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