import * as Yup from 'yup';

export const SptSchema = Yup.object().shape({
    no_spt: Yup.string().required('No Spt harus diisi'),
    kegiatan_id: Yup.string().required('No Dasar Spt harus diisi')
})
