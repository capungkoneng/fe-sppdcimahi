import * as Yup from 'yup';

export const EmployeSchema = Yup.object().shape({
    nama: Yup.string().required("Nama harus di isi"),
    nip: Yup.string().required("Nip harus di isi"),
    phone: Yup.string().required("Kontak harus di isi"),
    nama_bank: Yup.string().required("Nama Bank harus di isi"),
    no_rek: Yup.string().required("No Rek harus di isi"),
    nama_rek: Yup.string().required("Nama Rek harus di isi")
})
