
import { useState, useCallback } from "react";
import useConfigToken from "./useConfigToken";
import api from "../api/api";
import { httpMethods } from "../utils/constants/global";

// TODO: Add AbortController to cancel pending requests when needed.
export default function useFetch() {
    const [values, setValues] = useState(null);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const { authToken } = useConfigToken();

    const execute = useCallback(
        async (url, method = httpMethods.GET, data = null) => {
            setLoading(true);
            setServerError("");

            try {
                const response = await api.request({
                    url,
                    method,
                    data,
                    headers: authToken
                        ? { "X-Authorization": `Bearer ${authToken}` }
                        : {},
                });

                const result = response.data ?? {};

                setValues(result);
                return result;
            } catch (err) {
                const message =
                    err.response?.data?.message?.[0]?.msg ||
                    err.response?.data?.message ||
                    err.message;

                setServerError(message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [authToken]
    );

    return { execute, values, loading, serverError };
}
