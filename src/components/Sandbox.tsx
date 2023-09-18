import { FunctionComponent, useEffect, useState } from "react";
import User from "../interfaces/User";
import { getAllUsers } from "../services/usersService";
import { Type } from "../enums/areYouSureType";
import AreYouSureModal from "./AreYouSureModal";

interface SandboxProps {

}

const Sandbox: FunctionComponent<SandboxProps> = () => {
    let [allUsers, setAllUsers] = useState<User[]>([]);
    let [userId, setUserId] = useState<number>(0);
    let [type, setType] = useState<string>("");
    let [isDataChanged, setIsDataChanged] = useState<boolean>(false);
    let [openAreYouSureModal, setOpenAreYouSureModal] = useState<boolean>(false);
    let [renderModal, setRenderModal] = useState<boolean>(false);

    let render = () => setIsDataChanged(!isDataChanged);

    useEffect(() => {
        getAllUsers()
            .then((res) => setAllUsers(res.data))
            .catch((error) => console.log(error))
    }, [isDataChanged]);
    return (
        <>
            <div className="container-fluid">
                <h1 className="display-3 text-center mb-4 text-decoration-underline">Users Control panel</h1>
                {allUsers.length ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Adress</th>
                                <th>Zip</th>
                                <th>Gender</th>
                                <th>User Type</th>
                                <th>Change Type</th>
                                <th>Set Admin</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user: User) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.middleName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.state ? `${user.country}, ${user.state}, ${user.city}, ${user.street} ${user.houseNumber}` : `${user.country}, ${user.city}, ${user.street} ${user.houseNumber}`}</td>
                                    <td>{user.zip}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.userType}</td>
                                    <td>{user.userType == "admin" ? <i className="fa-solid fa-ban text-secondary fs-3"></i> : <button type="button" className="btn btn-outline-info btn-sm" onClick={() => {
                                        setUserId(user.id as number);
                                        setType(Type.ChangeUserType);
                                        setRenderModal(!renderModal);
                                        setOpenAreYouSureModal(true);
                                    }}><i className="fa-solid fa-repeat"></i></button>}</td>
                                    <td>{user.userType == "admin" ? <i className="fa-solid fa-check text-success fs-3"></i> : <button type="button" className="btn btn-outline-warning btn-sm" onClick={() => {
                                        setUserId(user.id as number);
                                        setType(Type.ChangeToAdmin);
                                        setRenderModal(!renderModal);
                                        setOpenAreYouSureModal(true);
                                    }}><i className="fa-solid fa-hammer"></i></button>}</td>
                                    <td>{user.userType == "admin" && user.id == 1 ? <i className="fa-solid fa-ban text-secondary fs-3"></i> : <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => {
                                        setUserId(user.id as number);
                                        setType(Type.DeleteUser);
                                        setRenderModal(!renderModal);
                                        setOpenAreYouSureModal(true);
                                    }}><i className="fa-solid fa-trash"></i></button>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<h2>No users availble</h2>)}
            </div >

            <AreYouSureModal show={openAreYouSureModal} onHide={() => setOpenAreYouSureModal(false)} userId={userId} render={render} renderModal={renderModal} type={type} />
        </>
    );
}

export default Sandbox;