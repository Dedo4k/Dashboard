import {BasicConfig} from "../../basic-element";
import React, {Fragment} from "react";
import TestElement from "./TestElement";
import {FormControl, InputGroup} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";

class TestConfig extends BasicConfig {
    readonly type: React.ComponentType<any> = TestElement;
    private _value = "";

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    handleValue(value: string, changeConfig: (config: BasicConfig) => void) {
        this._value = value;
        changeConfig(this);
    }

    toProps() {
        return {
            ...super.toProps(),
            value: this.value
        };
    }

    renderConfig(changeConfig: (config: BasicConfig) => void): JSX.Element {
        return <Fragment>
            {super.renderConfig(changeConfig)}
            <InputGroup>
                <InputGroupText>Value</InputGroupText>
                <FormControl aria-label={"Value"}
                             onChange={(event) => this.handleValue(event.currentTarget.value, changeConfig)}/>
            </InputGroup>
        </Fragment>
    }
}

export default TestConfig;