import { SectionForm, TextInput, TextArea } from "Components";
import { Form, Formik } from "formik";
import { UrusanSchema } from "./data/UrusanSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataUrusan, EditDataUrusan } from "Services/Pengaturan";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    item = null,
    contentType="Add"
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        kode_urusan: "",
        nama_urusan: "",
    });

    useEffect(() => {
        if (item) {
            setData({
                id: item.urusan_id,
                kode_urusan: item.kode_urusan,
                nama_urusan: item.nama_urusan,
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataUrusan(payload);
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
            const response = await EditDataUrusan(item?.urusan_id,payload);
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
            validationSchema={UrusanSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <SectionForm
                        column="1"
                        gap="4"
                    >
                        <TextInput 
                            id="kode_urusan"
                            name="kode_urusan"
                            withLabel
                            label="Kode Urusan"
                            placeholder="Kode Urusan"
                            value={values.kode_urusan}
                            onChange={handleChange}
                        />
                        {touched.kode_urusan && errors.kode_urusan && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_urusan}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextArea 
                            id="nama_urusan"
                            name="nama_urusan"
                            withLabel
                            label="Urusan"
                            placeholder="Urusan"
                            value={values.nama_urusan}
                            onChange={handleChange}
                        />
                        {touched.nama_urusan && errors.nama_urusan && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama_urusan}</span>}
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
                                    {contentType === 'Add' ? 'Tambah Urusan' : 'Edit Urusan' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}