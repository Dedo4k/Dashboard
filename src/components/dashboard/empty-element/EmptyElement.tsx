import React from "react";
import "./styles.css";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";
import {ElementDescription, elements} from "../dashboard-elements";

type EmptyElementProps = {
    onSelect: (elementDescription: ElementDescription) => void;
}

type EmptyElementState = {
    showModal: boolean;
}

class EmptyElement extends React.Component<EmptyElementProps, EmptyElementState> {

    constructor(props: EmptyElementProps) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    setShowModal = (value: boolean) => {
        this.setState((state) => ({
            ...state,
            showModal: value
        }));
    }

    showModal = () => {
        this.setShowModal(true);
    }

    hideModal = () => {
        this.setShowModal(false);
    }

    onSelect = (element: ElementDescription) => {
        const {onSelect} = this.props;

        onSelect(element);
        this.hideModal();
    }

    render() {
        const {showModal} = this.state;
        const {onSelect} = this;

        return <>
            <div className={"empty-element"} onClick={this.showModal}>
                <i className={"bi bi-plus-lg"}></i>
            </div>
            <Modal show={showModal} onHide={this.hideModal} backdrop centered keyboard>
                <ModalHeader closeButton>
                    <ModalTitle>Select element to add on dashboard</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {
                        elements.map((el, index) =>
                            <Card key={index}>
                                <CardTitle>{el.title}</CardTitle>
                                <CardBody>{el.description}</CardBody>
                                <CardFooter>
                                    <Button onClick={() => onSelect(el)}>Add</Button>
                                </CardFooter>
                            </Card>)
                    }
                </ModalBody>
            </Modal>
        </>;
    }
}

export default EmptyElement;