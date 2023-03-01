import { Axios } from "Configs/Axios";

export const GetAllPagejabatan = ({page = 1, perpage = 10}) => Axios.get(`/jabatanAll?page=${page}&limit=${perpage}`);
export const AddDataJabatan = (payload) => Axios.post('/jabatan', payload);
export const EditDataJabatan = (id, payload) => Axios.put(`/jabatan/${id}`, payload);
export const DeleteDataJabatan = id => Axios.delete(`/jabatan/${id}`);
