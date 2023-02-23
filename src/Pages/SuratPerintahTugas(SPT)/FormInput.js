import { SectionForm, InputSelect, TextInput } from "Components";
import { Form, Formik } from "formik";
import { SptSchema } from "./data/SptSchema";
import { useRef, useEffect, useState } from "react";
import { AddSpt, EditSptById } from "Services/Spt";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    listKegiatan=[],
    item = null,
    contentType="Add"
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        no_spt: "",
        no_surat: "",
        kegiatan_id: "",
        id: ""
    });

    useEffect(() => {
        if (item) {
            setData({
                no_spt: item.no_spt,
                no_surat: item.kegiatan.no_surat,
                kegiatan_id: item.kegiatan.id,
                id: item.id
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddSpt(payload);
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
            const response = await EditSptById(item?.id,payload);
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
            validationSchema={SptSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <SectionForm
                        column="1"
                        gap="4"
                    >
                        <TextInput 
                            id="no_spt"
                            name="no_spt"
                            withLabel
                            label="No SPT"
                            value={values.no_spt}
                            onChange={handleChange}
                        />
                        {touched.no_spt && errors.no_spt && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.no_spt}</span>}
                    </SectionForm>
                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-8"
                    >
                        <InputSelect 
                            id="kegiatan_id"
                            name="kegiatan_id"
                            withLabel
                            label="No Dasar SPT"
                            value={values.no_surat}
                            onChange={handleChange}
                        >
                        {
                            listKegiatan.map((value, index) => {
                                return <option key={index} value={value.id}>{value.no_surat}</option>
                            })
                        }
                        </InputSelect>
                        {touched.kegiatan_id && errors.kegiatan_id && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kegiatan_id}</span>}
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
                                    {contentType === 'Add' ? 'Tambah SPT' : 'Edit SPT' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}