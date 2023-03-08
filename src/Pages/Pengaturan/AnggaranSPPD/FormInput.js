import { SectionForm, TextInput, InputSelect } from "Components";
import { Form, Formik, FieldArray, Field } from "formik";
import { AnggaranSPPDSchema } from "./data/AnggaranSPPDSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataAnggaran, EditDataJumPen, GetDataUnitByUrusan, GetDataSubUnitByUnit, GetDataProgramByUnit, GetDataKegiatanByProgram, GetDataSubKegiatanByKegiatan, GetDataSumberPenBySubKegiatan } from "Services/Pengaturan";
import { toast } from "react-toastify";
import { GetListYear } from "utils";

export const FormInput = ({
    onCallback = () => { },
    item = null,
    contentType = "Add",
    listDataUrusan = [],
    listDataRekening = []
}) => {
    const formikRef = useRef();
    const [sumber_id, setSumber_id] = useState('')
    const [data, setData] = useState({
        kode_urusan: "",
        kode_unit: "",
        sub_kode_unit: "",
        kode_program: "",
        kode_kegiatan_anggaran: "",
        kode_sub_anggaran: "",
        sumberpen_id: "",
        tahun_anggaran: "",
        rekAnggaran: [{
            kode: '',
            keperluan: '',
            total: ''
        }]
    });
    const [listDataUnit, setDataUnit] = useState([])
    const [listDataSubUnit, setDataSubUnit] = useState([])
    const [listDataProgram, setDataProgram] = useState([])
    const [listDataKegiatan, setDataKegiatan] = useState([])
    const [listDataSubKegiatan, setDataSubKegiatan] = useState([])
    const [listDataSumberPendanaan, setDataSumberPendanaan] = useState([])
    // const [rekAnggaran, setRekAnggaran] = useState([])

    useEffect(() => {
        if (item) {
            setData({
                kode_urusan: item.kode_urusan,
                kode_unit: item.kode_unit,
                sub_kode_unit: item.sub_kode_unit,
                kode_program: item.kode_program,
                kode_kegiatan_anggaran: item.kode_kegiatan_anggaran,
                kode_sub_anggaran: item.kode_sub_anggaran,
                sumberpen_id: item.sumberpen_id,
                tahun_anggaran: item.tahun_anggaran,
            });
        }
    }, [item]);

    const addData = async (payload) => {
        const datasAnggaran = payload.rekAnggaran
        const rekAnggaran = []
        datasAnggaran.map( (result) => {
            const datasAnggaran = {
                kode: result.kode,
                keperluan: result.keperluan,
                total: parseInt(result.total),
                sumberpen_id: parseInt(payload.sumberpen_id),
                detailRekAnggarans: []
            }
            rekAnggaran.push(datasAnggaran)
        })
        delete payload[rekAnggaran]
        let dataBody = { ...payload, rekAnggaran }
        console.log(dataBody)
        try {
            const response = await AddDataAnggaran(payload);
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
            const response = await EditDataJumPen(item?.jumpen_id, payload);
            if (response.data) {
                onCallback({ success: true });
                toast.success("Berhasil edit data");
            }
        } catch (error) {
            toast.error("Gagal edit data");
            console.log(error)
        }
    }

    const handleOnChanges = (event) => {
        if (event.target.name === 'kode_urusan') {
            getDataUnit(event.target.value)
            getDataProgram(event.target.value)
        }
        if (event.target.name === 'kode_unit') {
            getDataSubUnit(event.target.value)
        }
        if (event.target.name === 'kode_program') {
            getDataKegiatanAnggaran(event.target.value)
        }
        if (event.target.name === 'kode_kegiatan_anggaran') {
            getDataSubKegiatanAnggaran(event.target.value)
        }
        if (event.target.name === 'kode_sub_anggaran') {
            getDataSumberPen(event.target.value)
        }
    }

    const getDataUnit = async (kode) => {
        try {
            const response = await GetDataUnitByUrusan(kode);
            if (response.data.msg) {
                setDataUnit(response.data.msg)
            }
        } catch (error) {
            setDataUnit([])
        }
    }

    const getDataSubUnit = async (kode) => {
        try {
            const response = await GetDataSubUnitByUnit(kode);
            if (response.data.msg) {
                setDataSubUnit(response.data.msg)
            }
        } catch (error) {
            setDataSubUnit([])
        }
    }

    const getDataProgram = async (kode) => {
        try {
            const response = await GetDataProgramByUnit(kode);
            if (response.data.msg) {
                setDataProgram(response.data.msg)
            }
        } catch (error) {
            setDataProgram([])
        }
    }

    const getDataKegiatanAnggaran = async (kode) => {
        try {
            const response = await GetDataKegiatanByProgram(kode);
            if (response.data.msg) {
                setDataKegiatan(response.data.msg)
            }
        } catch (error) {
            setDataKegiatan([])
        }
    }

    const getDataSubKegiatanAnggaran = async (kode) => {
        try {
            const response = await GetDataSubKegiatanByKegiatan(kode);
            if (response.data.msg) {
                setDataSubKegiatan(response.data.msg)
            }
        } catch (error) {
            setDataSubKegiatan([])
        }
    }

    const getDataSumberPen = async (kode) => {
        try {
            const response = await GetDataSumberPenBySubKegiatan(kode);
            if (response.data.msg) {
                setDataSumberPendanaan(response.data.msg)
            }
        } catch (error) {
            setDataSumberPendanaan([])
        }
    }

    // const DetailAnggaran = (data) => {
    //     return (
    //         <FieldArray
    //             name="detailRekAnggarans"
    //             render={arrayHelpers => (
    //                 <div className="mb-2">
    //                     {data.detailRekAnggarans.map((datas, index) => (
    //                         <div key={index}>
    //                             <table className="w-full mt-3">
    //                                 <tr>
    //                                     <td className="w-[80%]">
    //                                         <div className="grid grid-cols-1 gap-4 mt-3">
    //                                             <div>
    //                                                 <div className="relative">
    //                                                     <label>
    //                                                         Keperluan
    //                                                     </label>
    //                                                     <textarea
    //                                                         type="text"
    //                                                         className="base-input"
    //                                                         name="keperluan"
    //                                                         placeholder="Keperluan"
    //                                                     />
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                         <div className="grid grid-cols-3 gap-4 mt-3">
    //                                             <div>
    //                                                 <div className="relative">
    //                                                     <label>
    //                                                         Total
    //                                                     </label>
    //                                                     <input
    //                                                         type="number"
    //                                                         className="base-input"
    //                                                         name="totalDetail"
    //                                                         placeholder="Total"
    //                                                     />
    //                                                 </div>
    //                                             </div>
    //                                             <div>
    //                                                 <div className="relative">
    //                                                     <label>
    //                                                         Jumlah Peserta
    //                                                     </label>
    //                                                     <input
    //                                                         type="number"
    //                                                         className="base-input"
    //                                                         name="jumlahPeserta"
    //                                                         placeholder="Jumlah Peserta"
    //                                                     />
    //                                                 </div>
    //                                             </div>
    //                                             <div>
    //                                                 <div className="relative">
    //                                                     <label>
    //                                                         Jenis
    //                                                     </label>
    //                                                     <input
    //                                                         type="text"
    //                                                         className="base-input"
    //                                                         name="jenis"
    //                                                         placeholder="Jenis"
    //                                                     />
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </td>
    //                                     <td className="w-[20%] text-center">
    //                                         <button
    //                                             type="button"
    //                                             className="inline-flex justify-center rounded-full border border-transparent bg-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mt-2 mb-2"
    //                                             onClick={() => arrayHelpers.insert(index, {
    //                                                 keperluan: '',
    //                                                 jumlah_peserta: '',
    //                                                 jenis: '',
    //                                                 total: '',
    //                                                 rek_id: ''
    //                                             })}
    //                                         >
    //                                             Tambah Detail Anggaran
    //                                         </button>
    //                                         <button
    //                                             type="button"
    //                                             className="inline-flex justify-center rounded-full border border-transparent bg-red-900 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mt-2"
    //                                             onClick={() => arrayHelpers.remove(index)}
    //                                         >
    //                                             Hapus Detail Biaya
    //                                         </button>
    //                                     </td>
    //                                 </tr>
    //                             </table>
    //                         </div>
    //                     ))}
    //                 </div>
    //             )}
    //         />
    //     )
    // }

    return (
        <Formik
            innerRef={formikRef}
            initialValues={data}
            enableReinitialize={true}
            // validationSchema={AnggaranSPPDSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({ errors, touched, values, handleChange, handleSubmit, setFieldValue }) => (
                <Form
                    onChange={handleOnChanges}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputSelect
                                name="kode_urusan"
                                id="kode_urusan"
                                withLabel
                                label="Urusan"
                                placeholder="Urusan"
                                value={values.kode_urusan}
                                onChange={handleChange}
                            >
                                {
                                    listDataUrusan.map(value => {
                                        return <option key={value.urusan_id} value={value.kode_urusan}>{value.kode_urusan} - {value.nama_urusan}</option>
                                    })
                                }
                            </InputSelect>
                            {touched.kode_urusan && errors.kode_urusan && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_urusan}</span>}
                        </div>
                        <div>
                            <InputSelect
                                name="kode_unit"
                                id="kode_unit"
                                withLabel
                                label="Unit Organisasi"
                                placeholder="Unit Organisasi"
                                value={values.kode_unit}
                                onChange={handleChange}
                            >
                                {
                                    listDataUnit.map(value => {
                                        return <option key={value.unit_id} value={value.kode_unit}>{value.kode_unit} - {value.nama_unit}</option>
                                    })
                                }
                            </InputSelect>
                            {touched.kode_unit && errors.kode_unit && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_unit}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                            <InputSelect
                                name="sub_kode_unit"
                                id="sub_kode_unit"
                                withLabel
                                label="Sub Unit Organisasi"
                                placeholder="Sub Unit Organisasi"
                                value={values.sub_kode_unit}
                                onChange={handleChange}
                            >
                                {
                                    listDataSubUnit.map(value => {
                                        return <option key={value.subunit_id} value={value.sub_kode_unit}>{value.sub_kode_unit} - {value.sub_nama_unit}</option>
                                    })
                                }
                            </InputSelect>
                            {touched.sub_kode_unit && errors.sub_kode_unit && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.sub_kode_unit}</span>}
                        </div>
                        <div>
                            <InputSelect
                                name="kode_program"
                                id="kode_program"
                                withLabel
                                label="Program"
                                placeholder="Program"
                                value={values.kode_program}
                                onChange={handleChange}
                            >
                                {
                                    listDataProgram.map(value => {
                                        return <option key={value.prog_id} value={value.kode_program}>{value.kode_program} - {value.nama_program}</option>
                                    })
                                }
                            </InputSelect>
                            {touched.kode_program && errors.kode_program && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_program}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                            <InputSelect
                                name="kode_kegiatan_anggaran"
                                id="kode_kegiatan_anggaran"
                                withLabel
                                label="Kegiatan Anggaran"
                                placeholder="Kegiatan Anggaran"
                                value={values.kode_kegiatan_anggaran}
                                onChange={handleChange}
                            >
                                {
                                    listDataKegiatan.map(value => {
                                        return <option key={value.keg_id} value={value.kode_kegiatan_anggaran}>{value.kode_kegiatan_anggaran} - {value.nama_kegiatan_anggaran}</option>
                                    })
                                }
                            </InputSelect>
                            {touched.kode_kegiatan_anggaran && errors.kode_kegiatan_anggaran && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_kegiatan_anggaran}</span>}
                        </div>
                        <div>
                            <InputSelect
                                name="kode_sub_anggaran"
                                id="kode_sub_anggaran"
                                withLabel
                                label="Sub Kegiatan"
                                placeholder="Sub Kegiatan"
                                value={values.kode_sub_anggaran}
                                onChange={handleChange}
                            >
                                {
                                    listDataSubKegiatan.map(value => {
                                        return <option key={value.subkeg_id} value={value.kode_sub_anggaran}>{value.kode_sub_anggaran} - {value.nama_sub_anggaran}</option>
                                    })
                                }
                            </InputSelect>
                            {touched.kode_sub_anggaran && errors.kode_sub_anggaran && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_sub_anggaran}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                            <InputSelect
                                name="sumberpen_id"
                                id="sumberpen_id"
                                withLabel
                                label="Sumber Pendanaan"
                                placeholder="Sumber Pendanaan"
                                value={values.sumberpen_id}
                                onChange={handleChange}
                            >
                                {
                                    listDataSumberPendanaan.map(value => {
                                        return <option key={value.sumberpen_id} value={value.sumberpen_id}>{value.nama_sumber_pendanaan}</option>
                                    })
                                }
                            </InputSelect>
                            {touched.sumberpen_id && errors.sumberpen_id && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.sumberpen_id}</span>}
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
                    </div>

                    <SectionForm
                        column="1"
                        gap="1"
                        className="mt-3"
                    >
                        <p>Biaya Anggaran</p>
                        <div className="border border-gray-500 px-2 pb-2">
                            <FieldArray
                                name="rekAnggaran"
                                render={arrayHelpers => (
                                    <div>
                                        {values.rekAnggaran.map((data, index) => (
                                            <div key={index}>
                                                <table className="w-full mt-3">
                                                    <tr>
                                                        <td className="w-[80%]">
                                                            <div className="grid grid-cols-2 gap-4 mt-3">
                                                                <div>
                                                                    <InputSelect
                                                                        name={`rekAnggaran.${index}.kode`}
                                                                        id={`rekAnggaran.${index}.kode`}
                                                                        withLabel
                                                                        label="Kode Rekening"
                                                                        placeholder="Kode Rekening"
                                                                        value={data.kode === '' ? '' : data.kode}
                                                                        onChange={handleChange}
                                                                    >
                                                                        {
                                                                            listDataRekening.map(value => {
                                                                                return <option key={value.id} value={value.kode}>{value.kode}</option>
                                                                            })
                                                                        }
                                                                    </InputSelect>
                                                                </div>
                                                                <div>
                                                                    <TextInput 
                                                                        id={`rekAnggaran.${index}.total`}
                                                                        name={`rekAnggaran.${index}.total`}
                                                                        withLabel
                                                                        label="Total Anggaran"
                                                                        placeholder="Total Anggaran"
                                                                        value={data.total}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-1 gap-4 mt-3">
                                                                <div>
                                                                    <TextInput 
                                                                        id={`rekAnggaran.${index}.keperluan`}
                                                                        name={`rekAnggaran.${index}.keperluan`}
                                                                        withLabel
                                                                        label="Keperluan Anggaran"
                                                                        placeholder="Keperluan Anggaran"
                                                                        value={data.keperluan}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="w-[20%] text-center">
                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center rounded-full border border-transparent bg-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mt-2 mb-3"
                                                                onClick={() => arrayHelpers.push({
                                                                    kode: '',
                                                                    keperluan: '',
                                                                    total: '',
                                                                    sumberpen_id: '',
                                                                    detailRekAnggarans: [{
                                                                        keperluan: '',
                                                                        jumlah_peserta: '',
                                                                        jenis: '',
                                                                        total: '',
                                                                        rek_id: ''
                                                                    }]
                                                                })}
                                                            >
                                                                Tambah Biaya Anggaran
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center rounded-full border border-transparent bg-red-900 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mt-2"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                Hapus Biaya Anggaran
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                        </div>
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
                                {contentType === 'Add' ? 'Tambah Anggaran SPPD' : 'Edit Anggaran SPPD'}
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>


    )
}