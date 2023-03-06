import { SectionForm, TextInput, TextArea, InputSelect } from "Components";
import { Form, Formik } from "formik";
import { KegiatanAnggaranSchema } from "./data/KegiatanAnggaranSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataKegAnggaran, EditDataKegAnggaran } from "Services/Pengaturan";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    item = null,
    contentType="Add",
    ListProgram = []
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        kode_program: "",
        kode_kegiatan_anggaran: "",
        nama_kegiatan_anggaran: "",
    });

    useEffect(() => {
        if (item) {
            setData({
                kode_program: item.kode_program,
                kode_kegiatan_anggaran: item.kode_kegiatan_anggaran,
                nama_kegiatan_anggaran: item.nama_kegiatan_anggaran,
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataKegAnggaran(payload);
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
            const response = await EditDataKegAnggaran(item?.keg_id,payload);
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
            validationSchema={KegiatanAnggaranSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <SectionForm
                        column="1"
                        gap="4"
                    >
                        <InputSelect
                            id="kode_program"
                            name="kode_program"
                            withLabel
                            label="Kode Program"
                            placeholder="Kode Program"
                            value={values.kode_program}
                            onChange={handleChange}
                        >
                            {
                                ListProgram.map(value => {
                                    return <option key={value.prog_id} value={value.kode_program}>{value.kode_program} - {value.nama_program}</option>
                            })
                            }
                        </InputSelect>
                        {touched.kode_program && errors.kode_program && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_program}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextInput 
                            id="kode_kegiatan_anggaran"
                            name="kode_kegiatan_anggaran"
                            withLabel
                            label="Kode Kegiatan Anggaran"
                            placeholder="Kode Kegiatan Anggaran"
                            value={values.kode_kegiatan_anggaran}
                            onChange={handleChange}
                        />
                        {touched.kode_kegiatan_anggaran && errors.kode_kegiatan_anggaran && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_kegiatan_anggaran}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextArea 
                            id="nama_kegiatan_anggaran"
                            name="nama_kegiatan_anggaran"
                            withLabel
                            label="Nama Kegiatan Anggaran"
                            placeholder="Nama Kegiatan Anggaran"
                            value={values.nama_kegiatan_anggaran}
                            onChange={handleChange}
                        />
                        {touched.nama_kegiatan_anggaran && errors.nama_kegiatan_anggaran && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama_kegiatan_anggaran}</span>}
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
                                    {contentType === 'Add' ? 'Tambah Kegiatan Anggaran' : 'Edit Kegiatan Anggaran' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}