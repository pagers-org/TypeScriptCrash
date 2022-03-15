export class AuthUtils {
    static authCheck() {
        const isLogin = AuthUtils.getToken();

        if (isLogin !== null) {
            return;
        }

        location.replace('./login.html');
    }

    static getToken() {
        return localStorage.getItem('user_token');
    }
}