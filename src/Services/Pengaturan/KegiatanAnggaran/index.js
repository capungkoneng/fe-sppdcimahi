import { Axios } from "Configs/Axios";

export const GetAllPageKegAnggaran = ({page = 1, perpage = 10}) => Axios.get(`/kegangAll?page=${page}&limit=${perpage}`);
export const GetAllKegAnggaran = () => Axios.get(`/kegang`);
export const AddDataKegAnggaran = (payload) => Axios.post('/kegang', payload);
export const EditDataKegAnggaran = (id, payload) => Axios.put(`/kegang/${id}`, payload);
export const DeleteDataKegAnggaran = id => Axios.delete(`/kegang/${id}`);
