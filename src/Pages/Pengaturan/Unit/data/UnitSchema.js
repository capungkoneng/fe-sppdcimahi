import * as Yup from 'yup';

export const UnitSchema = Yup.object().shape({
    kode_urusan: Yup.string().required('Kode Urusan harus diisi'),
    kode_unit: Yup.string().required('Kode Unit harus diisi'),
    nama_unit: Yup.string().required('Unit harus diisi')
})
