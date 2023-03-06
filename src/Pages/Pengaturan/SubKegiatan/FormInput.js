import { SectionForm, TextInput, TextArea, InputSelect } from "Components";
import { Form, Formik } from "formik";
import { SubKegiatanSchema } from "./data/SubKegiatanSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataSubKegiatan, EditDataSubKegiatan } from "Services/Pengaturan";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    item = null,
    contentType="Add",
    ListKegAnggaran = []
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        kode_sub_anggaran: "",
        kode_kegiatan_anggaran: "",
        nama_sub_anggaran: "",
    });

    useEffect(() => {
        if (item) {
            setData({
                kode_sub_anggaran: item.kode_sub_anggaran,
                kode_kegiatan_anggaran: item.kode_kegiatan_anggaran,
                nama_sub_anggaran: item.nama_sub_anggaran,
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataSubKegiatan(payload);
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
            const response = await EditDataSubKegiatan(item?.subkeg_id,payload);
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
            validationSchema={SubKegiatanSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <SectionForm
                        column="1"
                        gap="4"
                    >
                        <InputSelect
                            id="kode_kegiatan_anggaran"
                            name="kode_kegiatan_anggaran"
                            withLabel
                            label="Kode Kegiatan Anggaran"
                            placeholder="Kode Kegiatan Anggaran"
                            value={values.kode_kegiatan_anggaran}
                            onChange={handleChange}
                        >
                            {
                                ListKegAnggaran.map(value => {
                                    return <option key={value.keg_id} value={value.kode_kegiatan_anggaran}>{value.kode_kegiatan_anggaran} - {value.nama_kegiatan_anggaran}</option>
                            })
                            }
                        </InputSelect>
                        {touched.kode_kegiatan_anggaran && errors.kode_kegiatan_anggaran && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_kegiatan_anggaran}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextInput 
                            id="kode_sub_anggaran"
                            name="kode_sub_anggaran"
                            withLabel
                            label="Kode Program"
                            placeholder="Kode Program"
                            value={values.kode_sub_anggaran}
                            onChange={handleChange}
                        />
                        {touched.kode_sub_anggaran && errors.kode_sub_anggaran && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_sub_anggaran}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextArea 
                            id="nama_sub_anggaran"
                            name="nama_sub_anggaran"
                            withLabel
                            label="Nama Sub Anggaran"
                            placeholder="Nama Sub Anggaran"
                            value={values.nama_sub_anggaran}
                            onChange={handleChange}
                        />
                        {touched.nama_sub_anggaran && errors.nama_sub_anggaran && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama_sub_anggaran}</span>}
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
                                    {contentType === 'Add' ? 'Tambah Sub Anggaran' : 'Edit Sub Anggaran' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}