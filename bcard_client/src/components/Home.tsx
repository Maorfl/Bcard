import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { addOrRemoveToFavorites, getCards } from "../services/cardsService";
import User from "../interfaces/User";
import { successMsg } from "../services/feedbacksService";
import { Link } from "react-router-dom";
import CardModal from "./CardModal";
import AreYouSureModal from "./AreYouSureModal";
import { SiteTheme } from "../App";
import BizNumberEditModal from "./BizNumberEditModal";

interface HomeProps {
    user: User | null
}

const Home: FunctionComponent<HomeProps> = ({ user }) => {
    let [allCards, setAllCards] = useState<Card[]>([]);
    let [isDataChanged, setIsDataChanged] = useState<boolean>(false);
    let [cardId, setCardId] = useState<string>("");
    let [cardUserId, setCardUserId] = useState<string>("");
    let [type, setType] = useState<string>("");
    let [openAreYouSureModal, setOpenAreYouSureModal] = useState<boolean>(false);
    let [openBizNumberEdit, setopenBizNumberEdit] = useState<boolean>(false);
    let [renderModal, setRenderModal] = useState<boolean>(false);
    let [openCardModal, setOpenCardModal] = useState<boolean>(false);
    let [cardBizNumber, setCardBizNumber] = useState<number>(0);
    let theme = useContext(SiteTheme);

    let render = () => setIsDataChanged(!isDataChanged);

    let handleFavorite = (card: Card) => {
        if (!card.favoriteByUsers?.includes(user?._id as string)) {
            addOrRemoveToFavorites(card, card._id as string)
                .then((res) => {
                    setIsDataChanged(!isDataChanged);
                    successMsg(`${card.title} added to favorites!`);
                })
                .catch((error) => console.log(error))
        }
        else {
            addOrRemoveToFavorites(card, card._id as string)
                .then((res) => {
                    setIsDataChanged(!isDataChanged);
                    successMsg(`${card.title} removed from favorites!`);
                })
                .catch((error) => console.log(error))
        }
    }

    let handleChangeBizNumber = (bizNumber: number, cardId: string) => {
        setCardBizNumber(bizNumber);
        setCardId(cardId);
        setopenBizNumberEdit(true);
    }

    useEffect(() => {
        getCards()
            .then((res) => {
                sessionStorage.getItem("userInfo") ?
                    setAllCards(res.data.filter((card: Card) => card.userId != JSON.parse(sessionStorage.getItem("userInfo") as string)._id))
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
                            <div className="card col-md-4 mb-4 shadow mx-3" style={{ width: "22rem" }} key={card._id}>
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
                                        {user?.userType == "admin" ? (
                                            <span className="bizNumber" onClick={() => handleChangeBizNumber(card?.bizNumber as number, card._id as string)}><b>Card Number:</b> {card?.bizNumber} <i className="fa-solid fa-pen-to-square"></i></span>
                                        ) : (
                                            <span><b>Card Number:</b> {card.bizNumber}</span>)}
                                    </p>
                                    <div className="mb-1">
                                        {user != null &&
                                            user.userType == "regular" || user?.userType == "business" ? (
                                            <div className="text-end">
                                                <Link to={`tel:${card.phone}`}><i className="fa-solid fa-phone fs-5 me-4"></i></Link>
                                                <i className="fa-solid fa-heart fs-5" key={card._id} style={{ color: card.favoriteByUsers?.includes(user?._id as string) ? "red" : "grey" }} onClick={() => handleFavorite(card)}></i>
                                            </div>
                                        ) : (
                                            user?.userType == "admin" ? (
                                                <div className="position-relative">
                                                    <div>
                                                        <i className="fa-solid fa-trash fs-5" onClick={() => {
                                                            setCardId(card._id as string);
                                                            setType("deleteCard");
                                                            setRenderModal(!renderModal);
                                                            setOpenAreYouSureModal(true);
                                                        }}></i>
                                                    </div>
                                                    <div className="position-absolute top-0 end-0">
                                                        <Link to={`tel:${card.phone}`}><i className="fa-solid fa-phone fs-5 me-4"></i></Link>
                                                        <i className="fa-solid fa-heart fs-5" key={card._id} style={{ color: card.favoriteByUsers?.includes(user?._id as string) ? "red" : theme == "dark" ? "#e4e4e4" : "grey" }} onClick={() => handleFavorite(card)}></i>
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
                        )) : (<h2>No cards available!</h2>)}
                </div>

                <CardModal show={openCardModal} onHide={setOpenCardModal} cardId={cardId} cardUserId={cardUserId} renderModal={renderModal} />
                <AreYouSureModal show={openAreYouSureModal} onHide={() => setOpenAreYouSureModal(false)} render={render} cardId={cardId} renderModal={renderModal} type={type} />
                <BizNumberEditModal show={openBizNumberEdit} onHide={() => setopenBizNumberEdit(false)} bizNumber={cardBizNumber} cardId={cardId} render={render} />
            </>
        </div>
    );
}

export default Home;