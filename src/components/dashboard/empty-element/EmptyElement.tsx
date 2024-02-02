import React from "react";
import "./styles.css";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Form,
    FormCheck,
    FormControl,
    InputGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";
import {ElementDescription, elements} from "../dashboard-elements";
import InputGroupText from "react-bootstrap/InputGroupText";

type EmptyElementProps = {
    onSelect?: (elementDescription: ElementDescription) => void;
    onAdd: (elementDescription: ElementDescription, config: object) => void;
}

type EmptyElementState = {
    newElementModal: boolean;
    configurationModal: boolean;
    selected: {
        config: any | undefined,
        description: ElementDescription | undefined
    };
}

class EmptyElement extends React.Component<EmptyElementProps, EmptyElementState> {

    constructor(props: EmptyElementProps) {
        super(props);
        this.state = {
            newElementModal: false,
            configurationModal: false,
            selected: {
                config: undefined,
                description: undefined
            }
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

    setSelectedConfig = (config: any) => {
        this.setState((state) => ({
            ...state,
            selected: {
                ...state.selected,
                config: config
            }
        }));
    }

    setSelectedDescription = (elementDescription: ElementDescription) => {
        this.setState((state) => ({
            ...state,
            selected: {
                ...state.selected,
                description: elementDescription
            }
        }));
    }

    showNewElementModal = () => {
        this.setNewElementModal(true);
    }

    showConfigurationModal = (elementDescription: ElementDescription) => {
        const elementConfig = (elementDescription.elementType as any).getConfig();

        this.setSelectedConfig(elementConfig);
        this.setSelectedDescription(elementDescription);
        this.setConfigurationModal(true);
    }

    hideNewElementModal = () => {
        this.setNewElementModal(false);
    }

    hideConfigurationModal = () => {
        this.setConfigurationModal(false);
    }

    onSelect = (elementDescription: ElementDescription) => {
        this.props.onSelect && this.props.onSelect(elementDescription);

        this.hideNewElementModal();
        this.showConfigurationModal(elementDescription);
    }

    onAdd = () => {
        const {onAdd} = this.props;
        const {selected} = this.state;

        selected.description && selected.config && onAdd(selected.description, selected.config);
        this.hideConfigurationModal();
    }

    render() {
        const {newElementModal, configurationModal, selected} = this.state;
        const {onSelect, onAdd, showNewElementModal, hideNewElementModal, hideConfigurationModal} = this;

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
                    <ModalTitle>"{selected?.description?.title}" configuration</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormCheck type={"switch"} label={"Is configurable"} value={selected?.config?.settings}
                                   onClick={() => selected.config.settings = !selected.config.settings}/>
                        <FormCheck type={"switch"} label={"Is fullscreen"} value={selected?.config?.fullscreen}
                                   onClick={() => selected.config.fullscreen = !selected.config.fullscreen}/>
                        <InputGroup>
                            <InputGroupText>Value</InputGroupText>
                            <FormControl aria-label={"Value"}
                                         onChange={(event) => selected.config.value = event.currentTarget.value}/>
                        </InputGroup>
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