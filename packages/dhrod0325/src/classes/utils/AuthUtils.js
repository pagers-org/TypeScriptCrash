export class AuthUtils {
    static getToken() {
        return localStorage.getItem('user_token');
    }

    static setToken(_id) {
        localStorage.setItem('user_token', _id);
    }


}