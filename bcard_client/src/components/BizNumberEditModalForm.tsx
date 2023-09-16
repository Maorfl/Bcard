import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { changeBizNumber } from "../services/cardsService";
import { errorMsg, successMsg } from "../services/feedbacksService";

interface BizNumberEditModalFormProps {
    onHide: Function,
    bizNumber: number,
    cardId: string,
    render: Function
}

const BizNumberEditModalForm: FunctionComponent<BizNumberEditModalFormProps> = ({ bizNumber, cardId, onHide, render }) => {
    let formik = useFormik({
        initialValues: { bizNumber: bizNumber },
        validationSchema: yup.object({
            bizNumber: yup.number().min(1000000).max(9999999)
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            changeBizNumber(values.bizNumber, cardId)
                .then((res) => {
                    successMsg(`Biz-Number has changed from ${bizNumber} to ${res.data.bizNumber}`)
                    onHide();
                    render();
                })
                .catch((error) => errorMsg(error))
        }
    });

    return (
        <>
            <p className="fs-6">Enter new Biz-Number between (1000000-9999999)</p>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingBizNumber"
                        placeholder="Biz-Number"
                        name="bizNumber"
                        value={formik.values.bizNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.bizNumber && formik.touched.bizNumber && <p><small className="text-danger">{formik.errors.bizNumber}</small></p>}
                    <label htmlFor="floatingSubtitle">Biz-Number</label>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <button type="button" className="btn btn-danger w-100" onClick={() => onHide()}>CANCEL</button>
                    </div>
                    <div className="col-md-4">
                        <button type="submit" className="btn btn-warning w-100" disabled={!formik.dirty || !formik.isValid}>EDIT</button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default BizNumberEditModalForm;