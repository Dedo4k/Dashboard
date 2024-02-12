import React, {Fragment} from "react";

export type ResizerProps = {
    direction: "top" | "right" | "bottom" | "left",
    handleResizeStartEvent: (e: React.MouseEvent<HTMLDivElement>, direction: string) => void;
}

class Resizer extends React.Component<ResizerProps, any> {

    constructor(props: ResizerProps) {
        super(props);
    }

    render() {
        return <Fragment>
            <div className={`${this.props.direction}-resizer`}
                 onMouseDown={(e) => this.props.handleResizeStartEvent(e, this.props.direction)}></div>
        </Fragment>;
    }
}

export default Resizer;