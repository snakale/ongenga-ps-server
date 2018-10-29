
export const getSessionStoreOptions = () => {
    return {
        key: 'ongenga_session_cookie',
        secret: 'ongenga_session_cookie_secret',
        resave: true,
        saveUninitialized: false,
        httpOnly: false
    }
}