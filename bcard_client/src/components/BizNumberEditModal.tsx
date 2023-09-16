import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import BizNumberEditModalForm from "./BizNumberEditModalForm";

interface BizNumberEditModalProps {
    show: boolean,
    onHide: Function,
    bizNumber: number,
    cardId: string,
    render: Function
}

const BizNumberEditModal: FunctionComponent<BizNumberEditModalProps> = ({ show, onHide, bizNumber, cardId, render }) => {
    return (
        <>
            <Modal show={show} onHide={() => onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Biz-Number Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body><BizNumberEditModalForm onHide={onHide} bizNumber={bizNumber} cardId={cardId} render={render} /></Modal.Body>
            </Modal>
        </>
    );
}

export default BizNumberEditModal;