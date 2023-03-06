import * as Yup from 'yup';

export const ProgramSchema = Yup.object().shape({
    kode_urusan: Yup.string().required('Kode Urusan harus diisi'),
    kode_program: Yup.string().required('Kode Program harus diisi'),
    nama_program: Yup.string().required('Nama Program harus diisi')
})
