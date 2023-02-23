import { Axios } from "Configs/Axios";

export const GetAllSpt = ({page = 1, perpage = 10}) => Axios.get(`/spt?page=${page}&limit=${perpage}`);
export const GetAllSptNoPage = () => Axios.get(`/spt`);
export const GetSptById = id => Axios.get(`/spt/${id}`);
export const AddSpt = payload => Axios.post('/spt', payload);
export const EditSptById = (id, payload) => Axios.put(`/spt/${id}`, payload);
export const DeleteSpt = (id) => Axios.delete(`/spt/${id}`);