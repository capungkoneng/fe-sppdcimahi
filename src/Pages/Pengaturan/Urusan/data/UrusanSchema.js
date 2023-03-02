import * as Yup from 'yup';

export const UrusanSchema = Yup.object().shape({
    kode_urusan: Yup.string().required('Kode Urusan harus diisi'),
    nama_urusan: Yup.string().required('Urusan harus diisi')
})
