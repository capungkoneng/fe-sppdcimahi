import { Axios } from "Configs/Axios";

export const GetAllPageAnggaran = ({page = 1, perpage = 10}) => Axios.get(`/angurAll?page=${page}&limit=${perpage}`);
export const AddDataAnggaran = (payload) => Axios.post('/angur', payload);
