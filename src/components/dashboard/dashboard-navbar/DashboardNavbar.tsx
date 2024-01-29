import React from "react";
import "./styles.css";
import {Button} from "react-bootstrap";

type DashboardNavbarProps = {

}

type DashboardNavbarState = {

}

class DashboardNavbar extends React.Component<DashboardNavbarProps, DashboardNavbarState> {

    constructor(props: DashboardNavbarProps) {
        super(props);
    }

    render() {
        return <>
            <div className={"dashboard-navbar"}>
                <Button variant={"dark"} size={"sm"} className={"dashboard-btn"}>
                    <i className={"bi bi-gear"}></i>
                    <span>Options</span>
                </Button>
            </div>
        </>;
    }
}

export default DashboardNavbar;