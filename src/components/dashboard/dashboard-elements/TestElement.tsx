import SimpleElement, {SimpleElementProps, SimpleElementState} from "../simple-element";
import React from "react";


export type TestElementProps = SimpleElementProps & {
    value: string
}

export type TestElementState = SimpleElementState & {
    value: string
}

class TestElement extends SimpleElement<TestElementProps, TestElementState> {

    constructor(props: TestElementProps) {
        super(props);
    }

    content = (): React.ReactNode => {
        return <p>{this.props.value}</p>;
    };

    static getConfig = () => {
        return {
            ...SimpleElement.getConfig(),
            value: ""
        } as TestElementProps;
    }
}

export default TestElement;