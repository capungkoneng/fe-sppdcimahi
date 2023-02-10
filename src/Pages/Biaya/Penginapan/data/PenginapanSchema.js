import * as Yup from 'yup';

export const PenginapanSchema = Yup.object().shape({
    provinsi: Yup.string().required("Provinsi harus di isi"),
    satuan: Yup.string().required("Satuan harus di isi"),
    g2eselon1: Yup.number().required("Harus di isi"),
    g3eselon3: Yup.number().required("Harus di isi"),
    g4eselon4: Yup.number().required("Harus di isi"),
    peselon1: Yup.number().required("Harus di isi"),
    peselon2: Yup.number().required("Harus di isi"),
})
