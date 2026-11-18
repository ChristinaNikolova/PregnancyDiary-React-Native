import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        // TODO add constant here
        throw new Error("useAuthContext must be used within AuthProvider");
    }

    return context;
}