import * as Yup from 'yup';

export const RekeningSchema = Yup.object().shape({
    kode: Yup.string().required('Kode Rekening harus diisi'),
    atas_nama: Yup.string().required('Atas nama harus diisi'),
    nama_bank: Yup.string().required('nama bank diisi'),
    total: Yup.string().required('total harus diisi')
})
