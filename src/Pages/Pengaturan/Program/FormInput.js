import { SectionForm, TextInput, TextArea, InputSelect } from "Components";
import { Form, Formik } from "formik";
import { ProgramSchema } from "./data/ProgramSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataProgram, EditDataProgram } from "Services/Pengaturan";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    item = null,
    contentType="Add",
    ListUrusan = []
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        kode_program: "",
        kode_urusan: "",
        nama_program: "",
    });

    useEffect(() => {
        if (item) {
            setData({
                kode_program: item.kode_program,
                kode_urusan: item.kode_urusan,
                nama_program: item.nama_program,
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataProgram(payload);
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
            const response = await EditDataProgram(item?.prog_id,payload);
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
            validationSchema={ProgramSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <SectionForm
                        column="1"
                        gap="4"
                    >
                        <InputSelect
                            id="kode_urusan"
                            name="kode_urusan"
                            withLabel
                            label="Kode Urusan"
                            placeholder="Kode Urusan"
                            value={values.kode_urusan}
                            onChange={handleChange}
                        >
                            {
                                ListUrusan.map(value => {
                                    return <option key={value.urusan_id} value={value.kode_urusan}>{value.kode_urusan} - {value.nama_urusan}</option>
                            })
                            }
                        </InputSelect>
                        {touched.kode_urusan && errors.kode_urusan && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_urusan}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextInput 
                            id="kode_program"
                            name="kode_program"
                            withLabel
                            label="Kode Program"
                            placeholder="Kode Program"
                            value={values.kode_program}
                            onChange={handleChange}
                        />
                        {touched.kode_program && errors.kode_program && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_program}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextArea 
                            id="nama_program"
                            name="nama_program"
                            withLabel
                            label="Nama Program"
                            placeholder="Nama Program"
                            value={values.nama_program}
                            onChange={handleChange}
                        />
                        {touched.nama_program && errors.nama_program && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama_program}</span>}
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
                                    {contentType === 'Add' ? 'Tambah Program' : 'Edit Program' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}