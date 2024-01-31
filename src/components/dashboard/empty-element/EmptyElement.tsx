import React from "react";
import "./styles.css";
import {Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";

type EmptyElementProps = {}

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

    setShowModal(value: boolean) {
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

    render() {
        const {showModal} = this.state;

        return <>
            <div className={"empty-element"} onClick={this.showModal}>
                <i className={"bi bi-plus-lg"}></i>
            </div>
            <Modal show={showModal} onHide={this.hideModal} backdrop centered keyboard>
                <ModalHeader closeButton>
                    <ModalTitle>Title</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    Content
                </ModalBody>
                <ModalFooter>
                    Actions
                </ModalFooter>
            </Modal>
        </>;
    }
}

export default EmptyElement;