import { SectionForm, TextInput, InputSelect } from "Components";
import { Form, Formik } from "formik";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SumberPendanaanSchema } from "./data/SumberPendanaanSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataSumberPen, EditDataSumberPen } from "Services/Pengaturan";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    item = null,
    contentType="Add",
    ListSubAnggaran = []
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        nama_sumber_pendanaan: "",
        kode_sub_anggaran: "",
        lokasi_kegiatan: "",
        waktu_mulai: new Date(),
        waktu_selesai: new Date(),
        kelompok_saran: "",
    });

    useEffect(() => {
        if (item) {
            setData({
                nama_sumber_pendanaan: item.nama_sumber_pendanaan,
                kode_sub_anggaran: item.kode_sub_anggaran,
                lokasi_kegiatan: item.lokasi_kegiatan,
                waktu_mulai: item.waktu_mulai,
                waktu_selesai: item.waktu_selesai,
                kelompok_saran: item.kelompok_saran,
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataSumberPen(payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil tambah data");
            }
        } catch (error) {
            toast.error("Gagal tambah data");
            console.log(error)
        }
    }

    const editData = async (payload) => {
        try {
            const response = await EditDataSumberPen(item?.sumberpen_id,payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil edit data");
            }
        } catch (error) {
            toast.error("Gagal edit data");
            console.log(error)
        }
    }

    return (
        <Formik
            innerRef={formikRef}
            initialValues={data}
            enableReinitialize
            validationSchema={SumberPendanaanSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <SectionForm
                        column="1"
                        gap="4"
                    >
                        <InputSelect
                            id="kode_sub_anggaran"
                            name="kode_sub_anggaran"
                            withLabel
                            label="Kode Sub Anggaran"
                            placeholder="Kode Sub Anggaran"
                            value={values.kode_sub_anggaran}
                            onChange={handleChange}
                        >
                            {
                                ListSubAnggaran.map(value => {
                                    return <option key={value.subkeg_id} value={value.kode_sub_anggaran}>{value.kode_sub_anggaran} - {value.nama_sub_anggaran}</option>
                            })
                            }
                        </InputSelect>
                        {touched.kode_sub_anggaran && errors.kode_sub_anggaran && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_sub_anggaran
                        }</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextInput 
                            id="nama_sumber_pendanaan"
                            name="nama_sumber_pendanaan"
                            withLabel
                            label="Nama Sumber Pendanaan"
                            placeholder="Nama Sumber Pendanaan"
                            value={values.nama_sumber_pendanaan}
                            onChange={handleChange}
                        />
                        {touched.nama_sumber_pendanaan && errors.nama_sumber_pendanaan && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama_sumber_pendanaan}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextInput 
                            id="lokasi_kegiatan"
                            name="lokasi_kegiatan"
                            withLabel
                            label="Lokasi Kegiatan"
                            placeholder="Lokasi Kegiatan"
                            value={values.lokasi_kegiatan}
                            onChange={handleChange}
                        />
                        {touched.lokasi_kegiatan && errors.lokasi_kegiatan && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.lokasi_kegiatan}</span>}
                    </SectionForm>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="relative">
                            <label className="text-gray-700">
                                Waktu Mulai
                            </label>
                            <DatePicker
                                selected={new Date(values.waktu_mulai)}
                                onChange={(value) => setFieldValue('waktu_mulai', value)}
                                className="base-input px-10 mt-2"
                                dateFormat="dd-MM-yyyy"
                            />
                            <div className="absolute top-11 left-3">
                                <svg className="w-[16px] h-[16px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                        </div>
                            {touched.waktu_mulai && errors.waktu_mulai && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.waktu_mulai}</span>}

                        <div className="relative">
                            <label className="text-gray-700">
                                Waktu Selesai Selesai
                            </label>
                            <DatePicker
                                selected={new Date(values.waktu_selesai)}
                                onChange={(value) => setFieldValue('waktu_selesai', value)}
                                className="base-input px-10 mt-2"
                                dateFormat="dd-MM-yyyy"
                            />
                            <div className="absolute top-11 left-3">
                                <svg className="w-[16px] h-[16px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                        </div>
                            {touched.waktu_selesai && errors.waktu_selesai && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.waktu_selesai}</span>}
                    </div>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextInput 
                            id="kelompok_saran"
                            name="kelompok_saran"
                            type="number"
                            withLabel
                            label="Kelompok Saran"
                            placeholder="Kelompok Saran"
                            value={values.kelompok_saran}
                            onChange={handleChange}
                        />
                        {touched.kelompok_saran && errors.kelompok_saran && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kelompok_saran}</span>}
                    </SectionForm>

                        <div className="mt-8 flex justify-end">
                            <div className="flex gap-2 items-center">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-full border border-transparent bg-[#3F7459] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                >
                                    {contentType === 'Add' ? 'Tambah Sumber Pendanaan' : 'Edit Sumber Pendanaan' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}