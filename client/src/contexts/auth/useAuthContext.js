import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { errorMessages } from "../../utils/constants/global";

export default function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(errorMessages.NO_CONTEXT);
    }

    return context;
}