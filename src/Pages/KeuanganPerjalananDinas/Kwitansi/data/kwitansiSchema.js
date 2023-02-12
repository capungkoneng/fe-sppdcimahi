import * as Yup from 'yup';

export const KwitansiSchema = Yup.object().shape({
    no_spd: Yup.string().required("No spd harus di isi"),
    no_spt: Yup.string().required("No spt harus di isi"),
    nik: Yup.string().required("nik harus di isi"),
    nama: Yup.string().required("Nama harus di isi"),
    tgl: Yup.string().required("Tanggal harus di isi"),
    no_kwt: Yup.string().required("No kwitansi harus di isi"),
    tgl_berangkat: Yup.string().required("Tanggal Berangkat harus di isi"),
    tgl_mulai: Yup.string().required("Tanggal Mulai harus di isi"),
    tgl_pulang: Yup.string().required("Tanggal Pulang harus di isi"),
    tujuan: Yup.string().required("Tujuan harus di isi"),
    kegiatan: Yup.string().required("Kegiatan harus di isi"),
    sub_kegiatan: Yup.string().required("Sub Kegiatan harus di isi"),
    kode_rek: Yup.string().required("Kode Rek harus di isi"),
    bidang: Yup.string().required("Bidang harus di isi"),
})
