import React, {Fragment} from "react";
import {BasicConfig} from "../basic-element";
import {Button, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";

export type ConfigurationModalProps = {
    config: BasicConfig;
    show: boolean;
    toggleModal: () => void;
    onApply: (config: BasicConfig) => void;
}

type ConfigurationModalState = {
    config: BasicConfig;
    show: boolean;
}

class ConfigurationModal extends React.Component<ConfigurationModalProps, ConfigurationModalState> {

    constructor(props: ConfigurationModalProps) {
        super(props);

        this.state = {
            config: props.config,
            show: props.show
        };
    }

    componentDidUpdate(prevProps: Readonly<ConfigurationModalProps>, prevState: Readonly<ConfigurationModalState>, snapshot?: any) {
        if (prevProps.show !== this.props.show) {
            this.setShow(this.props.show);
        }
    }

    setShow = (value: boolean) => {
        this.setState((state) => ({
            ...state,
            show: value
        }));
    }

    setConfig = (config: BasicConfig) => {
        this.setState((state) => ({
            ...state,
            config: config
        }));
    }

    hideConfigurationModal = () => {
        this.setShow(false);
        this.props.toggleModal();
    }

    applyChanges = () => {
        this.props.onApply(this.state.config);
        this.hideConfigurationModal();
    }

    render() {
        return <Fragment>
            <Modal show={this.state.show} onHide={this.hideConfigurationModal} backdrop centered keyboard>
                <ModalHeader closeButton>
                    <ModalTitle>Element settings</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        {
                            this.state.config && this.state.config.renderConfig(this.setConfig, true)
                        }
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.applyChanges}>Apply</Button>
                    <Button onClick={this.hideConfigurationModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Fragment>;
    }
}

export default ConfigurationModal;