import { Axios } from "Configs/Axios";

export const GetAllPageGolongan = ({page = 1, perpage = 10}) => Axios.get(`/golonganAll?page=${page}&limit=${perpage}`);
export const AddDataGolongan = (payload) => Axios.post('/golongan', payload);
export const EditDataGolongan = (id, payload) => Axios.put(`/golongan/${id}`, payload);
export const DeleteDataGolongan = id => Axios.delete(`/golongan/${id}`);
