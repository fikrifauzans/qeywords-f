export const saveToken = (userToken) => {
    localStorage.setItem(process.env.REACT_APP_NAME, JSON.stringify(userToken));
};

export const getToken = () => {
    return JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME));
};

export const removeToken = () => {
    return localStorage.removeItem(process.env.REACT_APP_NAME);
};
