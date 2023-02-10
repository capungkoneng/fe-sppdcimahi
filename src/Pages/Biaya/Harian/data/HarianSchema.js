import * as Yup from 'yup';

export const HarianSchema = Yup.object().shape({
    provinsi: Yup.string().required("Provinsi harus di isi"),
    satuan: Yup.string().required("Satuan harus di isi"),
    diklat: Yup.number().required("Diklat harus di isi"),
    dalam_kota: Yup.number().required("Dalam kota harus di isi"),
    luar_kota: Yup.number().required("Luar Kota harus di isi"),
})
