import axios from "axios";
import Card from "../interfaces/Card";

const api: string = `${process.env.REACT_APP_API}/cards`;

export function getCards() {
    return axios.get(api);
}

export function getCardById(cardId: string) {
    return axios.get(`${api}/${cardId}`);
}

export function addCard(newCard: Card) {
    return axios.post(api, newCard, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}

export function deleteCard(cardId: string) {
    return axios.delete(`${api}/${cardId}`, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}

export function updateCard(cardToUpdate: Card, cardId: string) {
    return axios.put(`${api}/${cardId}`, cardToUpdate, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}

export function addOrRemoveToFavorites(cardAddedToFavorites: Card, cardId: string) {
    return axios.patch(`${api}/${cardId}`, cardAddedToFavorites, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}

export function changeBizNumber(newBizNumber: number, cardId: string) {
    return axios.patch(`${api}/${cardId}`, { bizNumber: newBizNumber }, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}
