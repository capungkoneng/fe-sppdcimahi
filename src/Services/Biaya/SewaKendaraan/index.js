import { Axios } from "Configs/Axios";

export const GetAllSewaKendaraan = ({page = 1, perpage = 10}) => Axios.get(`/bskendaraan?page=${page}&limit=${perpage}`);
export const GetSewaKendaraanById = id => Axios.get(`/bskendaraan/${id}`);
export const AddSewaKendaraan = payload => Axios.post('/bskendaraan', payload);
export const EditSewaKendaraan = (id, payload) => Axios.put(`/bskendaraan/${id}`, payload);
export const DeleteDataSewaKendaraan = id => Axios.delete(`/bskendaraan/${id}`);