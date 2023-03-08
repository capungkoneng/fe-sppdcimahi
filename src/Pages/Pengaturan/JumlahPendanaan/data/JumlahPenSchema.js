import * as Yup from 'yup';

export const JumlahPenSchema = Yup.object().shape({
    nama: Yup.string().required('Nama Pendapatan harus diisi'),
    tahun: Yup.string().required('Tahun harus diisi'),
    jumlah: Yup.string().required('Jumlah harus diisi'),
    sumberpen_id: Yup.string().required('Sumber Pendanaan harus diisi')
})
