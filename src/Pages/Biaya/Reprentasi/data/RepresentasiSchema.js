import * as Yup from 'yup';

export const RepresentasiSchema = Yup.object().shape({
    uraian: Yup.string().required("Provinsi harus di isi"),
    satuan: Yup.string().required("Satuan harus di isi"),
    dalam_kota: Yup.number().required("Dalam kota harus di isi"),
    luar_kota: Yup.number().required("Luar Kota harus di isi"),
})
