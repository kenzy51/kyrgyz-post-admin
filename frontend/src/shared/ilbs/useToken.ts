interface UseTokenResult {
    saveToken: (token: string) => void;
    getToken: () => string | null;
    removeToken: () => void;
}

export const activateToken = (): UseTokenResult => {
    const saveToken = (token: string) => localStorage.setItem('token', token);
    const removeToken = () => localStorage.removeItem('token');
    const getToken = () => localStorage.getItem('token');

    return {
        saveToken,
        getToken,
        removeToken
    }
};