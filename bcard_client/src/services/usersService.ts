import axios from "axios";
import User from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

export function getAllUsers() {
    return axios.get(`${api}`);
}

export function checkLoggedInUser(email: string, password: string) {
    return axios.post(`${api}/login`, { email: email, password: password });
}

export function getUserById(userId: string) {
    return axios.get(`${api}/${userId}`, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}

export function addUser(newUser: User) {
    return axios.post(api, newUser);
}

export function updateUser(updatedUser: User, userId: string) {
    return axios.put(`${api}/${userId}`, updatedUser, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}

export function changeUserType(userId: string, newUserType: string) {
    return axios.patch(`${api}/${userId}`, { userType: newUserType }, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}

export function suspendUser(userId: string) {
    return axios.patch(`${api}/${userId}`, { suspended: Date.now() }, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}

export function deleteUser(userId: string) {
    return axios.delete(`${api}/${userId}`, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        }
    });
}
