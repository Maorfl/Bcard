import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { addOrRemoveToFavorites, getCards } from "../services/cardsService";
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
    let [cardId, setCardId] = useState<string>("");
    let [cardUserId, setCardUserId] = useState<string>("");
    let [openCardModal, setOpenCardModal] = useState<boolean>(false);
    let [renderModal, setRenderModal] = useState<boolean>(false);

    let handleFavorite = (card: Card) => {
        card.favoriteByUsers?.splice(card.favoriteByUsers?.findIndex((userId: string) => userId == user?._id), 1);
        addOrRemoveToFavorites(card, card._id as string)
            .then(() => {
                setIsFavoriteChanged(!isFavoriteChanged);
                successMsg(`${card.title} removed from favorites!`);
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getCards()
            .then((res) => setMyCards(res.data.filter((card: Card) => card.favoriteByUsers?.includes(JSON.parse(sessionStorage.getItem("userInfo") as string)._id))))
            .catch((error) => console.log(error))
    }, [isFavoriteChanged]);
    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="display-4 text-center mb-3 text-decoration-underline">My Favorites</h1>
                {myCards.length ? (
                    <div className="row justify-content-md-center">
                        {myCards.map((card: Card) =>
                            <div className="card col-md-4 mb-3 shadow mx-3" style={{ width: "22rem" }} key={card._id}>
                                <img src={card.image?.url} className="card-img-top" alt={card.image?.alt} style={{ width: "100%", height: "16rem" }} onClick={() => {
                                    setCardId(card._id as string);
                                    setCardUserId(card.userId as string);
                                    setRenderModal(!renderModal);
                                    setOpenCardModal(true);
                                }} />
                                <div className="container">
                                    <div className="card-body border-bottom">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.subtitle}</p>
                                    </div>
                                    <p className="mt-1 mb-4"><b>Phone:</b> {card.phone}<br></br>
                                        <b>Adress:</b> {card.address.country}, {card.address.city}, {card.address.street} {card.address.houseNumber}<br></br>
                                        <b>Card Number:</b> {card.bizNumber}</p>
                                    <div className="text-end mb-1">
                                        <Link to={`tel:${card.phone}`}><i className="fa-solid fa-phone fs-5 me-4"></i></Link>
                                        <i className="fa-solid fa-heart fs-5" key={card._id} style={{ color: "red" }} onClick={() => handleFavorite(card)}></i>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (<h2 className="text-center">No favorites cards available!</h2>)}
            </div>

            <CardModal show={openCardModal} onHide={setOpenCardModal} cardId={cardId} cardUserId={cardUserId} renderModal={renderModal} />
        </>
    );
}

export default Favorites;