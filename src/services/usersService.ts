import axios from "axios";
import User from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

export function getAllUsers() {
    return axios.get(`${api}`);
}

export function checkUser(userEmail: string, userPassword: string) {
    return axios.get(`${api}?email=${userEmail}&password=${userPassword}`);
}

export function getUserByEmail(userEmail: string) {
    return axios.get(`${api}?email=${userEmail}`);
}

export function addUser(newUser: User) {
    return axios.post(api, newUser);
}

export function updateUser(updatedUser: User, userId: number) {
    return axios.put(`${api}/${userId}`, updatedUser);
}

export function deleteUser(userId: number) {
    return axios.delete(`${api}/${userId}`);
}