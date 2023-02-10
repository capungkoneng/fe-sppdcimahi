import { Axios } from "Configs/Axios";

export const GetAllDataRepresentasi = ({page = 1, perpage = 10}) => Axios.get(`/brsppd?page=${page}&limit=${perpage}`);
export const GetRepresentasiById = id => Axios.get(`/brsppd/${id}`);
export const AddDataRepresentais = payload => Axios.post('/brsppd', payload);
export const EditDataRepresentasi = (id, payload) => Axios.put(`/brsppd/${id}`, payload);
export const DeleteDataRepresentasi = id => Axios.delete(`/brsppd/${id}`);