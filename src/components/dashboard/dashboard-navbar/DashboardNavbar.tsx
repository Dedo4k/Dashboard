import "./styles.css";

import React, {Fragment} from "react";
import {Button} from "react-bootstrap";

export type DashboardNavbarProps = {}

export type DashboardNavbarState = {}

class DashboardNavbar extends React.Component<DashboardNavbarProps, DashboardNavbarState> {

    constructor(props: DashboardNavbarProps) {
        super(props);
    }

    render() {
        return <Fragment>
            <div className={"dashboard-navbar"}>
                <Button variant={"dark"} size={"sm"} className={"dashboard-btn"}>
                    <i className={"bi bi-gear"}></i>
                    <span>Options</span>
                </Button>
            </div>
        </Fragment>;
    }
}

export default DashboardNavbar;