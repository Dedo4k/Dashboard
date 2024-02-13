import {BasicConfig} from "../../basic-element";
import React, {Fragment} from "react";
import ClockElement, {ClockElementProps} from "./ClockElement";
import {FormSelect, InputGroup} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";

class ClockConfig extends BasicConfig {
    readonly type: React.ComponentType<any> = ClockElement;
    private _timeZone = "";

    get timeZone(): string {
        return this._timeZone;
    }

    set timeZone(value: string) {
        this._timeZone = value;
    }

    handleValue(value: string, changeConfig: (config: BasicConfig) => void) {
        this._timeZone = value;
        changeConfig(this);
    }

    toProps() {
        return {
            ...super.toProps(),
            timeZone: this.timeZone
        } as ClockElementProps;
    }

    renderConfig(changeConfig: (config: BasicConfig) => void): JSX.Element {
        // @ts-ignore
        const timeZones: [] = Intl.supportedValuesOf("timeZone");
        return <Fragment>
            {super.renderConfig(changeConfig)}
            <InputGroup>
                <InputGroupText>Timezone</InputGroupText>
                <FormSelect aria-label={"Timezone"}
                            onChange={(event) => this.handleValue(event.currentTarget.value, changeConfig)}>
                    {
                        timeZones.map((tz) => <option>{tz}</option>)
                    }
                </FormSelect>
            </InputGroup>
        </Fragment>
    }
}

export default ClockConfig;