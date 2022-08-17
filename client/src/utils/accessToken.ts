const getAccessToken = () => {
    const token = localStorage.getItem('user') || "{}";
    const parsed = JSON.parse(token);
    return parsed.accessToken;
}

export default getAccessToken;