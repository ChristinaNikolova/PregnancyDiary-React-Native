import { AuthContext } from "./AuthContext";
import usePersistedState from "../../hooks/usePersistedState";
import api from "../../api/api";
import { apiPaths } from "../../utils/constants/api";

export default function AuthProvider({ children }) {
    const [authToken, setAuthToken, authTokenLoaded] = usePersistedState("authToken", "");
    const [email, setEmail, emailLoaded] = usePersistedState("email", "");
    const [firstName, setFirstName, firstNameLoaded] = usePersistedState("firstName", "");
    const [lastName, setLastName, lastNameLoaded] = usePersistedState("lastName", "");
    const [picture, setPicture, pictureLoaded] = usePersistedState("picture", null);
    const [id, setId, idLoaded] = usePersistedState("userId", "");

    const isLoaded =
        authTokenLoaded &&
        emailLoaded &&
        firstNameLoaded &&
        lastNameLoaded &&
        pictureLoaded &&
        idLoaded;

    const userAuth = (authData) => {
        setAuthToken(authData ? authData.accessToken : "");
        setEmail(authData ? authData.email : "");
        setFirstName(authData ? authData.firstName : "");
        setLastName(authData ? authData.lastName : "");
        setPicture(authData ? authData.picture ?? null : null);
        setId(authData ? authData._id : "");
    };

    const updateUser = (user) => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPicture(user.picture ?? null);
    };

    const logout = async () => {
        try {
            await api.get(`${apiPaths.AUTH}/logout`, {
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
                updateUser,
                logout,
                isAuthenticated: !!authToken,
                isLoaded,
                user: {
                    id: id,
                    authToken: authToken,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    picture: picture,
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}