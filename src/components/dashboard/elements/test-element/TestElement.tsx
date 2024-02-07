import {BasicElement} from "../../basic-element";
import {BasicElementProps, BasicElementState} from "../../basic-element/BasicElement";
import {Fragment} from "react";

type TestElementProps = BasicElementProps & {
    value: string
}

type TestElementState = BasicElementState & {
    date: Date
}

class TestElement extends BasicElement<TestElementProps, TestElementState> {

    timeoutId?: NodeJS.Timeout;


    constructor(props: TestElementProps) {
        super(props);
        this.state = {
            date: new Date()
        } as TestElementState;
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
                <p>{this.props.value}</p>

                <p>{this.state.date.toLocaleString()}</p>
            </div>
        </Fragment>;
    }
}

export default TestElement;