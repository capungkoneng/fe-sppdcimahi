import { SectionForm, TextInput } from "Components";
import { Form, Formik } from "formik";
import { GolonganSchema } from "./data/GolonganSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataGolongan, EditDataGolongan } from "Services/Pengaturan";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    item = null,
    contentType="Add"
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        nama: "",
    });

    useEffect(() => {
        if (item) {
            setData({
                nama: item.nama
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataGolongan(payload);
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
        delete payload['no_surat']
        try {
            const response = await EditDataGolongan(item?.id,payload);
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
            validationSchema={GolonganSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <SectionForm
                        column="1"
                        gap="4"
                    >
                        <TextInput 
                            id="nama"
                            name="nama"
                            withLabel
                            label="Nama Golongan"
                            value={values.nama}
                            onChange={handleChange}
                        />
                        {touched.nama && errors.nama && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama}</span>}
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
                                    {contentType === 'Add' ? 'Tambah Golongan' : 'Edit Golongan' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}