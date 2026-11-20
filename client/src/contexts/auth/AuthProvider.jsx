import { AuthContext } from "./AuthContext";
import usePersistedState from "../../hooks/usePersistedState";
import api, { API_PATHS } from "../../api/api";

export default function AuthProvider({ children }) {
    const [authToken, setAuthToken, authTokenLoaded] = usePersistedState("authToken", "");
    const [email, setEmail, emailLoaded] = usePersistedState("email", "");
    const [firstName, setFirstName, firstNameLoaded] = usePersistedState("firstName", "");
    const [lastName, setLastName, lastNameLoaded] = usePersistedState("lastName", "");
    const [id, setId, idLoaded] = usePersistedState("userId", "");

    const isLoaded = authTokenLoaded && emailLoaded && firstNameLoaded && lastNameLoaded && idLoaded;

    const userAuth = (authData) => {
        setAuthToken(authData ? authData.accessToken : "");
        setEmail(authData ? authData.email : "");
        setFirstName(authData ? authData.firstName : "");
        setLastName(authData ? authData.lastName : "");
        setId(authData ? authData._id : "");
    };

    const logout = async () => {
        try {
            await api.get(`${API_PATHS.AUTH}/logout`, {
                headers: {
                    "X-Authorization": `Bearer ${authToken}`,
                },
            });
            userAuth(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                userAuth,
                logout,
                isAuthenticated: !!authToken,
                isLoaded,
                user: {
                    id: id,
                    authToken: authToken,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}