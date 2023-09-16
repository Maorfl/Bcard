import { useFormik } from "formik";
import * as yup from "yup";
import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getCardById, updateCard } from "../services/cardsService";
import { successMsg } from "../services/feedbacksService";

interface EditCardModalFormProps {
    onHide: Function
    render: Function
    cardId: string
}

const EditCardModalForm: FunctionComponent<EditCardModalFormProps> = ({ onHide, render, cardId }) => {
    let [editedCard, setEditedCard] = useState<Card>({
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        image: {
            url: "",
            alt: ""
        },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: "",
        },
        userId: "",
        favoriteByUsers: []
    });

    let formik = useFormik({
        initialValues: { title: editedCard.title, description: editedCard.description, email: editedCard?.email, image: { url: editedCard?.image?.url, alt: editedCard.image?.alt }, address: { state: editedCard?.address?.state, country: editedCard?.address.country, city: editedCard?.address.city, street: editedCard?.address.street, houseNumber: editedCard?.address.houseNumber, zip: editedCard?.address.zip }, subtitle: editedCard?.subtitle, phone: editedCard?.phone, web: editedCard?.web },
        validationSchema: yup.object({
            title: yup.string().required().min(2),
            description: yup.string().required().min(2),
            email: yup.string().required().email(),
            address: yup.object({
                state: yup.string(),
                city: yup.string().required().min(2),
                houseNumber: yup.number().required().min(1),
                country: yup.string().required().min(2),
                street: yup.string().required().min(2),
                zip: yup.string()
            }),
            image: yup.object({
                url: yup.string(),
                alt: yup.string(),
            }),
            subtitle: yup.string().required().min(2),
            phone: yup.string().required().min(4),
            web: yup.string(),
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
            .then((res) => setEditedCard(res.data))
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
                                    name="image.url"
                                    value={formik.values.image?.url}
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
                                    name="address.state"
                                    value={formik.values.address?.state}
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
                                    name="address.city"
                                    value={formik.values.address.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.address?.city && formik.touched.address?.city && <p><small className="text-danger">{formik.errors.address?.city}</small></p>}
                                <label htmlFor="floatingCity">City *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingHouseNumber"
                                    placeholder="House number"
                                    name="address.houseNumber"
                                    value={formik.values.address.houseNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.address?.houseNumber && formik.touched.address?.houseNumber && <p><small className="text-danger">{formik.errors.address?.houseNumber}</small></p>}
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
                                    name="web"
                                    value={formik.values?.web}
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
                                    name="image.alt"
                                    value={formik.values.image?.alt}
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
                                    name="address.country"
                                    value={formik.values.address.country}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.address?.country && formik.touched.address?.country && <p><small className="text-danger">{formik.errors.address.country}</small></p>}
                                <label htmlFor="floatingCountry">Country *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingStreet"
                                    placeholder="Street"
                                    name="address.street"
                                    value={formik.values.address.street}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.address?.street && formik.touched.address?.street && <p><small className="text-danger">{formik.errors.address.street}</small></p>}
                                <label htmlFor="floatingStreet">Street *</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingZip"
                                    placeholder="Zip"
                                    name="address.zip"
                                    value={formik.values.address?.zip}
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
                            <button type="submit" className="btn btn-warning w-100" disabled={!formik.isValid || !formik.dirty}>UPDATE</button>
                        </div>
                    </div>
                </form >
            </div>
        </>
    );
}

export default EditCardModalForm;