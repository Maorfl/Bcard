import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getCards, updateCard } from "../services/cardsService";
import User from "../interfaces/User";
import { successMsg } from "../services/feedbacksService";
import { Link } from "react-router-dom";
import CardModal from "./CardModal";

interface FavoritesProps {
    user: User | null
}

const Favorites: FunctionComponent<FavoritesProps> = ({ user }) => {
    let [myCards, setMyCards] = useState<Card[]>([]);
    let [isFavoriteChanged, setIsFavoriteChanged] = useState<boolean>(false);
    let [cardId, setCardId] = useState<number>(0);
    let [cardUserId, setCardUserId] = useState<number>(0);
    let [openCardModal, setOpenCardModal] = useState<boolean>(false);
    let [renderModal, setRenderModal] = useState<boolean>(false);

    let handleFavorite = (card: Card) => {
        card.favoriteByUsers?.splice(card.favoriteByUsers?.findIndex((userId: number) => userId == user?.id), 1);
        updateCard(card, card.id as number)
            .then(() => {
                setIsFavoriteChanged(!isFavoriteChanged);
                successMsg(`${card.title} removed from favorites!`);
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getCards()
            .then((res) => setMyCards(res.data.filter((card: Card) => card.favoriteByUsers?.includes(JSON.parse(sessionStorage.getItem("userInfo") as string).id))))
            .catch((error) => console.log(error))
    }, [isFavoriteChanged]);
    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="display-4 text-center mb-3 text-decoration-underline">My Favorites</h1>
                {myCards.length ? (
                    <div className="row justify-content-md-center">
                        {myCards.map((card: Card) =>
                            // <div className="col-md-3 mb-3" key={card.id}>
                            <div className="card col-md-4 mb-3 shadow mx-3" style={{ width: "22rem" }} key={card.id}>
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
                                    <div className="text-end mb-1">
                                        <Link to={`tel:${card.phone}`}><i className="fa-solid fa-phone fs-5 me-4"></i></Link>
                                        <i className="fa-solid fa-heart fs-5" key={card.id} style={{ color: "red" }} onClick={() => handleFavorite(card)}></i>
                                    </div>
                                </div>
                            </div>
                            /* </div> */
                        )}
                    </div>
                ) : (<h2 className="text-center">No favorites cards available!</h2>)}
            </div>

            <CardModal show={openCardModal} onHide={setOpenCardModal} cardId={cardId} cardUserId={cardUserId} renderModal={renderModal} />
        </>
    );
}

export default Favorites;