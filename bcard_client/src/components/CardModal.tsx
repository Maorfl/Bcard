import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Card from "../interfaces/Card";
import { getCardById } from "../services/cardsService";
import User from "../interfaces/User";
import { getAllUsers } from "../services/usersService";
import { SiteTheme } from "../App";

interface CardModalProps {
    show: boolean
    onHide: Function
    cardId: string
    cardUserId: string
    renderModal: boolean
}

const CardModal: FunctionComponent<CardModalProps> = ({ show, onHide, cardId, cardUserId, renderModal }) => {
    let [openOwnerModal, setOpenOwnerModal] = useState<boolean>(false);
    let [card, setCard] = useState<Card>();
    let [owner, setOwner] = useState<User>();
    let theme = useContext(SiteTheme);

    useEffect(() => {
        Promise.all([getCardById(cardId), getAllUsers()])
            .then(([cardResult, usersArrayResult]) => {
                setCard(cardResult.data);
                setOwner((usersArrayResult.data.find((user: User) => user._id == cardUserId)));
            })
            .catch((error) => console.log(error))
    }, [renderModal]);
    return (
        <>
            <Modal className={theme} show={show} onHide={() => onHide(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header className="modalTheme" closeButton>
                    <Modal.Title>{card?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalTheme">
                    <img className="modalImage" src={card?.image?.url} alt={card?.image?.alt} style={{ width: "100%", height: "30vh" }} />
                    <p className="mt-2 mb-3 fs-5"><b>Subtitle:</b> {card?.subtitle}</p>
                    <p><b>Description:</b> {card?.description}</p>
                    <p><b>Phone:</b> {card?.phone}</p>
                    <p><b>Email:</b> {card?.email}</p>
                    {card?.web && <p><b>Web:</b> {card?.web}</p>}
                    {card?.address?.state && <p><b>State:</b> {card?.address?.state}</p>}
                    <p><b>Adress:</b> {card?.address?.country}, {card?.address?.city}, {card?.address?.street} {card?.address?.houseNumber}</p>
                    {card?.address?.zip && <p><b>Zip:</b> {card?.address?.zip}</p>}
                </Modal.Body>
                <Modal.Footer className="modalTheme">
                    <Button variant="primary" onClick={() => {
                        onHide(false);
                        setOpenOwnerModal(true);
                    }}>
                        Show Owner
                    </Button>
                    <Button variant="secondary" onClick={() => onHide(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className={theme} show={openOwnerModal} onHide={() => setOpenOwnerModal(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header className="modalTheme" closeButton>
                    <Modal.Title>{owner?.name.first} {owner?.name.last}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalTheme">
                    <div className="row">
                        <div className="col-md-8">
                            <p className="mt-3"><b>Email:</b> {owner?.email}</p>
                            <p className="mt-3"><b>Phone:</b> {owner?.phone}</p>
                            <p className="mt-3"><b>Adress:</b> {owner?.address.country}, {owner?.address.city}, {owner?.address.street} {owner?.address.houseNumber}</p>
                        </div>
                        <div className="col-md-4">
                            <img src={owner?.image?.url ? owner.image?.url : owner?.gender == "Male" ? "male-profile.jpg" : "female-profile.jpg"} alt={owner?.image?.alt} style={{ width: "100%" }} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modalTheme">
                    <Button variant="primary" onClick={() => {
                        setOpenOwnerModal(false);
                        onHide(true);
                    }}>
                        Back to card
                    </Button>
                    <Button variant="secondary" onClick={() => setOpenOwnerModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CardModal;