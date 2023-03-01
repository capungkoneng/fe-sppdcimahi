import * as Yup from 'yup';

export const JabatanSchema = Yup.object().shape({
    nama: Yup.string().required('Nama Jabatan harus diisi')
})
