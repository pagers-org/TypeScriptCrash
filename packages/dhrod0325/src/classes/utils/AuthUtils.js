export class AuthUtils {
    static authCheck() {
        const isLogin = localStorage.getItem('user_token');

        if (isLogin !== null) {
            return;
        }

        location.replace('./login.html');
    }
}