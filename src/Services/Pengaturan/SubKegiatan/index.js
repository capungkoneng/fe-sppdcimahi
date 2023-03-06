import { Axios } from "Configs/Axios";

export const GetAllPageSubKegiatan = ({page = 1, perpage = 10}) => Axios.get(`/subkegangAll?page=${page}&limit=${perpage}`);
export const GetAllSubKegiatan = () => Axios.get(`/subkegang`);
export const AddDataSubKegiatan = (payload) => Axios.post('/subkegang', payload);
export const EditDataSubKegiatan = (id, payload) => Axios.put(`/subkegang/${id}`, payload);
export const DeleteDataSubKegiatan = id => Axios.delete(`/subkegang/${id}`);
