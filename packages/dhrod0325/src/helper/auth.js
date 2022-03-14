export const isLogin = localStorage.getItem('user_token');

export const authCheck = () => {
    if (isLogin !== null) {
        return;
    }

    location.replace('./login.html');
}

