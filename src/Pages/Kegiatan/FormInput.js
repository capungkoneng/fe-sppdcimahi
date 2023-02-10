import { Button, InputSelect, SectionForm, TextArea, TextInput, WrapperForm } from "Components"
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from "react-toastify";
import { AddKegiatan, EditKegiatan } from "Services/Kegiatan";
import { GetListYear } from "utils";
import { KegiatanSchema } from "./data/KegiatanSchema";

export const FormInput = ({
    onCallback = () => {},
    listProvince = [],
    listCity = [],
    listKendaraan = [],
    contentType = 'Add',
    item = null
}) => {
    const [data, setData] = useState({
        keperluan: "",
        no_surat: "",
        lokasi: "",
        tgl_berangkat: new Date(),
        tgl_mulai: new Date(),
        tgl_selesai: new Date(),
        tujuan_provinsi: "",
        kota: "",
        tahun_anggaran: "",
        keterangan: "",
        rekomendasi: "",
        upload: "",
    });
    useEffect(() => {
        if (item) {
            setData({
                keperluan: item.keperluan,
                no_surat: item.no_surat,
                lokasi: item.lokasi,
                tgl_berangkat: new Date(item.tgl_berangkat),
                tgl_mulai: new Date(item.tgl_mulai),
                tgl_selesai: new Date(item.tgl_selesai),
                tahun_anggaran: item.tahun_anggaran,
                keterangan: item.keterangan,
                rekomendasi: item.rekomendasi,
                upload: item.upload,
                tujuan_provinsi: item.tujuan_provinsi,
                kota: item.kota,
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddKegiatan(payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil tambah data");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editData = async (payload) => {
        try {
            const response = await EditKegiatan(item?.id, payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil edit data");
            } 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <WrapperForm
            title={`${contentType === 'Edit' ? 'Edit' : 'Tambah'} Data Kegiatan`}
        >

            <Formik
                initialValues={data}
                enableReinitialize
                validationSchema={KegiatanSchema}
                onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
            >
                {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                    <Form>
                        <TextInput 
                            id="no_surat"
                            name="no_surat"
                            withLabel
                            label="Nomor Surat"
                            placeholder="Nomor Surat"
                            value={values.no_surat}
                            onChange={handleChange}
                        />
                        {touched.no_surat && errors.no_surat && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.no_surat}</span>}

                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <InputSelect 
                                    id="tujuan_provinsi"
                                    name="tujuan_provinsi"
                                    withLabel
                                    label="Tujuan Provinsi"
                                    value={values.tujuan_provinsi}
                                    onChange={handleChange}
                                >
                                    {
                                        listProvince.map((value, index) => {
                                            return <option key={index} value={value.name}>{value.name}</option>
                                        })
                                    }
                                </InputSelect>
                                {touched.tujuan_provinsi && errors.tujuan_provinsi && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.tujuan_provinsi}</span>}
                            </div>

                            <div>
                                <InputSelect 
                                    id="kota"
                                    name="kota"
                                    withLabel
                                    label="Kota"
                                    value={values.kota}
                                    onChange={handleChange}
                                >
                                    {
                                        listCity.map((value, index) => {
                                            return <option key={index} value={value.nama}>{value.nama}</option>
                                        })
                                    }
                                </InputSelect>
                                {touched.kota && errors.kota && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kota}</span>}
                            </div>

                            <div>
                                <TextInput 
                                    id="lokasi"
                                    name="lokasi"
                                    withLabel
                                    label="Lokasi"
                                    placeholder="Lokasi"
                                    value={values.lokasi}
                                    onChange={handleChange}
                                />
                                {touched.lokasi && errors.lokasi && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.lokasi}</span>}
                            </div>
                        </div>

                        <div className="mt-4">
                            <TextArea
                                id="keperluan"
                                name="keperluan"
                                withLabel
                                label="Keperluan"
                                placeholder="Keperluan"
                                value={values.keperluan}
                                onChange={handleChange}
                            />
                            {touched.keperluan && errors.keperluan && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.keperluan}</span>}
                        </div>

                        <div className="mt-8">
                            <InputSelect 
                                id="berkendara"
                                name="berkendara"
                                withLabel
                                label="Berkendara"
                                value={values.berkendara}
                                onChange={handleChange}
                            >
                                {
                                    listKendaraan.map((value, index) => {
                                        return <option key={index} value={value.nama}>{value.nama}</option>
                                    })
                                }
                            </InputSelect>
                            {touched.berkendara && errors.berkendara && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.berkendara}</span>}
                            
                            <SectionForm
                                column="4"
                                gap="4"
                                className="mt-4"
                            >
                                <div>
                                    <div className="relative">
                                        <label className="text-gray-700">
                                            Tgl Berangkat
                                        </label>
                                        <DatePicker
                                            selected={new Date(values.tgl_berangkat)}
                                            onChange={(value) => setFieldValue('tgl_berangkat', value)}
                                            className="base-input px-10 mt-2"
                                            dateFormat="dd-MM-yyyy"
                                        />

                                        <div className="absolute top-11 left-3">
                                            <svg className="w-[16px] h-[16px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    </div>
                                    {touched.tgl_berangkat && errors.tgl_berangkat && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.tgl_berangkat}</span>}
                                </div>

                                <div>
                                    <div className="relative">
                                        <label className="text-gray-700">
                                            Tgl Mulai
                                        </label>
                                        <DatePicker
                                            selected={new Date(values.tgl_mulai)}
                                            onChange={(value) => setFieldValue('tgl_mulai', value)}
                                            className="base-input px-10 mt-2"
                                            dateFormat="dd-MM-yyyy"
                                        />

                                        <div className="absolute top-11 left-3">
                                            <svg className="w-[16px] h-[16px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    </div>
                                    {touched.tgl_mulai && errors.tgl_mulai && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.tgl_mulai}</span>}
                                </div>

                                <div>
                                    <div className="relative">
                                        <label className="text-gray-700">
                                            Tgl Selesai
                                        </label>
                                        <DatePicker
                                            selected={new Date(values.tgl_selesai)}
                                            onChange={(value) => setFieldValue('tgl_selesai', value)}
                                            className="base-input px-10 mt-2"
                                            dateFormat="dd-MM-yyyy"
                                        />

                                        <div className="absolute top-11 left-3">
                                            <svg className="w-[16px] h-[16px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    </div>
                                    {touched.tgl_selesai && errors.tgl_selesai && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.tgl_selesai}</span>}
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
                                        {
                                            GetListYear().map(value => {
                                                return <option key={value.id} value={value.name}>{value.name}</option>
                                            })
                                        }
                                    </InputSelect>
                                    {touched.tahun_anggaran && errors.tahun_anggaran && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.tahun_anggaran}</span>}
                                </div>
                            </SectionForm>

                            <div className="mt-4">
                                <TextArea 
                                    id="keterangan"
                                    name="keterangan"
                                    withLabel
                                    label="Keterangan"
                                    placeholder="Keterangan"
                                    value={values.keterangan}
                                    onChange={handleChange}
                                />
                                {touched.keterangan && errors.keterangan && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.keterangan}</span>}
                            </div>
                        </div>

                        <div className="mt-10 flex pb-10 md:pb-0 lg:pb-0 justify-center md:justify-end lg:justify-end">
                            <Button type="submit" onClick={handleSubmit} className="w-full md:w-60 lg:w-60" backgroundColor="bg-orange-500">Simpan</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </WrapperForm>
    )
}