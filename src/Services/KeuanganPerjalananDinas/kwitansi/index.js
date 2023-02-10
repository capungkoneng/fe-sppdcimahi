import { Axios } from "Configs/Axios";

export const GetDataKwitansi = () => Axios.get(`/kwitansi`);
export const AddDataKwitansi = payload => Axios.post('/kwitansi', payload);
