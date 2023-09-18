import axios from "axios";
import Card from "../interfaces/Card";

const api: string = `${process.env.REACT_APP_API}/cards`;

export function getCards() {
    return axios.get(api);
}

export function getCardById(cardId: number) {
    return axios.get(`${api}?id=${cardId}`);
}

export function addCard(newCard: Card) {
    return axios.post(api, newCard);
}

export function deleteCard(cardId: number) {
    return axios.delete(`${api}/${cardId}`);
}

export function updateCard(cardToUpdate: Card, cardId: number) {
    return axios.put(`${api}/${cardId}`, cardToUpdate);
}