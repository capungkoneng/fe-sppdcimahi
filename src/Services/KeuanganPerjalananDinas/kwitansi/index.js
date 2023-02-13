import { Axios } from "Configs/Axios";

export const GetDataKwitansi = () => Axios.get(`/kwitansi`);
export const GetDataKwitansiById = (id) => Axios.get(`/kwitansi/${id}`);
export const AddDataKwitansi = payload => Axios.post('/kwitansi', payload);
export const EditDataKwitansi = (id, payload) => Axios.put(`/kwitansi/${id}`, payload);
export const DeleteDataKwitansi = (id) => Axios.delete(`/kwitansi/${id}`);
