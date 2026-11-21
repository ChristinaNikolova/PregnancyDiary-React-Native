import { useState, useCallback, useRef, useEffect } from "react";
import useConfigToken from "./useConfigToken";
import api from "../api/api";
import { errorMessages, httpMethods } from "../utils/constants/global";
// todo check requester!!!
export default function useFetch(initialUrl = null) {
    const [values, setValues] = useState(null);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const controllers = useRef(new Set());

    const authToken = useConfigToken();

    const execute = useCallback(
        async (url, method = httpMethods.GET, data = null) => {
            const controller = new AbortController();
            controllers.current.add(controller);

            setLoading(true);
            setServerError("");

            try {
                const response = await api.request({
                    url,
                    method,
                    ...(data != null && { data }),
                    signal: controller.signal,
                    headers: authToken
                        ? { "X-Authorization": `Bearer ${authToken}` }
                        : {},
                });

                const result = response.data ?? {};

                setValues(result);
                return result;
            } catch (err) {
                if (err.code === errorMessages.ABORT_CONTR_ERROR) {
                    return;
                }

                const message =
                    err.response?.data?.message?.[0]?.msg ||
                    err.response?.data?.message ||
                    err.message;

                setServerError(message);
                throw err;
            } finally {
                controllers.current.delete(controller);
                setLoading(controllers.current.size > 0);
            }
        },
        [authToken]
    );

    useEffect(() => {
        if (initialUrl) {
            execute(initialUrl).catch(() => { });
        }
    }, [initialUrl, execute]);

    useEffect(() => {
        return () => {
            controllers.current.forEach((controller) => controller.abort());
            controllers.current.clear();
        };
    }, []);

    return { execute, values, setValues, loading, serverError };
}