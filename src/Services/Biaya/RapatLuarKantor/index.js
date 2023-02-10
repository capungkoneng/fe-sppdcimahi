import { Axios } from "Configs/Axios";

export const GetAllDataRapat = ({page = 1, perpage = 10}) => Axios.get(`/brlk?page=${page}&limit=${perpage}`);
export const GetDataRapatById = id => Axios.get(`/brlk/${id}`);
export const AddDataRapat = payload => Axios.post('/brlk', payload);
export const EditDataRapat = (id, payload) => Axios.put(`/brlk/${id}`, payload);
export const DeleteDataRapat = id => Axios.delete(`/brlk/${id}`);
