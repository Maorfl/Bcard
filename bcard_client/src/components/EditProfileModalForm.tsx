import { FunctionComponent, useEffect, useRef } from "react";
import User from "../interfaces/User";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../services/usersService";
import { successMsg } from "../services/feedbacksService";

interface EditProfileModalFormProps {
    onHide: Function
    renderProfile: Function
    currentUser: User
}

const EditProfileModalForm: FunctionComponent<EditProfileModalFormProps> = ({ onHide, renderProfile, currentUser }) => {
    let checkBoxElement = useRef<HTMLInputElement>(null);
    let selectElement = useRef<HTMLSelectElement>(null);

    let formik = useFormik({
        initialValues: { firstName: currentUser.name.first, middleName: currentUser.name.middle, lastName: currentUser.name.last, phone: currentUser.phone, email: currentUser.email, imageUrl: currentUser.image?.url, imageAlt: currentUser.image?.alt, state: currentUser.address.state, country: currentUser.address.country, city: currentUser.address.city, street: currentUser.address.street, houseNumber: currentUser.address.houseNumber, zip: currentUser.address.zip, gender: currentUser.gender, userType: currentUser.userType },
        validationSchema: yup.object({
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            email: yup.string().required().email(),
            imageUrl: yup.string().url(),
            state: yup.string(),
            city: yup.string().required().min(2),
            houseNumber: yup.number().required().min(1),
            middleName: yup.string(),
            phone: yup.string().required().min(4),
            imageAlt: yup.string(),
            country: yup.string().required().min(2),
            street: yup.string().required().min(2),
            zip: yup.string()
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            let userType = currentUser.userType == "business" ? values.userType ? "regular" : "business" : currentUser.userType == "regular" ? values.userType ? "business" : "regular" : "admin";

            let name = {
                first: values.firstName,
                middle: values.middleName,
                last: values.lastName
            };
            let image = {
                url: values.imageUrl,
                alt: values.imageAlt
            };
            let address = {
                state: values.state,
                country: values.country,
                city: values.city,
                street: values.street,
                houseNumber: values.houseNumber,
                zip: values.zip
            };

            updateUser({ name: name, image: image, address: address, email: values.email, phone: values.phone, userType: userType, gender: values.gender }, currentUser._id as string)
                .then((res) => {
                    successMsg("Profile updated successfully");
                    renderProfile();
                    onHide();
                })
                .catch((error) => console.log(error))
        }
    })

    let handleResetForm = () => {
        formik.resetForm();
        if (formik.values.gender == "Male") (selectElement.current as HTMLSelectElement).value = "1";
        else (selectElement.current as HTMLSelectElement).value = "2";
    }

    useEffect(() => {
        if (formik.values.gender == "Male") (selectElement.current as HTMLSelectElement).value = "1";
        else (selectElement.current as HTMLSelectElement).value = "2";
    }, []);

    return (
        <>
            <div className="container">
                <h2 className="text-center display-4 mt-3 mb-4">Edit Profile</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-4">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingFirstName"
                                    placeholder="First name"
                                    name="firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.firstName && formik.touched.firstName && <p><small className="text-danger">{formik.errors.firstName}</small></p>}
                                <label htmlFor="floatingFirstName">First name *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingLastName"
                                    placeholder="Last name"
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.lastName && formik.touched.lastName && <p><small className="text-danger">{formik.errors.lastName}</small></p>}
                                <label htmlFor="floatingLastName">Last name *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingEmail"
                                    placeholder="Email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.email && formik.touched.email && <p><small className="text-danger">{formik.errors.email}</small></p>}
                                <label htmlFor="floatingEmail">Email *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingImageUrl"
                                    placeholder="Image url"
                                    name="imageUrl"
                                    value={formik.values.imageUrl}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="floatingImageUrl">Image url</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingState"
                                    placeholder="State"
                                    name="state"
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="floatingState">State</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingCity"
                                    placeholder="City"
                                    name="city"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.city && formik.touched.city && <p><small className="text-danger">{formik.errors.city}</small></p>}
                                <label htmlFor="floatingCity">City *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingHouseNumber"
                                    placeholder="House number"
                                    name="houseNumber"
                                    value={formik.values.houseNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.houseNumber && formik.touched.houseNumber && <p><small className="text-danger">{formik.errors.houseNumber}</small></p>}
                                <label htmlFor="floatingHouseNumber">House number *</label>
                            </div>
                            {currentUser.userType == "regular" ? (
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexCheckDefault"
                                        name="userType"
                                        onChange={formik.handleChange}
                                        ref={checkBoxElement}
                                    />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Change to business user</label>
                                </div>) : currentUser.userType == "business" && (
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexCheckDefault"
                                            name="userType"
                                            onChange={formik.handleChange}
                                            ref={checkBoxElement}
                                        />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">Change to regular user</label>
                                    </div>
                                )}
                        </div>
                        <div className="col-md-4">  {/* ************************************* */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingMiddleName"
                                    placeholder="Middle name"
                                    name="middleName"
                                    value={formik.values.middleName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="floatingMiddleName">Middle name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingPhone"
                                    placeholder="Phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.phone && formik.touched.phone && <p><small className="text-danger">{formik.errors.phone}</small></p>}
                                <label htmlFor="floatingPhone">Phone *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingImageAlt"
                                    placeholder="Image alt"
                                    name="imageAlt"
                                    value={formik.values.imageAlt}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="floatingImageAlt">Image alt</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingCountry"
                                    placeholder="Country"
                                    name="country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.country && formik.touched.country && <p><small className="text-danger">{formik.errors.country}</small></p>}
                                <label htmlFor="floatingCountry">Country *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingStreet"
                                    placeholder="Street"
                                    name="street"
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.street && formik.touched.street && <p><small className="text-danger">{formik.errors.street}</small></p>}
                                <label htmlFor="floatingStreet">Street *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingZip"
                                    placeholder="Zip"
                                    name="zip"
                                    value={formik.values.zip}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="floatingZip">Zip</label>
                            </div>
                            <select
                                className="form-select"
                                aria-label="Gender select"
                                name="gender"
                                onChange={formik.handleChange}
                                ref={selectElement}
                            >
                                <option value={1}>Male</option>
                                <option value={2}>Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <button type="button" className="btn btn-outline-danger w-100" onClick={() => onHide()}>CANCEL</button>
                        </div>
                        <div className="col-md-4">
                            <button type="button" className="btn btn-outline-info w-100" onClick={() => handleResetForm()}><i className="fa-solid fa-arrows-rotate"></i></button>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-8">
                            <button type="submit" className="btn btn-warning w-100" disabled={!formik.isValid || !formik.dirty}>UPDATE</button>
                        </div>
                    </div>
                </form >
            </div >
        </>
    );
}

export default EditProfileModalForm;