import * as Yup from 'yup';

export const BerkendaraSchema = Yup.object().shape({
    nama: Yup.string().required('Nama Kendaraan harus diisi')
})
