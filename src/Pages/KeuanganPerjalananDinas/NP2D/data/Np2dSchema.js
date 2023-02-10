import * as Yup from "yup";

export const Np2dSchema = Yup.object().shape({
  no_np2d: Yup.string().required("no_np2d harus di isi"),
  nama_penerima: Yup.string().required("nama_penerima harus di isi"),
  nik_penerima: Yup.string().required("nik_penerima harus di isi"),
  jumlah: Yup.string().required("jumlah kota harus di isi"),
  no_kwt: Yup.string().required("no_kwt Kota harus di isi"),
  nama_bank: Yup.string().required("nama_bank Kota harus di isi"),
  nama_rek: Yup.string().required("nama_rek Kota harus di isi"),
  no_rek: Yup.number().required("no_rek Kota harus di isi"),
  tujuan: Yup.string().required("tujuan Kota harus di isi"),
  kegiatan: Yup.string().required("kegiatan Kota harus di isi"),
  sub_kegiatan: Yup.string().required("sub_kegiatan Kota harus di isi"),
  kode_rek_dpa: Yup.string().required("kode_rek_dpa Kota harus di isi"),
  tahun_anggaran: Yup.string().required("tahun_anggaran Kota harus di isi"),
  uraian_pembayaran: Yup.string().required(
    "uraian_pembayaran Kota harus di isi"
  ),
});
