import { Axios } from "Configs/Axios";

export const GetAllDataPenginapan = ({page = 1, perpage = 10}) => Axios.get(`/bpsppd?page=${page}&limit=${perpage}`);
export const GetDataPenginapanById = id => Axios.get(`/bpsppd/${id}`);
export const AddDataPenginapan = payload => Axios.post('/bpsppd', payload);
export const EditDataPenginapan = (id, payload) => Axios.put(`/bpsppd/${id}`, payload);
export const DeletePenginapan = id => Axios.delete(`/bpsppd/${id}`);
