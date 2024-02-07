import React from "react";
import {BasicConfig} from "../basic-element";

class ElementInfo {
    private readonly _title: string;
    private readonly _description: string;
    private readonly _config: typeof BasicConfig;

    constructor(config: typeof BasicConfig, title: string, description: string) {
        this._config = config;
        this._title = title;
        this._description = description;
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }


    get config(): typeof BasicConfig {
        return this._config;
    }
}

export default ElementInfo;