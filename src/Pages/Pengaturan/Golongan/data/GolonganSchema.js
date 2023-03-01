import * as Yup from 'yup';

export const GolonganSchema = Yup.object().shape({
    nama: Yup.string().required('Nama Golongan harus diisi')
})
