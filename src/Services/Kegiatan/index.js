import { Axios } from "Configs/Axios";

export const GetAllKegiatan = ({page = 1, perpage = 10}) => Axios.get(`/kegiatan?page=${page}&limit=${perpage}`);
export const GetKegiatanById = id => Axios.get(`/kegiatan/${id}`);
export const AddKegiatan = payload => Axios.post('/kegiatan', payload);
export const EditKegiatan = (id, payload) => Axios.put(`/kegiatan/${id}`, payload);
export const DeleteKegiatan = (id) => Axios.delete(`/kegiatan/${id}`);