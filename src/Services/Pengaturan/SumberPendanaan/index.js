import { Axios } from "Configs/Axios";

export const GetAllPageSumberPen = ({page = 1, perpage = 10}) => Axios.get(`/sumberpenAll?page=${page}&limit=${perpage}`);
export const GetAllSumberPen = () => Axios.get(`/sumberpen`);
export const AddDataSumberPen = (payload) => Axios.post('/sumberpen', payload);
export const EditDataSumberPen = (id, payload) => Axios.put(`/sumberpen/${id}`, payload);
export const DeleteDataSumberPen = id => Axios.delete(`/sumberpen/${id}`);
export const GetDataSumberPenBySubKegiatan = kode => Axios.get(`/sumberpenby?kode_sub_anggaran=${kode}`);