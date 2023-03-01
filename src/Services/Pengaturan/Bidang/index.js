import { Axios } from "Configs/Axios";

export const GetAllPageBidang = ({page = 1, perpage = 10}) => Axios.get(`/bidangAll?page=${page}&limit=${perpage}`);
export const AddDataBidang = (payload) => Axios.post('/bidang', payload);
export const EditDataBidang = (id, payload) => Axios.put(`/bidang/${id}`, payload);
export const DeleteDataBidang = id => Axios.delete(`/bidang/${id}`);
