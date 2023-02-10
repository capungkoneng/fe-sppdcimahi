import { Axios } from "Configs/Axios";

export const GetAllPegawai = ({page = 1, perpage = 10}) => Axios.get(`/pegawai?page=${page}&limit=${perpage}`);
export const AddPegawai = (payload) => Axios.post('/pegawai', payload);
export const GetAllJabatan = () => Axios.get('/jabatan');
export const GetAllPangkat = () => Axios.get('/pangkat');
export const GetAllGolongan = () => Axios.get('/golongan');
export const GetPegawaiById = (id) => Axios.get(`/pegawai/${id}`);
export const EditPegawaiById = (id, payload) => Axios.put(`/pegawai/${id}`, payload);
export const DeletePegawai = (id) => Axios.delete(`/pegawai/${id}`);