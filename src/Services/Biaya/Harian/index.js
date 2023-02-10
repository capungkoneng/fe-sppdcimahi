import { Axios } from "Configs/Axios";

export const GetAllDataHarian = ({page = 1, perpage = 10}) => Axios.get(`/bhsppd?page=${page}&limit=${perpage}`);
export const GetDataHarianById = (id) => Axios.get(`/bhsppd/${id}`);
export const AddDataHarian = (payload) => Axios.post('/bhsppd', payload);
export const EditDataHarian = (id, payload) => Axios.put(`/bhsppd/${id}`, payload);
export const DeleteDataHarian = id => Axios.delete(`/bhsppd/${id}`);
