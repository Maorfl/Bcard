import { FunctionComponent, useContext } from "react";
import { Modal } from "react-bootstrap";
import EditCardModalForm from "./EditCardModalForm";
import { SiteTheme } from "../App";

interface EditCardModalProps {
    show: boolean
    onHide: Function
    render: Function
    cardId: number
}

const EditCardModal: FunctionComponent<EditCardModalProps> = ({ show, onHide, render, cardId }) => {
    let theme = useContext(SiteTheme);

    return (
        <>
            <Modal className={theme} show={show} onHide={() => onHide()} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header className="modalTheme" closeButton>
                </Modal.Header>
                <Modal.Body className="modalTheme">
                    <EditCardModalForm cardId={cardId} render={render} onHide={onHide} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditCardModal;