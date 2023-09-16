import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { checkLoggedInUser } from "../services/usersService";
import { useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbacksService";
import jwt_decode from "jwt-decode";

interface LoginProps {
    loggedIn: boolean
    setLoggedIn: Function
}

const Login: FunctionComponent<LoginProps> = ({ setLoggedIn, loggedIn }) => {
    const navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values) => {
            checkLoggedInUser(values.email, values.password)
                .then((res) => {
                    sessionStorage.setItem("token", JSON.stringify(res.data));
                    sessionStorage.setItem("userInfo", JSON.stringify(jwt_decode(res.data)))
                    successMsg(`Welcome back ${(jwt_decode(res.data) as any).name.first} ${(jwt_decode(res.data) as any).name.last}`);
                    setLoggedIn(!loggedIn);
                    navigate("/");
                })
                .catch((error) => errorMsg(error.response.data))
        }
    })
    return (
        <>
            <div className="container w-25">
                <h2 className="display-4 text-center mt-3 mb-5">Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingEmail"
                            placeholder="name@example.com"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && <p><small className="text-danger">{formik.errors.email}</small></p>}
                        <label htmlFor="floatingEmail">Email</label>
                    </div>
                    <div className="form-floating mb-4">
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
                        {formik.touched.password && formik.errors.password && <p><small className="text-danger">{formik.errors.password}</small></p>}
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;