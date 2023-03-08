import { Axios } from "Configs/Axios";

export const GetAllPageUnit = ({page = 1, perpage = 10}) => Axios.get(`/unitAll?page=${page}&limit=${perpage}`);
export const GetAllUnit = () => Axios.get(`/unit`);
export const AddDataUnit = (payload) => Axios.post('/unit', payload);
export const EditDataUnit = (id, payload) => Axios.put(`/unit/${id}`, payload);
export const DeleteDataUnit = id => Axios.delete(`/unit/${id}`);
export const GetDataUnitByUrusan = kode_urusan => Axios.get(`/unitby?kode_urusan=${kode_urusan}`);
