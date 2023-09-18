import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { checkUser } from "../services/usersService";
import { useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbacksService";

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
            checkUser(values.email, values.password)
                .then((res) => {
                    if (res.data.length) {
                        sessionStorage.setItem("userInfo", JSON.stringify(res.data[0]))
                        successMsg(`Welcome back ${res.data[0].firstName} ${res.data[0].lastName}`);
                        setLoggedIn(!loggedIn);
                        navigate("/");
                    }
                    else errorMsg("User does not exist!");
                })
                .catch((error) => console.log(error))
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