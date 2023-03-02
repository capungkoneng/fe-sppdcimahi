import * as Yup from 'yup';

export const SubUnitSchema = Yup.object().shape({
    kode_unit: Yup.string().required('Kode Unit harus diisi'),
    sub_kode_unit: Yup.string().required('Kode Sub Unit harus diisi'),
    sub_nama_unit: Yup.string().required('Sub Unit harus diisi')
})
