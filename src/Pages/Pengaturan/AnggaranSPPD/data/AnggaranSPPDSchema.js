import * as Yup from 'yup';

export const AnggaranSPPDSchema = Yup.object().shape({
    kode_urusan: Yup.string().required('Urusan harus diisi'),
    kode_unit: Yup.string().required('Unit harus diisi'),
    sub_kode_unit: Yup.string().required('Sub Unit harus diisi'),
    kode_program: Yup.string().required('Program harus diisi'),
    kode_kegiatan_anggaran: Yup.string().required('Kegiatan harus diisi'),
    kode_sub_anggaran: Yup.string().required('Sub Kegiatan harus diisi'),
    sumberpen_id: Yup.string().required('Sumber Pendanaan harus diisi'),
    tahun_anggaran: Yup.string().required('Sumber Pendanaan harus diisi'),
})
