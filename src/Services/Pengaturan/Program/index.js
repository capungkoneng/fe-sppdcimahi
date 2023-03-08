import { Axios } from "Configs/Axios";

export const GetAllPageProgram = ({page = 1, perpage = 10}) => Axios.get(`/programAll?page=${page}&limit=${perpage}`);
export const GetAllProgram = () => Axios.get(`/program`);
export const AddDataProgram = (payload) => Axios.post('/program', payload);
export const EditDataProgram = (id, payload) => Axios.put(`/program/${id}`, payload);
export const DeleteDataProgram = id => Axios.delete(`/program/${id}`);
export const GetDataProgramByUnit = kode_urusan => Axios.get(`/programby?kode_urusan=${kode_urusan}`);