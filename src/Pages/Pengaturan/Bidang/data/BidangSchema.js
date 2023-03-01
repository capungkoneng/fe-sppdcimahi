import * as Yup from 'yup';

export const BidangSchema = Yup.object().shape({
    nama: Yup.string().required('Nama Bidang harus diisi')
})
