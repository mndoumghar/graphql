
export  const  Storage = {
    getToken() {
        return localStorage.getItem('token');
    },

    async setToken(token) {

        localStorage.setItem('token', token);
    },

    removeToken() {
        localStorage.removeItem('token')
    }

}