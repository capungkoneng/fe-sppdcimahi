import * as Yup from 'yup';

export const SumberPendanaanSchema = Yup.object().shape({
    nama_sumber_pendanaan: Yup.string().required('Nama Sumber Pendanaan harus diisi'),
    kode_sub_anggaran: Yup.string().required('Kode Sub Anggaran harus diisi'),
    lokasi_kegiatan: Yup.string().required('Lokasi Kegiatan harus diisi'),
    waktu_mulai: Yup.string().required('Waktu Mulai Kegiatan harus diisi'),
    waktu_selesai: Yup.string().required('Waktu Selesai Kegiatan harus diisi'),
    kelompok_saran: Yup.string().required('Kelompok Saran harus diisi'),
})
