import { InputSelect, SectionForm, TextArea, TextInput, InputFile, MultipleSelect } from "Components"
import { Form, Formik } from "formik";
import { useEffect, useState, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from "react-toastify";
import { AddKegiatan, EditKegiatan } from "Services/Kegiatan";
import { GetListYear } from "utils";
import { KegiatanSchema } from "./data/KegiatanSchema";
import { GetCityByProvince } from "Services";

export const FormInput = ({
    onCallback = () => {},
    listProvince = [],
    // listCity = [],
    listKendaraan = [],
    listJabatan = [],
    contentType = 'Add',
    item = null
}) => {
    const formikRef = useRef();
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
    const [listCity, setListCity] = useState([])
    const [jabatan, setJabatan] = useState([])
    const [file, setFile] = useState(null)
    
    useEffect(() => {
        if (item) {
            setData({
                keperluan: item.keperluan,
                no_surat: item.no_surat,
                lokasi: item.lokasi,
                tgl_berangkat: new Date(item.tgl_berangkat),
                tgl_mulai: new Date(item.tgl_mulai),
                tgl_selesai: new Date(item.tgl_selesai),
                tujuan_provinsi: item.tujuan_provinsi,
                tahun_anggaran: item.tahun_anggaran,
                keterangan: item.keterangan,
                kota: item.kota,
                berangkat: item.berangkat
            });
            setJabatan(item.lsjabatan)
        }
    }, [item]);
        
    const handleOnChanges = (event) => {
        if(event.target.name === 'tujuan_provinsi' ){
            fetchCity(event.target.value)
        }
        if(event.target.name === 'file'){
            setFile(event.target.files[0])
        }
    }

    const addData = async (payload) => {
        const bodyData = new FormData();
        const rekomendasi = []
        jabatan.map( (data) => {
            let rekomJabatan = {
                nama: data.nama
            }
            return rekomendasi.push(rekomJabatan)
        })
        bodyData.append('upload', file);
        bodyData.append('keperluan', payload.keperluan);
        bodyData.append('no_surat', payload.no_surat);
        bodyData.append('lokasi', payload.lokasi);
        bodyData.append('tgl_berangkat', payload.tgl_berangkat);
        bodyData.append('tgl_mulai', payload.tgl_mulai);
        bodyData.append('tgl_selesai', payload.tgl_selesai);
        bodyData.append('tujuan_provinsi', payload.tujuan_provinsi);
        bodyData.append('kota', payload.kota);
        bodyData.append('tahun_anggaran', payload.tahun_anggaran);
        bodyData.append('keterangan', payload.keterangan);
        bodyData.append('berangkat', payload.berangkat);
        bodyData.append('lsjabatan', JSON.stringify(rekomendasi));
        bodyData.append('status_kegiatan', '0');
        try {
            const response = await AddKegiatan(bodyData);
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

    const fetchCity = async (provinsi) => {
        try {
            const response = await GetCityByProvince(provinsi);
            if (response.data.msg) {
                let dataCity = response.data.msg.sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
                setListCity(dataCity);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onSelect = (value) => {
        setJabatan(value)
    }

    const onRemove = (value) => {
        setJabatan(value)
    }

    return (
        // <WrapperForm
        //     title={`${contentType === 'Edit' ? 'Edit' : 'Tambah'} Data Kegiatan`}
        // >
        <Formik
            innerRef={formikRef}
            initialValues={data}
            enableReinitialize
            validationSchema={KegiatanSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form
                    onChange={handleOnChanges}
                >
                    <SectionForm
                        column="3"
                        gap="4"
                    >
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

                        <InputSelect 
                            id="tujuan_provinsi"
                            name="tujuan_provinsi"
                            withLabel
                            label="Tujuan Provinsi"
                            value={values.tujuan_provinsi}
                            onChange={handleChange}
                            onSelect={fetchCity}
                        >
                        {
                            listProvince.map((value, index) => {
                                return <option key={index} value={value.name}>{value.name}</option>
                            })
                        }
                        </InputSelect>
                        {touched.tujuan_provinsi && errors.tujuan_provinsi && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.tujuan_provinsi}</span>}
                                
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
                                return <option key={index} value={value.name}>{value.name}</option>
                            })
                        }
                        </InputSelect>
                        {touched.kota && errors.kota && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kota}</span>}

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

                        <InputSelect 
                            id="berangkat"
                            name="berangkat"
                            withLabel
                            label="Kendaraan"
                            value={values.berangkat}
                            onChange={handleChange}
                        >
                        {
                            listKendaraan.map((value, index) => {
                                return <option key={index} value={value.nama}>{value.nama}</option>
                            })
                        }
                        </InputSelect>
                        {touched.berangkat && errors.berangkat && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.berangkat}</span>}

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
                                <svg className="w-[16px] h-[16px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        {touched.tgl_berangkat && errors.tgl_berangkat && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.tgl_berangkat}</span>}

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
                                <svg className="w-[16px] h-[16px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                            </div>
                            {touched.tgl_mulai && errors.tgl_mulai && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.tgl_mulai}</span>}

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
                                    <svg className="w-[16px] h-[16px] text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                            </div>
                            {touched.tgl_selesai && errors.tgl_selesai && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.tgl_selesai}</span>}

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

                    </SectionForm>
                    <SectionForm
                        column="2"
                        gap="4"
                        className="mt-4"
                    >
                        <MultipleSelect
                            label="Rekomendasi Peserta Jabatan"
                            listdata={listJabatan}
                            placeholder="Rekomendasi peserta jabatan"
                            selectedValue={jabatan}
                            onSelect={onSelect}
                            onRemove={onRemove}
                        />
                        <InputFile
                            label="Upload File"
                            name="file"
                            onChange={handleChange}
                        />
                    </SectionForm>

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

                        <div className="mt-8 flex justify-end">
                            <div className="flex gap-2 items-center">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-full border border-transparent bg-[#3F7459] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                >
                                    {contentType === 'Add' ? 'Tambah Kegiatan' : 'Edit Kegiatan' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>
        // </WrapperForm>
    )
}