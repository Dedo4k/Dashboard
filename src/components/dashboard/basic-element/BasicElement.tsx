import "./styles.css";

import React, {Fragment} from "react";
import {ElementControls} from "./element-controls";
import Dashboard from "../Dashboard";
import ConfigurationModal from "../configuration-modal/ConfigurationModal";
import BasicConfig from "./BasicConfig";

export type BasicElementProps = {
    dashboard: Dashboard,
    uniqueKey: string,
    settings?: boolean,
    fullscreen?: boolean,
    onClose?: () => void
}

export type BasicElementState = {
    fullscreen: boolean,
    configurationModal: boolean
}

class BasicElement<P extends BasicElementProps, S extends BasicElementState> extends React.Component<P, S> {

    constructor(props: P) {
        super(props);

        this.state = {
            fullscreen: false,
            configurationModal: false
        } as S;

        this.onClose = this.onClose.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.setFullscreen = this.setFullscreen.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.toggleConfiguration = this.toggleConfiguration.bind(this);
        this.getConfig = this.getConfig.bind(this);
        this.updateConfig = this.updateConfig.bind(this);
    }

    setFullscreen(value: boolean) {
        this.setState((state) => ({
            ...state,
            fullscreen: value
        }));
    }

    setConfigurationModal(value: boolean) {
        this.setState((state) => ({
            ...state,
            configurationModal: value
        }));
    }

    onClose() {
        const {dashboard, uniqueKey} = this.props;

        this.props.onClose && this.props.onClose();
        dashboard.removeElement(uniqueKey);
    }

    toggleFullscreen() {
        this.setFullscreen(!this.state.fullscreen);
    }

    toggleConfiguration() {
        this.setConfigurationModal(!this.state.configurationModal);
    }

    getConfig(): BasicConfig {return new BasicConfig();}

    updateConfig(config: BasicConfig) {}

    renderContent() {
        return <p>{this.props.uniqueKey}</p>
    }

    render() {
        const {fullscreen, settings} = this.props;
        const {onClose, toggleFullscreen, toggleConfiguration, updateConfig} = this;
        return <Fragment>
            <div className={`dashboard-element ${this.state.fullscreen ? "fullscreen-element" : ""}`}>
                <ElementControls fullscreen={!!fullscreen}
                                 toggleFullscreen={toggleFullscreen}
                                 toggleConfiguration={toggleConfiguration}
                                 settings={!!settings} onClose={onClose} element={this}/>
                <div className={"element-content"}>
                    {this.renderContent()}
                </div>
            </div>
            <ConfigurationModal show={this.state.configurationModal} onApply={updateConfig} toggleModal={toggleConfiguration} config={this.getConfig()}/>
        </Fragment>;
    }
}

export default BasicElement;