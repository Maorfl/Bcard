import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Card from "../interfaces/Card";
import { deleteCard, getCardById } from "../services/cardsService";
import { successMsg } from "../services/feedbacksService";
import { Type } from "../enums/areYouSureType";
import User from "../interfaces/User";
import { changeUserType, deleteUser, getAllUsers } from "../services/usersService";
import { SiteTheme } from "../App";

interface AreYouSureModalProps {
    show: boolean
    onHide: Function
    render: Function
    cardId?: string
    userId?: string
    renderModal: boolean
    type: string
}

const AreYouSureModal: FunctionComponent<AreYouSureModalProps> = ({ show, onHide, render, cardId, userId, renderModal, type }) => {
    let [deletedCard, setDeletedCard] = useState<Card>();
    let [affectedUser, setAffectedUser] = useState<User>();
    let newUserType: string = "";
    let theme = useContext(SiteTheme);

    useEffect(() => {
        type == Type.DeleteCard ? (
            getCardById(cardId as string)
                .then((res) => setDeletedCard(res.data))
                .catch((error) => console.log(error))
        ) : (
            getAllUsers()
                .then((res) => setAffectedUser(res.data.find((user: User) => user._id == userId)))
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
                {type == Type.DeleteUser && <Modal.Body className="modalTheme">{affectedUser?.name.first} {affectedUser?.name.last} will be deleted</Modal.Body>}
                {type == Type.ChangeToAdmin && <Modal.Body className="modalTheme">{affectedUser?.name.first} {affectedUser?.name.last} will be set as Admin</Modal.Body>}
                {type == Type.ChangeUserType && <Modal.Body className="modalTheme">{affectedUser?.name.first} {affectedUser?.name.last} with type {affectedUser?.userType?.toUpperCase()} will change to type {affectedUser?.userType == "regular" ? "BUSINESS" : "REGULAR"}</Modal.Body>}
                <Modal.Footer className="modalTheme">
                    <Button variant="secondary" onClick={() => onHide()}>
                        Close
                    </Button>
                    {type == Type.DeleteCard && <Button variant="danger" onClick={() => {
                        deleteCard(cardId as string)
                            .then((res) => {
                                onHide();
                                successMsg(`Card (ID: ${cardId}) has been deleted!`);
                                render();
                            })
                            .catch((error) => console.log(error))
                    }}>Yes
                    </Button>}
                    {type == Type.DeleteUser && <Button variant="danger" onClick={() => {
                        deleteUser(userId as string)
                            .then((res) => {
                                onHide();
                                successMsg(`User ${affectedUser?.name.first} ${affectedUser?.name.last} has been deleted!`);
                                render();
                            })
                            .catch((error) => console.log(error))
                    }}>Yes
                    </Button>}
                    {type == Type.ChangeUserType && <Button variant="danger" onClick={() => {
                        newUserType = affectedUser?.userType == "regular" ? "business" : "regular";
                        changeUserType(userId as string, newUserType)
                            .then((res) => {
                                onHide();
                                successMsg(`${affectedUser?.name.first} ${affectedUser?.name.last} type has been updated to ${affectedUser?.userType}`);
                                render();
                            })
                            .catch((error) => console.log(error))
                    }}>Yes
                    </Button>}
                    {type == Type.ChangeToAdmin && <Button variant="danger" onClick={() => {
                        newUserType = "admin";
                        changeUserType(userId as string, newUserType)
                            .then((res) => {
                                onHide();
                                successMsg(`User ${affectedUser?.name.first} ${affectedUser?.name.last} has set as ADMIN!`);
                                render();
                            })
                            .catch((error) => console.log(error))
                    }}>Yes
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AreYouSureModal;