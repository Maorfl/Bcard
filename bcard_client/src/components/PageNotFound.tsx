import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFoundProps {

}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="container text-center">
                <h1 className="display-1">Page Not Found</h1>
                <button className="btn btn-lg btn-secondary mt-5" onClick={() => navigate(-1)}>Back</button>
            </div>
        </>
    );
}

export default PageNotFound;