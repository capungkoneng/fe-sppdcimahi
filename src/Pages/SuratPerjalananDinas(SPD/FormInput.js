import { SectionForm, InputSelect, TextInput } from "Components";
import { Form, Formik } from "formik";
import { SpdSchema } from "./data/SpdSchema";
import { useRef, useEffect, useState } from "react";
import { AddSpd, EditSpdById } from "Services/Spd";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    listSpt=[],
    item = null,
    contentType="Add"
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        no_spd: "",
        no_spt: "",
        id: ""
    });

    useEffect(() => {
        if (item) {
            setData({
                no_spd: item.no_spd,
                no_spt: item.no_spt,
                id:item.id
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddSpd(payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil tambah data");
            }
        } catch (error) {
            console.log(error)
            toast.error("Gagal tambah data");
        }
    }

    const editData = async (payload) => {
        try {
            const response = await EditSpdById(item?.id,payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil edit data");
            }
        } catch (error) {
            console.log(error)
            toast.success("Gagal edit data");
        }
    }

    return (
        <Formik
            innerRef={formikRef}
            initialValues={data}
            enableReinitialize
            validationSchema={SpdSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <SectionForm
                        column="1"
                        gap="4"
                    >
                        <TextInput 
                            id="no_spd"
                            name="no_spd"
                            withLabel
                            label="No SPD"
                            value={values.no_spd}
                            onChange={handleChange}
                        />
                        {touched.no_spd && errors.no_spd && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.no_spd}</span>}
                    </SectionForm>
                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-8"
                    >
                        <InputSelect 
                            id="no_spt"
                            name="no_spt"
                            withLabel
                            label="No SPT"
                            value={values.no_spt}
                            onChange={handleChange}
                        >
                        {
                            listSpt.map((value, index) => {
                                return <option key={index} value={value.no_spt}>{value.no_spt}</option>
                            })
                        }
                        </InputSelect>
                        {touched.no_spt && errors.no_spt && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.no_spt}</span>}
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
                                    {contentType === 'Add' ? 'Tambah SPD' : 'Edit SPD' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}