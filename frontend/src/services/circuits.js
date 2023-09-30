export const fetchAnetCircuits = async () => {
    const response = await fetch('http://localhost:5000/api/anet');
    return response.json();
};

export const fetchBnetCircuits = async () => {
    const response = await fetch('http://localhost:5000/api/bnet');
    return response.json();
};