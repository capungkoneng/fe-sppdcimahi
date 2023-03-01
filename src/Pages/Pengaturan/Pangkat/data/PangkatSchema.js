import * as Yup from 'yup';

export const PangkatSchema = Yup.object().shape({
    nama: Yup.string().required('Nama Pangkat harus diisi')
})
