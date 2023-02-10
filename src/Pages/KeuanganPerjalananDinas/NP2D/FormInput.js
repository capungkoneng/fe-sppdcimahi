import {
  Button,
  InputSelect,
  SectionForm,
  TextInput,
  WrapperForm,
} from "Components";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { AddDataNp2d, EditDataNp2d } from "Services/KeuanganPerjalananDinas/Np2d";
import { GetListYear } from "utils";
import { Np2dSchema } from "./data/Np2dSchema";

export const FormInput = ({
  onCallback = () => {},
  contentType = "Add",
  item = null,
}) => {
  const [data, setData] = useState({
    no_np2d: "",
    no_kwt: "",
    nama_penerima: "",
    nik_penerima: "",
    tgl: new Date(),
    tgl_kwt: new Date(),
    jumlah: "",
    nama_bank: "",
    nama_rek: "",
    no_rek: "",
    tahun_anggaran: "",
    kegiatan: "",
    sub_kegiatan: "",
    uraian_pembayaran: "",
  });
  useEffect(() => {
    if (item) {
      setData({
        no_np2d: item.no_np2d,
        nama_penerima: item.nama_penerima,
        no_kwt: item.no_kwt,
        tgl: new Date(item.tgl),
        tgl_kwt: new Date(item.tgl_kwt),
        tahun_anggaran: item.tahun_anggaran,
        jumlah: item.jumlah,
        nama_bank: item.nama_bank,
        nama_rek: item.nama_rek,
        no_rek: item.no_rek,
        kegiatan: item.kegiatan,
        sub_kegiatan: item.sub_kegiatan,
        uraian_pembayaran: item.uraian_pembayaran,
      });
    }
  }, [item]);

  const addDataK = async (payload) => {
    try {
      const response = await AddDataNp2d(payload);
      if (response.data) {
        onCallback({ success: true });
        toast.success("Berhasil tambah data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (payload) => {
    try {
      const response = await EditDataNp2d(item?.id, payload);
      if (response.data) {
        onCallback({ success: true });
        toast.success("Berhasil edit data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WrapperForm
      title={`${contentType === "Edit" ? "Edit" : "Tambah"} Data NP2D`}
    >
      <Formik
        initialValues={data}
        enableReinitialize
        validationSchema={Np2dSchema}
        onSubmit={(value) =>
          contentType === addDataK(value)
        }
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form>
            <TextInput
              id="no_np2d"
              name="no_np2d"
              withLabel
              label="Nomor NP2D"
              placeholder="2023-NP2D-1001"
              value={values.no_np2d}
              onChange={handleChange}
            />
            {touched.no_np2d && errors.no_np2d && (
              <span className="mt-2 text-xs text-red-500 font-semibold">
                {errors.no_np2d}
              </span>
            )}

            <div className="mt-4">
              <TextInput
                id="no_kwt"
                name="no_kwt"
                withLabel
                label="No KWT"
                placeholder="2022-KWT-0001"
                value={values.no_kwt}
                onChange={handleChange}
              />
              {touched.no_kwt && errors.no_kwt && (
                <span className="mt-2 text-xs text-red-500 font-semibold">
                  {errors.no_kwt}
                </span>
              )}
            </div>

            <div className="mt-4">
              <TextInput
                id="nama_penerima"
                name="nama_penerima"
                withLabel
                label="Nama Penerima"
                placeholder="Ujang"
                value={values.nama_penerima}
                onChange={handleChange}
              />
              {touched.nama_penerima && errors.nama_penerima && (
                <span className="mt-2 text-xs text-red-500 font-semibold">
                  {errors.nama_penerima}
                </span>
              )}
            </div>

            <div className="mt-4">
              <SectionForm column="4" gap="4" className="mt-4">
                <div>
                  <div className="relative">
                    <label className="text-gray-700">Tgl</label>
                    <DatePicker
                      selected={new Date(values.tgl)}
                      onChange={(value) => setFieldValue("tgl", value)}
                      className="base-input px-10 mt-2"
                      dateFormat="dd-MM-yyyy"
                    />

                    <div className="absolute top-11 left-3">
                      <svg
                        className="w-[16px] h-[16px] text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  {touched.tgl && errors.tgl && (
                    <span className="mt-2 text-xs text-red-500 font-semibold">
                      {errors.tgl}
                    </span>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <label className="text-gray-700">Tgl Kwt</label>
                    <DatePicker
                      selected={new Date(values.tgl_kwt)}
                      onChange={(value) => setFieldValue("tgl_kwt", value)}
                      className="base-input px-10 mt-2"
                      dateFormat="dd-MM-yyyy"
                    />

                    <div className="absolute top-11 left-3">
                      <svg
                        className="w-[16px] h-[16px] text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  {touched.tgl_kwt && errors.tgl_kwt && (
                    <span className="mt-2 text-xs text-red-500 font-semibold">
                      {errors.tgl_kwt}
                    </span>
                  )}
                </div>
                <div>
                  <InputSelect
                    name="tahun_anggaran"
                    id="tahun_anggaran"
                    withLabel
                    label="Tahun Anggaran"
                    placeholder="Tahun Anggaran"
                    value={values.tahun_anggaran}
                    onChange={handleChange}
                  >
                    {GetListYear().map((value) => {
                      return (
                        <option key={value.id} value={value.name}>
                          {value.name}
                        </option>
                      );
                    })}
                  </InputSelect>
                  {touched.tahun_anggaran && errors.tahun_anggaran && (
                    <span className="mt-2 text-xs text-red-500 font-semibold">
                      {errors.tahun_anggaran}
                    </span>
                  )}
                </div>
              </SectionForm>

              <div className="mt-4">
                <TextInput
                  id="nik_penerima"
                  name="nik_penerima"
                  withLabel
                  label="Nik Penerima"
                  placeholder="32123000123"
                  value={values.nik_penerima}
                  onChange={handleChange}
                />
                {touched.nik_penerima && errors.nik_penerima && (
                  <span className="mt-2 text-xs text-red-500 font-semibold">
                    {errors.nik_penerima}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <TextInput
                  id="jumlah"
                  name="jumlah"
                  withLabel
                  label="Jumlah"
                  placeholder="50000"
                  value={values.jumlah}
                  onChange={handleChange}
                />
                {touched.jumlah && errors.jumlah && (
                  <span className="mt-2 text-xs text-red-500 font-semibold">
                    {errors.jumlah}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <TextInput
                  id="nama_bank"
                  name="nama_bank"
                  withLabel
                  label="Nama Bank"
                  placeholder="Mandiri"
                  value={values.nama_bank}
                  onChange={handleChange}
                />
                {touched.nama_bank && errors.nama_bank && (
                  <span className="mt-2 text-xs text-red-500 font-semibold">
                    {errors.nama_bank}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <TextInput
                  id="nama_rek"
                  name="nama_rek"
                  withLabel
                  label="Nama Rek"
                  placeholder="Ujang"
                  value={values.nama_rek}
                  onChange={handleChange}
                />
                {touched.nama_rek && errors.nama_rek && (
                  <span className="mt-2 text-xs text-red-500 font-semibold">
                    {errors.nama_rek}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <TextInput
                  id="no_rek"
                  name="no_rek"
                  withLabel
                  label="No Rek"
                  placeholder="65281223"
                  value={values.no_rek}
                  onChange={handleChange}
                />
                {touched.no_rek && errors.no_rek && (
                  <span className="mt-2 text-xs text-red-500 font-semibold">
                    {errors.no_rek}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <TextInput
                  id="kegiatan"
                  name="kegiatan"
                  withLabel
                  label="kegiatan"
                  placeholder="kegiatan"
                  value={values.kegiatan}
                  onChange={handleChange}
                />
                {touched.kegiatan && errors.kegiatan && (
                  <span className="mt-2 text-xs text-red-500 font-semibold">
                    {errors.kegiatan}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <TextInput
                  id="sub_kegiatan"
                  name="sub_kegiatan"
                  withLabel
                  label="Sub Kegiatan"
                  placeholder="Sub Kegiatan"
                  value={values.sub_kegiatan}
                  onChange={handleChange}
                />
                {touched.sub_kegiatan && errors.sub_kegiatan && (
                  <span className="mt-2 text-xs text-red-500 font-semibold">
                    {errors.sub_kegiatan}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <TextInput
                  id="uraian_pembayaran"
                  name="uraian_pembayaran"
                  withLabel
                  label="Uraian Pembayaran"
                  placeholder="Uraian Pembayaran"
                  value={values.uraian_pembayaran}
                  onChange={handleChange}
                />
                {touched.uraian_pembayaran && errors.uraian_pembayaran && (
                  <span className="mt-2 text-xs text-red-500 font-semibold">
                    {errors.uraian_pembayaran}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-10 flex pb-10 md:pb-0 lg:pb-0 justify-center md:justify-end lg:justify-end">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full md:w-60 lg:w-60"
                backgroundColor="bg-orange-500"
              >
                Simpan
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </WrapperForm>
  );
};
