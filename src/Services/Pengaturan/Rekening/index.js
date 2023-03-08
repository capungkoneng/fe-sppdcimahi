import { Axios } from "Configs/Axios";

export const GetAllPageRekening = ({page = 1, perpage = 10}) => Axios.get(`/masterrekAll?page=${page}&limit=${perpage}`);
export const GetAllRekening = () => Axios.get(`/masterrek`);
export const AddDataRekening = (payload) => Axios.post('/masterrek', payload);
export const EditDataRekening = (id, payload) => Axios.put(`/masterrek/${id}`, payload);
export const DeleteDataRekening = id => Axios.delete(`/masterrek/${id}`);