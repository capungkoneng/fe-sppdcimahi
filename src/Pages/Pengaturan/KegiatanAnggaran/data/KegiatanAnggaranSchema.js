import * as Yup from 'yup';

export const KegiatanAnggaranSchema = Yup.object().shape({
    kode_program: Yup.string().required('Kode Program harus diisi'),
    kode_kegiatan_anggaran: Yup.string().required('Kode Kegiatan Anggaran harus diisi'),
    nama_kegiatan_anggaran: Yup.string().required('Nama Kegiatan Anggaran harus diisi')
})
