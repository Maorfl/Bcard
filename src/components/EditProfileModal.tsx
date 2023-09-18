import { FunctionComponent, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import EditProfileModalForm from "./EditProfileModalForm";
import User from "../interfaces/User";
import { SiteTheme } from "../App";

interface EditProfileModalProps {
    show: boolean
    onHide: Function
    renderProfile: Function
    renderModal: boolean
    currentUser: User
}

const EditProfileModal: FunctionComponent<EditProfileModalProps> = ({ show, onHide, renderProfile, currentUser, renderModal }) => {
    let theme = useContext(SiteTheme);

    useEffect(() => {

    }, [renderModal]);
    return (
        <>
            <Modal className={theme} show={show} onHide={() => onHide()} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header className="modalTheme" closeButton>
                </Modal.Header>
                <Modal.Body className="modalTheme">
                    <EditProfileModalForm onHide={onHide} renderProfile={renderProfile} currentUser={currentUser} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditProfileModal;