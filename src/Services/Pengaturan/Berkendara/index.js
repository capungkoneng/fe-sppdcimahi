import { Axios } from "Configs/Axios";

export const GetAllPageBerkendara = ({page = 1, perpage = 10}) => Axios.get(`/berkendaraAll?page=${page}&limit=${perpage}`);
export const AddDataBerkendara = (payload) => Axios.post('/berkendara', payload);
export const EditDataBerkendara = (id, payload) => Axios.put(`/berkendara/${id}`, payload);
export const DeleteDataBerkendara = id => Axios.delete(`/berkendara/${id}`);
