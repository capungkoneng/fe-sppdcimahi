import * as Yup from 'yup';

export const SpdSchema = Yup.object().shape({
    no_spd: Yup.string().required('No SPD harus diisi'),
    no_spt: Yup.string().required('No SPT harus diisi')
})
