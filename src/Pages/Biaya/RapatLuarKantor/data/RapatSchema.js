import * as Yup from 'yup';

export const RapatSchema = Yup.object().shape({
    provinsi: Yup.string().required("Provinsi harus di isi"),
    satuan: Yup.string().required("Satuan harus di isi"),
    fullboard_luarkota: Yup.number().required("Full Board Luar Kota harus di isi"),
    fullboard_dalemkota: Yup.number().required("Full Board Dalam Kota harus di isi"),
    fullday: Yup.number().required("Full Day Kota harus di isi"),
})
