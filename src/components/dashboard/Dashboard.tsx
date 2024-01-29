import React from "react";
import "./styles.css";
import DashboardElement from "./dashboard-element";
import DashboardNavbar from "./dashboard-navbar";
import EmptyElement from "./empty-element";

type DashboardProps = {

}

type DashboardState = {

}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor(props: DashboardProps) {
        super(props);
    }

    render() {
        return <>
            <div className={"dashboard-container"}>
                <DashboardNavbar/>
                <div className={"dashboard"}>
                    <DashboardElement settings={true} fullscreen={true} onClose={() => console.log("1")}>
                        <p>1</p>
                    </DashboardElement>
                    <DashboardElement settings={true} onClose={() => console.log("2")}>
                        <p>2</p>
                    </DashboardElement>
                    <DashboardElement fullscreen={true} onClose={() => console.log("3")}>
                        <p>3</p>
                    </DashboardElement>
                    <DashboardElement onClose={() => console.log("4")}>
                        <p>4</p>
                    </DashboardElement>
                    <DashboardElement settings={true} fullscreen={true}>
                        <p>5</p>
                    </DashboardElement>
                    <DashboardElement fullscreen={true}>
                        <p>6</p>
                    </DashboardElement>
                    <EmptyElement/>
                </div>
            </div>
        </>;
    }
}

export default Dashboard;