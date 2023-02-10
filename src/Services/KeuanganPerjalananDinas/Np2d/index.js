import { Axios } from "Configs/Axios";

export const GetAllDataNp2d = ({ page = 1, perpage = 10 }) =>
  Axios.get(`/np2d?page=${page}&limit=${perpage}`);
export const GetDataNp2dById = (id) => Axios.get(`/np2d/${id}`);
export const AddDataNp2d = payload => Axios.post('/np2d', payload);
export const EditDataNp2d = (id, payload) => Axios.put(`/np2d/${id}`, payload);
export const DeleteDataNp2d = (id) => Axios.delete(`/np2d/${id}`);
