import "./styles.css";

import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Form,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";
import elements from "../elements/Elements";
import {ElementInfo} from "../elements";
import {BasicConfig} from "../basic-element";
import Dashboard from "../Dashboard";
import {BasicElementProps} from "../basic-element/BasicElement";
import {v4 as uuidv4} from 'uuid';

type EmptyElementProps = {
    dashboard: Dashboard,
}

type EmptyElementState = {
    newElementModal: boolean;
    configurationModal: boolean;
    config?: BasicConfig;
    elementInfo?: ElementInfo;
}

class EmptyElement extends React.Component<EmptyElementProps, EmptyElementState> {

    constructor(props: EmptyElementProps) {
        super(props);
        this.state = {
            newElementModal: false,
            configurationModal: false
        }
    }

    setNewElementModal = (value: boolean) => {
        this.setState((state) => ({
            ...state,
            newElementModal: value
        }));
    }

    setConfigurationModal = (value: boolean) => {
        this.setState((state) => ({
            ...state,
            configurationModal: value
        }));
    }

    setConfig = (config: BasicConfig) => {
        this.setState((state) => ({
            ...state,
            config: config
        }));
    }

    setElementInfo = (elementInfo: ElementInfo) => {
        this.setState((state) => ({
            ...state,
            elementInfo: elementInfo
        }));
    }

    showNewElementModal = () => {
        this.setNewElementModal(true);
    }

    showConfigurationModal = () => {
        this.setConfigurationModal(true);
    }

    hideNewElementModal = () => {
        this.setNewElementModal(false);
    }

    hideConfigurationModal = () => {
        this.setConfigurationModal(false);
    }

    onSelect = (elementInfo: ElementInfo) => {
        const config = new elementInfo.config();
        this.setConfig(config);
        this.setElementInfo(elementInfo);

        this.hideNewElementModal();
        this.showConfigurationModal();
    }

    onAdd = () => {
        const {dashboard} = this.props;

        const config = this.state.config;
        if (config?.type) {
            let props = {
                ...config.toProps(),
                dashboard: dashboard,
                uniqueKey: uuidv4()
            } as BasicElementProps;
            dashboard.addElement(React.createElement(config?.type, props))
            this.hideConfigurationModal();
        }
    }

    render() {
        const {newElementModal, configurationModal} = this.state;
        const {onSelect, onAdd, showNewElementModal, hideNewElementModal, hideConfigurationModal, setConfig} = this;

        return <>
            <div className={"empty-element"} onClick={showNewElementModal}>
                <i className={"bi bi-plus-lg"}></i>
            </div>
            <Modal show={newElementModal} onHide={hideNewElementModal} backdrop centered keyboard>
                <ModalHeader closeButton>
                    <ModalTitle>Select element to add on dashboard</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {
                        elements.map((el, index) =>
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{el.title}</CardTitle>
                                </CardHeader>
                                <CardBody>{el.description}</CardBody>
                                <CardFooter>
                                    <Button onClick={() => onSelect(el)}>Configure</Button>
                                </CardFooter>
                            </Card>)
                    }
                </ModalBody>
            </Modal>
            <Modal show={configurationModal} onHide={hideConfigurationModal} backdrop centered keyboard>
                <ModalHeader closeButton>
                    <ModalTitle>{this.state.elementInfo?.title} configuration</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        {
                            this.state.config && this.state.config.renderConfig(setConfig)
                        }
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onAdd}>Add</Button>
                    <Button onClick={hideConfigurationModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>;
    }
}

export default EmptyElement;