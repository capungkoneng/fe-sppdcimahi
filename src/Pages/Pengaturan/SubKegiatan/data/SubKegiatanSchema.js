import * as Yup from 'yup';

export const SubKegiatanSchema = Yup.object().shape({
    kode_sub_anggaran: Yup.string().required('Kode Sub Kegiatan harus diisi'),
    kode_kegiatan_anggaran: Yup.string().required('Kode Kegiatan Anggaran harus diisi'),
    nama_sub_anggaran: Yup.string().required('Nama Sub Kegiatan harus diisi')
})
