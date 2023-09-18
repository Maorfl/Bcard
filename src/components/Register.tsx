import { useFormik } from "formik";
import * as yup from "yup";
import { FunctionComponent, useEffect, useRef } from "react";
import { addUser } from "../services/usersService";
import { useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbacksService";

interface RegisterProps {
    loggedIn: boolean
    setLoggedIn: Function
}

const Register: FunctionComponent<RegisterProps> = ({ setLoggedIn, loggedIn }) => {
    let navigate = useNavigate();
    let checkBoxElement = useRef<HTMLInputElement>(null);
    let selectElement = useRef<HTMLSelectElement>(null);

    let formik = useFormik({
        initialValues: { firstName: "", lastName: "", email: "", imageUrl: "", state: "", city: "", houseNumber: 0, middleName: "", phone: "", password: "", imageAlt: "", country: "", street: "", zip: "", userType: false, gender: "Male" },
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
            password: yup.string().required().min(8).matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character(!@#$%^&*()\-_=+{};:,<.>)"),
            imageAlt: yup.string(),
            country: yup.string().required().min(2),
            street: yup.string().required().min(2),
            zip: yup.string()
        }),
        onSubmit: (values) => {
            let userType = values.userType ? "business" : "regular";

            addUser({ ...values, userType: userType, gender: values.gender })
                .then((res) => {
                    sessionStorage.setItem("userInfo", JSON.stringify(res.data));
                    successMsg(`You have registered successfully with ${res.data.email}`);
                    setLoggedIn(!loggedIn);
                    navigate("/");
                })
        }
    })

    let handleResetForm = () => {
        formik.resetForm();
        (checkBoxElement.current as HTMLInputElement).checked = false;
        (selectElement.current as HTMLSelectElement).value = "1";
    }

    useEffect(() => {
        formik.setFieldValue("houseNumber", "");
    }, []);

    return (
        <>
            <div className="container">
                <h2 className="text-center display-4 mt-3 mb-4">Register</h2>
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
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    name="userType"
                                    onChange={formik.handleChange}
                                    ref={checkBoxElement}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">Signup as business</label>
                            </div>
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
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.password && formik.touched.password && <p><small className="text-danger">{formik.errors.password}</small></p>}
                                <label htmlFor="floatingPassword">Password *</label>
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
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <button className="btn btn-outline-danger w-100" onClick={() => navigate(-1)}>CANCEL</button>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-outline-info w-100" onClick={() => handleResetForm()}><i className="fa-solid fa-arrows-rotate"></i></button>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-8">
                            <button type="submit" className="btn btn-success w-100" disabled={!formik.isValid}>REGISTER</button>
                        </div>
                    </div>
                </form >
            </div >
        </>
    );
}

export default Register;