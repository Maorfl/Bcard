import { FunctionComponent, useContext } from "react";
import { Modal } from "react-bootstrap";
import BizNumberEditModalForm from "./BizNumberEditModalForm";
import { SiteTheme } from "../App";

interface BizNumberEditModalProps {
    show: boolean,
    onHide: Function,
    bizNumber: number,
    cardId: string,
    render: Function
}

const BizNumberEditModal: FunctionComponent<BizNumberEditModalProps> = ({ show, onHide, bizNumber, cardId, render }) => {
    let theme = useContext(SiteTheme);

    return (
        <>
            <Modal className={theme} show={show} onHide={() => onHide()}>
                <Modal.Header className="modalTheme" closeButton>
                    <Modal.Title>Biz-Number Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalTheme">
                    <BizNumberEditModalForm onHide={onHide} bizNumber={bizNumber} cardId={cardId} render={render} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default BizNumberEditModal;