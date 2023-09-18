import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getCards } from "../services/cardsService";
import { useNavigate } from "react-router-dom";
import EditCardModal from "./EditCardModal";
import CardModal from "./CardModal";
import AreYouSureModal from "./AreYouSureModal";


interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {
    let navigate = useNavigate();
    let [myCards, setMyCards] = useState<Card[]>([]);
    let [isDataChanged, setIsDataChanged] = useState<boolean>(false);
    let [cardId, setCardId] = useState<number>(0);
    let [cardUserId, setCardUserId] = useState<number>(0);
    let [type, setType] = useState<string>("");
    let [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    let [openEditModal, setOpenEditModal] = useState<boolean>(false);
    let [openCardModal, setOpenCardModal] = useState<boolean>(false);
    let [renderModal, setRenderModal] = useState<boolean>(false);

    let render = () => setIsDataChanged(!isDataChanged);

    useEffect(() => {
        getCards()
            .then((res) => {
                setMyCards(res.data.filter((card: Card) => JSON.parse(sessionStorage.getItem("userInfo") as string).id == card.userId));
            })
    }, [isDataChanged]);
    return (
        <>
            <div className="container-fluid">
                <h1 className="display-4 text-center text-decoration-underline">My Cards</h1>
                <div className="text-center mt-3 mb-3">
                    <button className="btn btn-lg btn-success" onClick={() => navigate("create-card")}>Create New Card</button>
                </div>
                {myCards.length ? (
                    <div className="row justify-content-md-center">
                        {myCards.map((card: Card) =>
                            // <div className="col-md-4 mb-3" key={card.id}>
                            <div className="card col-md-4 mb-4 shadow mx-3" style={{ width: "22rem" }} key={card.id}>
                                <img src={card.imageUrl} className="card-img-top" alt={card.imageAlt} style={{ width: "100%", height: "16rem" }} onClick={() => {
                                    setCardId(card.id as number);
                                    setCardUserId(card.userId as number);
                                    setRenderModal(!renderModal);
                                    setOpenCardModal(true);
                                }} />
                                <div className="container">
                                    <div className="card-body border-bottom">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.subtitle}</p>
                                    </div>
                                    <p className="mt-1 mb-4"><b>Phone:</b> {card.phone}<br></br>
                                        <b>Adress:</b> {card.country}, {card.city}, {card.street} {card.houseNumber}<br></br>
                                        <b>Card Number:</b> {card.id}</p>
                                    <div className="position-relative mb-1">
                                        <div>
                                            <i className="fa-solid fa-trash fs-5" onClick={() => {
                                                setCardId(card.id as number);
                                                setType("deleteCard");
                                                setRenderModal(!renderModal);
                                                setOpenDeleteModal(true);
                                            }}></i>
                                        </div>
                                        <div className="position-absolute end-0 top-0">
                                            <i className="fa-solid fa-pen fs-5" onClick={() => {
                                                setCardId(card.id as number);
                                                setType("deleteCard");
                                                setRenderModal(!renderModal);
                                                setOpenEditModal(true);
                                            }}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            /* </div> */
                        )}
                    </div>
                ) : (<h2 className="text-center">No cards available!</h2>)}
            </div >

            <CardModal show={openCardModal} onHide={setOpenCardModal} cardId={cardId} cardUserId={cardUserId} renderModal={renderModal} />
            <AreYouSureModal show={openDeleteModal} onHide={() => setOpenDeleteModal(false)} render={render} cardId={cardId} renderModal={renderModal} type={type} />
            <EditCardModal show={openEditModal} onHide={() => setOpenEditModal(false)} render={render} cardId={cardId} />
        </>
    );
}

export default MyCards;