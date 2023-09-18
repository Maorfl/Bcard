import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Card from "../interfaces/Card";
import { deleteCard, getCardById } from "../services/cardsService";
import { successMsg } from "../services/feedbacksService";
import { Type } from "../enums/areYouSureType";
import User from "../interfaces/User";
import { changeUserType, deleteUser, getAllUsers, suspendUser, unSuspendUser } from "../services/usersService";
import { SiteTheme } from "../App";
import { useFormik } from "formik";
import * as yup from "yup";

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

    let formik = useFormik({
        initialValues: { suspendTime: 0 },
        validationSchema: yup.object({
            suspendTime: yup.number().min(1)
        }),
        onSubmit: (values) => {
            suspendUser(userId as string, values.suspendTime)
                .then((res) => {
                    onHide();
                    successMsg(`User ${affectedUser?.name.first} ${affectedUser?.name.last} has been suspended for ${values.suspendTime} hours`);
                    render();
                })
                .catch((error) => console.log(error))
        }
    })

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
                {type == Type.SuspendUser &&
                    <>
                        <form onSubmit={formik.handleSubmit}>
                            <Modal.Body className="modalTheme">
                                <p>{affectedUser?.name.first} {affectedUser?.name.last} will be suspended</p>
                                <div className="form-floating mb-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="floatingSuspendTime"
                                        placeholder="Suspend time"
                                        name="suspendTime"
                                        value={formik.values.suspendTime}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.suspendTime && formik.touched.suspendTime && <p><small className="text-danger">{formik.errors.suspendTime}</small></p>}
                                    <label htmlFor="floatingSuspendTime">Suspend time (in hours)</label>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="modalTheme">
                                <Button type="button" variant="secondary" onClick={() => onHide()}>Cancel</Button>
                                <Button type="submit" variant="danger" disabled={!formik.isValid || !formik.dirty}>Suspend user</Button>
                            </Modal.Footer>
                        </form>
                    </>}
                {type == Type.UnlockUser && <Modal.Body className="modalTheme">{affectedUser?.name.first} {affectedUser?.name.last} will be unsuspended</Modal.Body>}
                {type != Type.SuspendUser && (
                    <Modal.Footer className="modalTheme">
                        <Button type="button" variant="secondary" onClick={() => onHide()}>
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
                        {type == Type.UnlockUser && <Button variant="danger" onClick={() => {
                            unSuspendUser(userId as string)
                                .then((res) => {
                                    onHide();
                                    successMsg(`User ${affectedUser?.name.first} ${affectedUser?.name.last} has been unsuspended!`);
                                    render();
                                })
                                .catch((error) => console.log(error))
                        }}>Yes
                        </Button>}
                    </Modal.Footer>)}
            </Modal>
        </>
    );
}

export default AreYouSureModal;