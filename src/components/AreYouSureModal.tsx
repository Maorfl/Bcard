import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Card from "../interfaces/Card";
import { deleteCard, getCardById } from "../services/cardsService";
import { successMsg } from "../services/feedbacksService";
import { Type } from "../enums/areYouSureType";
import User from "../interfaces/User";
import { deleteUser, getAllUsers, updateUser } from "../services/usersService";
import { SiteTheme } from "../App";

interface AreYouSureModalProps {
    show: boolean
    onHide: Function
    render: Function
    cardId?: number
    userId?: number
    renderModal: boolean
    type: string
}

const AreYouSureModal: FunctionComponent<AreYouSureModalProps> = ({ show, onHide, render, cardId, userId, renderModal, type }) => {
    let [deletedCard, setDeletedCard] = useState<Card>();
    let [affectedUser, setAffectedUser] = useState<User>();
    let theme = useContext(SiteTheme);

    useEffect(() => {
        type == Type.DeleteCard ? (
            getCardById(cardId as number)
                .then((res) => setDeletedCard(res.data[0]))
                .catch((error) => console.log(error))
        ) : (
            getAllUsers()
                .then((res) => setAffectedUser(res.data.find((user: User) => user.id == userId)))
                .catch((error) => console.log(error))
        )
    }, [renderModal]);
    return (
        <>
            <Modal className={theme} show={show} onHide={() => onHide()} size="sm" aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header className="modalTheme" closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                {type == Type.DeleteCard && <Modal.Body className="modalTheme">{deletedCard?.title} will be deleted</Modal.Body>}
                {type == Type.DeleteUser && <Modal.Body className="modalTheme">{affectedUser?.firstName} {affectedUser?.lastName} will be deleted</Modal.Body>}
                {type == Type.ChangeToAdmin && <Modal.Body className="modalTheme">{affectedUser?.firstName} {affectedUser?.lastName} will be set as Admin</Modal.Body>}
                {type == Type.ChangeUserType && <Modal.Body className="modalTheme">{affectedUser?.firstName} {affectedUser?.lastName} with type {affectedUser?.userType?.toUpperCase()} will change to type {affectedUser?.userType == "regular" ? "BUSINESS" : "REGULAR"}</Modal.Body>}
                <Modal.Footer className="modalTheme">
                    <Button variant="secondary" onClick={() => onHide()}>
                        Close
                    </Button>
                    {type == Type.DeleteCard && <Button variant="danger" onClick={() => {
                        deleteCard(cardId as number)
                            .then((res) => {
                                onHide();
                                successMsg(`Card (ID: ${cardId}) has been deleted!`);
                                render();
                            })
                            .catch((error) => console.log(error))
                    }}>Yes
                    </Button>}
                    {type == Type.DeleteUser && <Button variant="danger" onClick={() => {
                        deleteUser(userId as number)
                            .then((res) => {
                                onHide();
                                successMsg(`User ${affectedUser?.firstName} ${affectedUser?.lastName} has been deleted!`);
                                render();
                            })
                    }}>Yes
                    </Button>}
                    {type == Type.ChangeUserType && <Button variant="danger" onClick={() => {
                        (affectedUser as User).userType = affectedUser?.userType == "regular" ? "bussiness" : "regular";
                        updateUser(affectedUser as User, userId as number)
                            .then((res) => {
                                onHide();
                                successMsg(`${affectedUser?.firstName} ${affectedUser?.lastName} type has been updated to ${affectedUser?.userType}`);
                                render();
                            })
                    }}>Yes
                    </Button>}
                    {type == Type.ChangeToAdmin && <Button variant="danger" onClick={() => {
                        (affectedUser as User).userType = "admin";
                        updateUser(affectedUser as User, userId as number)
                            .then((res) => {
                                onHide();
                                successMsg(`User ${affectedUser?.firstName} ${affectedUser?.lastName} has set as ADMIN!`);
                                render();
                            })
                    }}>Yes
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AreYouSureModal;