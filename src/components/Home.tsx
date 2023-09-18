import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getCards, updateCard } from "../services/cardsService";
import User from "../interfaces/User";
import { successMsg } from "../services/feedbacksService";
import { Link } from "react-router-dom";
import CardModal from "./CardModal";
import AreYouSureModal from "./AreYouSureModal";
import { SiteTheme } from "../App";

interface HomeProps {
    user: User | null
}

const Home: FunctionComponent<HomeProps> = ({ user }) => {
    let [allCards, setAllCards] = useState<Card[]>([]);
    let [isDataChanged, setIsDataChanged] = useState<boolean>(false);
    let [cardId, setCardId] = useState<number>(0);
    let [cardUserId, setCardUserId] = useState<number>(0);
    let [type, setType] = useState<string>("");
    let [openAreYouSureModal, setOpenAreYouSureModal] = useState<boolean>(false);
    let [renderModal, setRenderModal] = useState<boolean>(false);
    let [openCardModal, setOpenCardModal] = useState<boolean>(false);
    let theme = useContext(SiteTheme);

    let render = () => setIsDataChanged(!isDataChanged);

    let handleFavorite = (card: Card) => {
        if (!card.favoriteByUsers?.includes(user?.id as number)) {
            card.favoriteByUsers?.push(user?.id as number)
            updateCard(card, card.id as number)
                .then((res) => {
                    setIsDataChanged(!isDataChanged);
                    successMsg(`${card.title} added to favorites!`);
                })
                .catch((error) => console.log(error))
        } else {
            card.favoriteByUsers?.splice(card.favoriteByUsers?.findIndex((userId: number) => user?.id == userId), 1);
            updateCard(card, card.id as number)
                .then((res) => {
                    setIsDataChanged(!isDataChanged);
                    successMsg(`${card.title} removed from favorites!`);
                })
                .catch((error) => console.log(error))
        }
    }

    useEffect(() => {
        getCards()
            .then((res) => {
                sessionStorage.getItem("userInfo") ?
                    setAllCards(res.data.filter((card: Card) => card.userId != JSON.parse(sessionStorage.getItem("userInfo") as string).id))
                    : setAllCards(res.data)
            })
            .catch((error) => console.log(error));
    }, [isDataChanged]);
    return (
        <div className={`container-fluid px-4 home ${theme}`} >
            <>
                <div className="text-center border-bottom mb-3">
                    <h1 className="display-3">Business Cards Page</h1>
                    <h2>Here you can find business cards from all categories</h2>
                </div>
                <div className="row justify-content-md-center">
                    {allCards.length ? (
                        allCards.map((card: Card) =>
                            // <div className="col-md-3 mb-3" key={card.id}>
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
                                    <div className="mb-1">
                                        {user != null &&
                                            user.userType == "regular" || user?.userType == "business" ? (
                                            <div className="text-end">
                                                <Link to={`tel:${card.phone}`}><i className="fa-solid fa-phone fs-5 me-4"></i></Link>
                                                <i className="fa-solid fa-heart fs-5" key={card.id} style={{ color: card.favoriteByUsers?.includes(user?.id as number) ? "red" : "grey" }} onClick={() => handleFavorite(card)}></i>
                                            </div>
                                        ) : (
                                            user?.userType == "admin" ? (
                                                <div className="position-relative">
                                                    <div>
                                                        <i className="fa-solid fa-trash fs-5" onClick={() => {
                                                            setCardId(card.id as number);
                                                            setType("deleteCard");
                                                            setRenderModal(!renderModal);
                                                            setOpenAreYouSureModal(true);
                                                        }}></i>
                                                    </div>
                                                    <div className="position-absolute top-0 end-0">
                                                        <Link to={`tel:${card.phone}`}><i className="fa-solid fa-phone fs-5 me-4"></i></Link>
                                                        <i className="fa-solid fa-heart fs-5" key={card.id} style={{ color: card.favoriteByUsers?.includes(user?.id as number) ? "red" : theme == "dark" ? "#e4e4e4" : "grey" }} onClick={() => handleFavorite(card)}></i>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-end">
                                                    <Link to={`tel:${card.phone}`}><i className="fa-solid fa-phone fs-5"></i></Link>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            /* </div> */
                        )) : (<h2>No cards available!</h2>)}
                </div>

                <CardModal show={openCardModal} onHide={setOpenCardModal} cardId={cardId} cardUserId={cardUserId} renderModal={renderModal} />
                <AreYouSureModal show={openAreYouSureModal} onHide={() => setOpenAreYouSureModal(false)} render={render} cardId={cardId} renderModal={renderModal} type={type} />
            </>
        </div>
    );
}

export default Home;