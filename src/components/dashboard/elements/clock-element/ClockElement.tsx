import {BasicElement} from "../../basic-element";
import {BasicElementProps, BasicElementState} from "../../basic-element/BasicElement";
import {Fragment} from "react";
import {ClockConfig} from "./index";

export type ClockElementProps = BasicElementProps & {
    timeZone: string
}

type ClockElementState = BasicElementState & {
    date: Date,
    timeZone: string
}

class ClockElement extends BasicElement<ClockElementProps, ClockElementState> {

    timeoutId?: NodeJS.Timeout;

    constructor(props: ClockElementProps) {
        super(props);
        const date = new Date();
        this.state = {
            timeZone: this.props.timeZone,
            date: date,
            fullscreen: false,
            configurationModal: false
        } as ClockElementState;
    }

    setDate(date: Date) {
        this.setState((state) => ({
            ...state,
            date: date
        }));
    }

    setTimeZone(timeZone: string) {
        this.setState((state) => ({
            ...state,
            timeZone: timeZone
        }));
    }

    componentDidMount() {
        this.timeoutId = setInterval(() => this.setDate(new Date()), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timeoutId);
    }

    getConfig = (): ClockConfig => {
        const clockConfig = new ClockConfig();
        clockConfig.timeZone = this.state.timeZone;
        clockConfig.fullscreen = !!this.props.fullscreen;
        clockConfig.settings = !!this.props.settings;
        return clockConfig;
    };

    updateConfig(config: ClockConfig) {
        this.setTimeZone(config.timeZone);
    }

    renderContent(): JSX.Element {
        return <Fragment>
            <div>
                <p>{this.state.timeZone}</p>

                <p>{this.state.date.toLocaleString(undefined, {timeZone: this.state.timeZone})}</p>
            </div>
        </Fragment>;
    }
}

export default ClockElement;