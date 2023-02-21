import { Axios } from "Configs/Axios";

export const GetAllProvince = () => Axios.get('/provinsi');
export const GetAllCity = () => Axios.get('/kota');
export const GetCityByProvince = (provinsi) => Axios.get(`/kota?search=${provinsi}`);
export const GetAllBerkendara = () => Axios.get('/berkendara');