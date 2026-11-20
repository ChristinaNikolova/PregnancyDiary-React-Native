import useAuthContext from "../contexts/auth/useAuthContext";

export default function useConfigToken() {
    const { user } = useAuthContext();

    return user.authToken;
}