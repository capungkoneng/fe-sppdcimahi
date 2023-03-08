import { Axios } from "Configs/Axios";

export const GetAllPageJumPen = ({page = 1, perpage = 10}) => Axios.get(`/jumpenAll?page=${page}&limit=${perpage}`);
export const GetAllJumPen = () => Axios.get(`/jumpen`);
export const AddDataJumPen = (payload) => Axios.post('/jumpen', payload);
export const EditDataJumPen = (id, payload) => Axios.put(`/jumpen/${id}`, payload);
export const DeleteDataJumpen = id => Axios.delete(`/jumpen/${id}`);
