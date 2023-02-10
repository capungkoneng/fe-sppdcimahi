import * as Yup from 'yup';

export const KegiatanSchema = Yup.object().shape({
    keperluan: Yup.string().required('Keperluan harus diisi'),
    no_surat: Yup.string().required('No Surat harus diisi'),
    lokasi: Yup.string().required('Lokasi harus diisi'),
    tgl_berangkat: Yup.string().required('Tgl Berangkat harus diisi'),
    tgl_mulai: Yup.string().required('Tgl Mulai harus diisi'),
    tgl_selesai: Yup.string().required('Tgl Selesai harus diisi'),
    tujuan_provinsi: Yup.string().required('Tujuan Provinsi harus diisi'),
    kota: Yup.string().required('Kota harus diisi'),
    tahun_anggaran: Yup.string().required('Tahun Anggaran harus diisi'),
    keterangan: Yup.string().required('Keterangan harus diisi'),
    // rekomendasi: Yup.string().required('Rekomendasi harus diisi'),
})
