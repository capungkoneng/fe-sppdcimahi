import { Axios } from "Configs/Axios";

export const GetAllPageSubUnit = ({page = 1, perpage = 10}) => Axios.get(`/subunitAll?page=${page}&limit=${perpage}`);
export const GetAllSubUnit = () => Axios.get(`/subunit`);
export const AddDataSubUnit = (payload) => Axios.post('/subunit', payload);
export const EditDataSubUnit = (id, payload) => Axios.put(`/subunit/${id}`, payload);
export const DeleteDataSubUnit = id => Axios.delete(`/subunit/${id}`);
export const GetDataSubUnitByUnit = kode_unit => Axios.get(`/subunitby?kode_unit=${kode_unit}`);