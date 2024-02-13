import React from "react";
import {BasicConfig} from "../basic-element";
import ElementInfo from "./ElementInfo";
import {ClockConfig} from "./clock-element";

const Elements: ElementInfo[] = [
    new ElementInfo(BasicConfig, "Basic Element", "Basic Element"),
    new ElementInfo(ClockConfig, "Clock Element", "Displays current time in specified time zone")
];

export default Elements;