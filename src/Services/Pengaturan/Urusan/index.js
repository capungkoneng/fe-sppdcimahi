import { Axios } from "Configs/Axios";

export const GetAllPageUrusan = ({page = 1, perpage = 10}) => Axios.get(`/urusanAll?page=${page}&limit=${perpage}`);
export const GetAllUrusan = () => Axios.get(`/urusan`);
export const AddDataUrusan = (payload) => Axios.post('/urusan', payload);
export const EditDataUrusan = (id, payload) => Axios.put(`/urusan/${id}`, payload);
export const DeleteDataUrusan = id => Axios.delete(`/urusan/${id}`);
