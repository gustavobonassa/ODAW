export function signInRequest(username, password) {
    return {
        type: '@user/SIGNIN_REQUEST',
        username,
        password,
    };
}
export function signInSuccess(token) {
    return {
        type: '@user/SIGNIN_SUCCESS',
        token
    };
}
export function signOut() {
    return {
        type: '@user/SIGNOUT',
    };
}
