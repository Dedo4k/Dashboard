import {BasicElement} from "../../basic-element";
import {BasicElementProps, BasicElementState} from "../../basic-element/BasicElement";
import {Fragment} from "react";

export type ClockElementProps = BasicElementProps & {
    timeZone: string
}

type ClockElementState = BasicElementState & {
    date: Date
}

class ClockElement extends BasicElement<ClockElementProps, ClockElementState> {

    timeoutId?: NodeJS.Timeout;

    constructor(props: ClockElementProps) {
        super(props);
        this.state = {
            date: new Date()
        } as ClockElementState;
    }

    setDate(date: Date) {
        this.setState((state) => ({
            ...state,
            date: date
        }));
    }

    componentDidMount() {
        this.timeoutId = setInterval(() => this.setDate(new Date()), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timeoutId);
    }

    renderContent(): JSX.Element {
        return <Fragment>
            <div>
                <p>{this.props.timeZone}</p>

                <p>{this.state.date.toLocaleString(undefined, {timeZone: this.props.timeZone})}</p>
            </div>
        </Fragment>;
    }
}

export default ClockElement;