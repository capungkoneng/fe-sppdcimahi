import { Axios } from "Configs/Axios";

export const AuthLogin = (payload) => Axios.post('/signin', payload);
export const AuthLogout = (header) => Axios.delete('/signout', header);