import { AuthContext } from "./AuthContext";
import usePersistedState from "../../hooks/usePersistedState";

export default function AuthProvider({ children }) {
    const [authToken, setAuthToken, authTokenLoaded] = usePersistedState("authToken", "");
    const [email, setEmail, emailLoaded] = usePersistedState("email", "");
    const [id, setId, idLoaded] = usePersistedState("userId", "");

    const isLoaded = authTokenLoaded && emailLoaded && idLoaded;

    const userAuth = (authData) => {
        setAuthToken(authData ? authData.accessToken : "");
        setEmail(authData ? authData.email : "");
        setId(authData ? authData._id : "");
    };

    return (
        <AuthContext.Provider
            value={{
                userAuth,
                isAuthenticated: !!authToken,
                isLoaded,
                user: {
                    id: id,
                    authToken: authToken,
                    email: email,
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}