import { Axios } from "Configs/Axios";

export const AuthLogin = (payload) => Axios.post('/signin', payload);