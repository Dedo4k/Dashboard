import React, {Fragment} from "react";
import {FormCheck} from "react-bootstrap";
import {BasicElement} from "./index";
import {BasicElementProps} from "./BasicElement";

class BasicConfig {
    readonly type: React.ComponentType<any> = BasicElement;
    private _settings = false;
    private _fullscreen = false;

    get settings(): boolean {
        return this._settings;
    }

    set settings(value: boolean) {
        this._settings = value;
    }

    get fullscreen(): boolean {
        return this._fullscreen;
    }

    set fullscreen(value: boolean) {
        this._fullscreen = value;
    }

    handleSettings(changeConfig: (config: BasicConfig) => void) {
        this._settings = !this._settings;
        changeConfig(this);
    }

    handleFullscreen(changeConfig: (config: BasicConfig) => void) {
        this._fullscreen = !this._fullscreen;
        changeConfig(this);
    }

    toProps(): BasicElementProps {
        return {
            settings: this.settings,
            fullscreen: this.fullscreen
        } as BasicElementProps;
    }

    renderConfig(changeConfig: (config: BasicConfig) => void) {
        return <Fragment>
            <FormCheck type={"switch"} label={"Is configurable"} value={this._settings.toString()}
                       onClick={() => this.handleSettings(changeConfig)}/>
            <FormCheck type={"switch"} label={"Is fullscreen"} value={this._fullscreen.toString()}
                       onClick={() => this.handleFullscreen(changeConfig)}/>
        </Fragment>
    }
}

export default BasicConfig;