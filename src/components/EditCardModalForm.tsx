import { useFormik } from "formik";
import * as yup from "yup";
import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getCardById, updateCard } from "../services/cardsService";
import { successMsg } from "../services/feedbacksService";

interface EditCardModalFormProps {
    onHide: Function
    render: Function
    cardId: number
}

const EditCardModalForm: FunctionComponent<EditCardModalFormProps> = ({ onHide, render, cardId }) => {
    let [editedCard, setEditedCard] = useState<Card>({
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        imageUrl: "",
        imageAlt: "",
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: "",
        userId: 0,
        favoriteByUsers: []
    });

    let formik = useFormik({
        initialValues: { title: editedCard.title, description: editedCard.description, email: editedCard?.email, imageUrl: editedCard?.imageUrl, state: editedCard?.state, city: editedCard?.city, houseNumber: editedCard?.houseNumber, subtitle: editedCard?.subtitle, phone: editedCard?.phone, web: editedCard?.web, imageAlt: editedCard?.imageAlt, country: editedCard?.country, street: editedCard?.street, zip: editedCard?.zip, userId: editedCard.userId, favoriteByUsers: editedCard.favoriteByUsers },
        validationSchema: yup.object({
            title: yup.string().required().min(2),
            description: yup.string().required().min(2),
            email: yup.string().required().email(),
            imageUrl: yup.string(),
            state: yup.string(),
            city: yup.string().required().min(2),
            houseNumber: yup.number().required().min(1),
            subtitle: yup.string().required().min(2),
            phone: yup.string().required().min(4),
            web: yup.string(),
            imageAlt: yup.string(),
            country: yup.string().required().min(2),
            street: yup.string().required().min(2),
            zip: yup.string()
        }),
        enableReinitialize: true,
        onSubmit: (values: Card) => {
            updateCard(values, cardId)
                .then((res) => {
                    successMsg("Card updated successfully!");
                    onHide();
                    render();
                })
                .catch((error) => console.log(error))
        }
    })

    useEffect(() => {
        getCardById(cardId)
            .then((res) => setEditedCard(res.data[0]))
            .catch((error) => console.log(error))
    }, []);
    return (
        <>
            <div className="container">
                <h1 className="display-4 text-center">Edit Card</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row justify-content-center mb-3">
                        <div className="col-md-5">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingTitle"
                                    placeholder="Title"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.title && formik.touched.title && <p><small className="text-danger">{formik.errors.title}</small></p>}
                                <label htmlFor="floatingTitle">Title *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingDescription"
                                    placeholder="Description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.description && formik.touched.description && <p><small className="text-danger">{formik.errors.description}</small></p>}
                                <label htmlFor="floatingDescription">Description *</label>
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
                        </div>
                        <div className="col-md-5">  {/* ************************************* */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingSubtitle"
                                    placeholder="Subtitle"
                                    name="subtitle"
                                    value={formik.values.subtitle}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.subtitle && formik.touched.subtitle && <p><small className="text-danger">{formik.errors.subtitle}</small></p>}
                                <label htmlFor="floatingSubtitle">Subtitle *</label>
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
                                    id="floatingWeb"
                                    placeholder="Web"
                                    name="password"
                                    value={formik.values.web}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="floatingWeb">Web</label>
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
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <button type="button" className="btn btn-outline-danger w-100" onClick={() => onHide()}>CANCEL</button>
                        </div>
                        <div className="col-md-4">
                            <button type="button" className="btn btn-outline-info w-100" onClick={() => formik.resetForm()}><i className="fa-solid fa-arrows-rotate"></i></button>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-8">
                            <button type="submit" className="btn btn-warning w-100" disabled={!formik.isValid}>UPDATE</button>
                        </div>
                    </div>
                </form >
            </div>
        </>
    );
}

export default EditCardModalForm;