// localstorage needed to be retrieved from another file because it can't work in the same helper file
export const getToken = () => {
    return localStorage.getItem('auth-token');
}

