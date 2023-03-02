import { SectionForm, TextInput, TextArea, InputSelect } from "Components";
import { Form, Formik } from "formik";
import { UnitSchema } from "./data/UnitSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataUnit, EditDataUnit } from "Services/Pengaturan";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    item = null,
    contentType="Add",
    ListKodeUrusan = []
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        kode_urusan: "",
        kode_unit: "",
        nama_unit: "",
    });

    useEffect(() => {
        if (item) {
            setData({
                id: item.urusan_id,
                kode_urusan: item.kode_urusan,
                kode_unit: item.kode_unit,
                nama_unit: item.nama_unit,
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataUnit(payload);
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
            const response = await EditDataUnit(item?.unit_id,payload);
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
            validationSchema={UnitSchema}
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
                                ListKodeUrusan.map(value => {
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
                            id="kode_unit"
                            name="kode_unit"
                            withLabel
                            label="Kode Unit"
                            placeholder="Kode Unit"
                            value={values.kode_unit}
                            onChange={handleChange}
                        />
                        {touched.kode_unit && errors.kode_unit && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_unit}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextArea 
                            id="nama_unit"
                            name="nama_unit"
                            withLabel
                            label="Unit"
                            placeholder="Unit"
                            value={values.nama_unit}
                            onChange={handleChange}
                        />
                        {touched.nama_unit && errors.nama_unit && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama_unit}</span>}
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
                                    {contentType === 'Add' ? 'Tambah Unit' : 'Edit Unit' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}