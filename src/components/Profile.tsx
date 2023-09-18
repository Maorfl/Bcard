import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import { getUserByEmail } from "../services/usersService";
import EditProfileModal from "./EditProfileModal";

interface ProfileProps {
    loggedIn: boolean
    setLoggedIn: Function
    currentUser: User | null
    setCurrentUser: Function
}

const Profile: FunctionComponent<ProfileProps> = ({ setLoggedIn, currentUser, setCurrentUser, loggedIn }) => {
    let navigate = useNavigate();
    let [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false);
    let [isDataChanged, setIsDataChanged] = useState<boolean>(false);
    let [renderModal, setRenderModal] = useState<boolean>(false);

    let renderProfile = () => setIsDataChanged(!isDataChanged);

    let logOut = () => {
        sessionStorage.removeItem("userInfo");
        setLoggedIn(!loggedIn);
        navigate("/");
    }

    useEffect(() => {
        getUserByEmail(JSON.parse(sessionStorage.getItem("userInfo") as string).email)
            .then((res) => setCurrentUser(res.data[0]))
            .catch((error) => console.log(error))
    }, [isDataChanged]);
    return (
        <>
            <div className="container mt-3">
                <h2 className="display-3 text-center">My Profile</h2>
                <div className="row justify-content-center mt-5">
                    <div className="card" style={{ width: "32rem" }}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={currentUser?.imageUrl ? currentUser.imageUrl : currentUser?.gender == "Male" ? "male-profile.jpg" : "female-profile.jpg"} className="card-img-top" alt={currentUser?.imageAlt} />
                                </div>
                                <div className="col-md-6">
                                    <h4 className="card-title">{currentUser?.firstName} {currentUser?.lastName}</h4>
                                    <p className="card-text"><b>Phone:</b> {currentUser?.phone}</p>
                                    <p className="card-text"><b>Email:</b> {currentUser?.email}</p>
                                    <p className="card-text"><b>Adress:</b> {currentUser?.country}, {currentUser?.city}, {currentUser?.street} {currentUser?.houseNumber}</p>
                                    <p className="card-text"><b>Type:</b> {(currentUser?.userType as string)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <button className="btn btn-warning w-25" onClick={() => {
                            setRenderModal(!renderModal);
                            setShowEditProfileModal(true);
                        }}>Edit Profile</button>
                    </div>
                    <div className="text-center mt-5">
                        <button className="btn btn-lg btn-danger" onClick={() => logOut()}>Logout</button>
                    </div>
                </div>
            </div>

            <EditProfileModal show={showEditProfileModal} onHide={() => setShowEditProfileModal(false)} renderProfile={renderProfile} renderModal={renderModal} currentUser={currentUser as User} />
        </>
    );
}

export default Profile;