const useDataApi = () => {
    const { useState, useEffect, useReducer } = React;
    const [url, setUrl] = useState("");
    const yelpApi = 'XQ9sGCeCOPzMy-2eY050U3rKE9sLrxeMXA9-Ltz8iD7eg2_mFo1WPj0KdqQeq1qfXYnsErwKuuoAoWUCNH0-KiJ3CETyJnuxB1Zx1rDxAfVHzjCeEe-qCVAVuMIoYnYx';
    const config = {
        headers: {
            'Authorization': `Bearer ${yelpApi}`,
        }
    }
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: []
    });

    useEffect(() => {
        if (!url) return;
        let didCancel = false;
        const fetchData = async () => {
            dispatch({ type: "FETCH_INIT" });
            try {
                const result = await axios(url, config);
                if (!didCancel) {
                    dispatch({ type: "FETCH_SUCCESS", payload: result.data.businesses });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: "FETCH_FAILURE" });
                }
            }
        };
        fetchData();
        return () => {
            didCancel = true;
        };
    }, [url]);
    return [state, setUrl];
};

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            };
        case "FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
};