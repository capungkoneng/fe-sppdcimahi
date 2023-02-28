export const AppConfig = {
    ENVIRONMENT: {
        DEV: {
            baseUrl: process.env.REACT_APP_BASE_URL
        }
    },
    SetToken: (data) => localStorage.setItem('token', data),
    SetUsername: (data) => localStorage.setItem('username', data),
    GetToken: ({type = 'boolean'}) => type === 'boolean' ? Boolean(localStorage.getItem('token')) : localStorage.getItem('token'),
    GetUsername: () => localStorage.getItem('username'),
    RemoveToken: () => localStorage.removeItem('token'),
};