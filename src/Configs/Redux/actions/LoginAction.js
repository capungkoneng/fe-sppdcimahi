export const LoginAction = (state, action) => {
    state.isAuthenticated = action.payload;
}