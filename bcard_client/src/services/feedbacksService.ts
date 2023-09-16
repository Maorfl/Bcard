import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function successMsg(massage: string) {
    toast.success(massage, {
        position: "top-center",
        autoClose: 1500,
    });
}

export function errorMsg(massage: string) {
    toast.error(massage, {
        position: "top-center",
        autoClose: 3000,
    });
}