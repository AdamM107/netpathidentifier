export const fetchAnetCircuits = async () => {
    const backendURL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${backendURL}/api/anet`);
    return response.json();
};

export const fetchBnetCircuits = async () => {
    const backendURL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${backendURL}/api/bnet`);
    return response.json();
};