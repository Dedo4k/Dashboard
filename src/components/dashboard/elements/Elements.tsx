import React from "react";
import {BasicConfig} from "../basic-element";
import ElementInfo from "./ElementInfo";
import {TestConfig} from "./test-element";

const Elements: ElementInfo[] = [
    new ElementInfo(BasicConfig, "Basic Element", "Basic Element"),
    new ElementInfo(TestConfig, "Test Element", "Test Element")
];

export default Elements;