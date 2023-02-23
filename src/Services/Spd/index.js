import { Axios } from "Configs/Axios";

export const GetAllSpd = ({page = 1, perpage = 10}) => Axios.get(`/spd?page=${page}&limit=${perpage}`);
export const GetSpdById = id => Axios.get(`/spd/${id}`);
export const AddSpd = payload => Axios.post('/spd', payload);
export const EditSpdById = (id, payload) => Axios.put(`/spd/${id}`, payload);
export const DeleteSpd = (id) => Axios.delete(`/spd/${id}`);