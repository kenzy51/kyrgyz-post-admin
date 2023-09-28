interface UseTokenResult {
    saveToken: (token: string) => void;
    getToken: () => string | null;
    removeToken: () => void;
    saveUserId: (userId:string)=> void 
}

export const activateToken = (): UseTokenResult => {
    const saveToken = (token: string) => localStorage.setItem('token', token);
    const removeToken = () => localStorage.removeItem('token');
    const getToken = () => localStorage.getItem('token');
    const saveUserId = (userId:any) => localStorage.setItem('userId', userId.toString())
    return {
        saveToken,
        getToken,
        removeToken,
        saveUserId
    }
};