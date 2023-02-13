import {
    Button,
    Table, 
    TableContent,
    SectionForm,
    TextInput,
    InputSelect,
    WrapperForm,
} from "Components";
import { useEffect, useState } from "react"
import { Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddDataKwitansi, EditDataKwitansi } from "Services";
import { toast } from "react-toastify";
import { KwitansiSchema } from "./data/kwitansiSchema";

export const FormInput = ({
    onCallback = () => {},
    contentType = "Add",
    item = null,
}) => {
    const [data, setData] = useState({
        no_spd: "",
        no_spt: "",
        nik: "",
        nama: "",
        tgl: new Date(),
        no_kwt: "",
        tgl_berangkat: new Date(),
        tgl_mulai: new Date(),
        tgl_pulang: new Date(),
        tujuan: "",
        kegiatan: "",
        sub_kegiatan: "",
        kode_rek: "",
        bidang: "",
    });

    const [initialKwitansi, setKwitansi] = useState({
        vkwitansi: [
            {
                uraian: "uang harian",
                nilai_rill: "",
                nilai_disetujui: ""
            },
            {
                uraian: "transportasi",
                nilai_rill: "",
                nilai_disetujui: ""
            },
            {
                uraian: "penginapan",
                nilai_rill: "",
                nilai_disetujui: ""
            },
            {
                uraian: "biaya pengeluaran rill",
                nilai_rill: "",
                nilai_disetujui: ""
            },
            {
                uraian: "uang repsentatif",
                nilai_rill: "",
                nilai_disetujui: ""
            },
            {
                uraian: "lain - lain",
                nilai_rill: "",
                nilai_disetujui: ""
            }
            ]
        });

    useEffect(() => {
        if (item) {
            setData({
                no_spd: item.no_spd,
                no_spt: item.no_spt,
                nik: item.nik,
                nama: item.nama,
                tgl: new Date(item.tgl),
                no_kwt: item.no_kwt,
                tgl_berangkat: new Date(item.tgl_berangkat),
                tgl_mulai: new Date(item.tgl_mulai),
                tgl_pulang: new Date(item.tgl_pulang),
                tujuan: item.tujuan,
                kegiatan: item.kegiatan,
                sub_kegiatan: item.sub_kegiatan,
                kode_rek: item.kode_rek,
                bidang: item.bidang,
            });
        }
    }, [item]);


    const addDataKwitansi = async (payload) => {
        const data = {...payload,...initialKwitansi}
        try {
            const response = await AddDataKwitansi(data);
            if (response.data) {
                onCallback({ success: true });
                toast.success("Berhasil tambah data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const EditData = async (payload) => {
        try {
            const response = await EditDataKwitansi(item.id, payload);
            if (response.data) {
                onCallback({ success: true });
                toast.success("Berhasil edit data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const changeKwitansi = (data,uraian, nilai) => {
        const dataKwitansi = initialKwitansi.vkwitansi.filter( (data) => {
            if(data.uraian === uraian){
                return data
            }
        })
        if(nilai === 'nilai_rill'){
            const kwitansi = {
                uraian: dataKwitansi[0].uraian,
                nilai_rill: data,
                nilai_disetujui: dataKwitansi[0].nilai_disetujui
            }

            const newData = initialKwitansi.vkwitansi.filter( (data) => {
                if(data.uraian !== uraian){
                    return data
                }
            })
            newData.push(kwitansi)
            const datasKwitansi = {
                vkwitansi: newData
            }
            setKwitansi(datasKwitansi)
        }else{
            const kwitansi = {
                uraian: dataKwitansi[0].uraian,
                nilai_rill: dataKwitansi[0].nilai_rill,
                nilai_disetujui: data
            }
            
            const newData = initialKwitansi.vkwitansi.filter( (data) => {
                if(data.uraian !== uraian){
                    return data
                }
            })
            newData.push(kwitansi)
            const datasKwitansi = {
                vkwitansi: newData
            }
            setKwitansi(datasKwitansi)
        }
    }

    return (
        <div className="wrapper-content">
            <Formik
                initialValues={data}
                enableReinitialize
                validationSchema={KwitansiSchema}
                onSubmit={(value) =>
                    contentType === 'Add' ? addDataKwitansi(value) : EditData(value)
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
                        <SectionForm
                            column="2"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <WrapperForm
                                        title={`${contentType === "Edit" ? "Edit" : "Tambah"} Data Kwitansi`}>
                                </WrapperForm>    
                            </div>
                        </SectionForm>
                        <SectionForm
                            column="3"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <TextInput
                                    id="no_kwt"
                                    name="no_kwt"
                                    withLabel
                                    label="No KWT"
                                    value={values.no_kwt}
                                    onChange={handleChange}
                                />
                                {touched.no_kwt && errors.no_kwt && (
                                    <span className="mt-2 text-xs text-red-500 font-semibold">
                                        {errors.no_kwt}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="text-gray-700">Tgl</label>
                                <DatePicker
                                    selected={new Date(values.tgl)}
                                    className="base-input px-10 mt-2"
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(value) => setFieldValue("tgl", value)}
                                />
                                {touched.tgl && errors.tgl && (
                                    <span className="mt-2 text-xs text-red-500 font-semibold">
                                        {errors.tgl}
                                    </span>
                                )}
                            </div>
                            <div>
                                <TextInput
                                    id="no_spd"
                                    name="no_spd"
                                    withLabel
                                    label="No SPD"
                                    value={values.no_spd}
                                    onChange={handleChange}
                                />
                                {touched.no_spd && errors.no_spd && (
                                    <span className="mt-2 text-xs text-red-500 font-semibold">
                                        {errors.no_spd}
                                    </span>
                                )}
                            </div>
                        </SectionForm>
                        <SectionForm
                            column="3"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <TextInput
                                    id="nik"
                                    name="nik"
                                    withLabel
                                    label="NIK"
                                    value={values.nik}
                                    onChange={handleChange}
                                />
                                {touched.nik && errors.nik && (
                                    <span className="mt-2 text-xs text-red-500 font-semibold">
                                        {errors.nik}
                                    </span>
                                )}
                            </div>
                            <div>
                                <TextInput
                                    id="no_spt"
                                    name="no_spt"
                                    withLabel
                                    label="No SPT"
                                    value={values.no_spt}
                                    onChange={handleChange}
                                />
                                {touched.no_spt && errors.no_spt && (
                                    <span className="mt-2 text-xs text-red-500 font-semibold">
                                        {errors.no_spt}
                                    </span>
                                )}
                            </div>
                            <div>
                                <TextInput
                                    id="nama"
                                    name="nama"
                                    withLabel
                                    label="Nama"
                                    value={values.nama}
                                    onChange={handleChange}
                                />
                                {touched.nama && errors.nama && (
                                    <span className="mt-2 text-xs text-red-500 font-semibold">
                                        {errors.nama}
                                    </span>
                                )}
                            </div>
                        </SectionForm>
                        <SectionForm
                            column="2"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <TextInput
                                    id="tujuan"
                                    name="tujuan"
                                    withLabel
                                    label="Tujuan"
                                    value={values.tujuan}
                                    onChange={handleChange}
                                />
                                {touched.tujuan && errors.tujuan && (
                                    <span className="mt-2 text-xs text-red-500 font-semibold">
                                        {errors.tujuan}
                                    </span>
                                )}
                            </div>
                        </SectionForm>
                        <SectionForm
                            column="3"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <label className="text-gray-700">Tgl Berangkat</label>
                                <DatePicker
                                    selected={new Date(values.tgl_berangkat)}
                                    className="base-input px-10 mt-2"
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(value) => setFieldValue("tgl_berangkat", value)}
                                />
                                {touched.tgl_berangkat && errors.tgl_berangkat && (
                                    <span className="mt-2 text-xs text-red-500 font-semibold">
                                        {errors.tgl_berangkat}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="text-gray-700">Tgl Mulai</label>
                                <DatePicker
                                    selected={new Date(values.tgl_mulai)}
                                    className="base-input px-10 mt-2"
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(value) => setFieldValue("tgl_mulai", value)}
                                />
                                {touched.tgl_mulai && errors.tgl_mulai && (
                                    <span className="mt-2 text-xs text-red-500 font-semibold">
                                        {errors.tgl_mulai}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="text-gray-700">Tgl Pulang</label>
                                <DatePicker
                                    selected={new Date(values.tgl_pulang)}
                                    className="base-input px-10 mt-2"
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(value) => setFieldValue("tgl_pulang", value)}
                                />
                                {touched.tgl_pulang && errors.tgl_pulang && (
                                    <span className="mt-2 text-xs text-red-500 font-semibold">
                                        {errors.tgl_pulang}
                                    </span>
                                )}
                            </div>
                        </SectionForm>
                        <SectionForm
                            column="2"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <WrapperForm
                                    title={"Verifikasi Biaya SPPD"}>
                                </WrapperForm>    
                            </div>
                        </SectionForm>
                        <Table
                            listLabel={[
                                {id: 'Uraian', name: 'Uraian'},
                                {id: 'Nilai Riil', name: 'Nilai Riil'},
                                {id: 'Nilai Disetujui', name: 'Nilai Disetujui'},
                            ]}
                        >
                            <tr>
                                <TableContent>
                                    Uang Harian
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'uang harian', 'nilai_rill')}/>
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'uang harian', 'nilai_disetujui')}/>
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Transportasi 
                                    Dari Kantor ke 
                                    bandara / Stasiun 
                                    / terminal PP 
                                    tiket lain lain
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'transportasi', 'nilai_rill')}/>
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'transportasi', 'nilai_disetujui')}/>
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Penginapan
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'penginapan', 'nilai_rill')}/>
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'penginapan', 'nilai_disetujui')}/>
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Biaya Pengeluaran Riil
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'biaya pengeluaran rill', 'nilai_rill')}/>
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'biaya pengeluaran rill', 'nilai_disetujui')}/>
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Uang Repsentatif
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'uang repsentatif', 'nilai_rill')}/>
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'uang repsentatif', 'nilai_disetujui')}/>
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Lain - lain
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'lain - lain', 'nilai_rill')}/>
                                </TableContent>
                                <TableContent>
                                    <input className="base-input pr-10" type="number" onChange={ (e) => changeKwitansi(e.target.value, 'lain - lain', 'nilai_disetujui')}/>
                                </TableContent>
                            </tr>
                        </Table>
                        <Table
                            listLabel={[
                                {id: 'Kegiatan', name: 'Kegiatan'},
                                {id: 'Sub Kegiatan', name: 'Sub Kegiatan'},
                                {id: 'Kode Rekening', name: 'Kode Rekening'},
                                {id: 'Bidang', name: 'Bidang'},
                            ]}
                        >
                            <tr>
                                <TableContent>
                                    <InputSelect 
                                        id="kegiatan"
                                        name="kegiatan"
                                        value={values.kegiatan}
                                        onChange={handleChange}
                                    >
                                        <option value="Services">Services</option>
                                    </InputSelect>
                                    {touched.kegiatan && errors.kegiatan && (
                                        <span className="mt-2 text-xs text-red-500 font-semibold">
                                            {errors.kegiatan}
                                        </span>
                                    )}
                                </TableContent>
                                <TableContent>
                                    <InputSelect 
                                        id="sub_kegiatan"
                                        name="sub_kegiatan"
                                        value={values.sub_kegiatan}
                                        onChange={handleChange}
                                    >
                                        <option value="Maintanance">Maintanance</option>
                                    </InputSelect>
                                    {touched.sub_kegiatan && errors.sub_kegiatan && (
                                        <span className="mt-2 text-xs text-red-500 font-semibold">
                                            {errors.sub_kegiatan}
                                        </span>
                                    )}
                                </TableContent>
                                <TableContent>
                                    <InputSelect 
                                        id="kode_rek"
                                        name="kode_rek"
                                        value={values.kode_rek}
                                        onChange={handleChange}
                                    >
                                        <option value="029231">029231</option>
                                    </InputSelect>
                                    {touched.kode_rek && errors.kode_rek && (
                                        <span className="mt-2 text-xs text-red-500 font-semibold">
                                            {errors.kode_rek}
                                        </span>
                                    )}
                                </TableContent>
                                <TableContent>
                                    <InputSelect 
                                        id="bidang"
                                        name="bidang"
                                        value={values.bidang}
                                        onChange={handleChange}
                                    >
                                        <option value="Instalasi">Instalasi</option>
                                    </InputSelect>
                                    {touched.bidang && errors.bidang && (
                                        <span className="mt-2 text-xs text-red-500 font-semibold">
                                            {errors.bidang}
                                        </span>
                                    )}
                                </TableContent>
                            </tr>
                        </Table>
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
        </div>
    );
};