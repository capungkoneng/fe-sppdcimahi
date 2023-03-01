import { Axios } from "Configs/Axios";

export const GetAllPagePangkat = ({page = 1, perpage = 10}) => Axios.get(`/pangkatAll?page=${page}&limit=${perpage}`);
export const AddDataPangkat = (payload) => Axios.post('/pangkat', payload);
export const EditDataPangkat = (id, payload) => Axios.put(`/pangkat/${id}`, payload);
export const DeleteDataPangkat = id => Axios.delete(`/pangkat/${id}`);
