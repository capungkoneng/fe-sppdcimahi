import { SectionForm, TextInput, TextArea, InputSelect } from "Components";
import { Form, Formik } from "formik";
import { SubUnitSchema } from "./data/SubUnitSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataSubUnit, EditDataSubUnit } from "Services/Pengaturan";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    item = null,
    contentType="Add",
    ListUnit = []
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        kode_unit: "",
        sub_kode_unit: "",
        sub_nama_unit: "",
    });

    useEffect(() => {
        if (item) {
            console.log(item)
            setData({
                id: item.subunit_id,
                kode_unit: item.kode_unit,
                sub_kode_unit: item.sub_kode_unit,
                sub_nama_unit: item.sub_nama_unit,
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataSubUnit(payload);
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
            const response = await EditDataSubUnit(item?.subunit_id,payload);
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
            validationSchema={SubUnitSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <SectionForm
                        column="1"
                        gap="4"
                    >
                        <InputSelect
                            id="kode_unit"
                            name="kode_unit"
                            withLabel
                            label="Kode Unit"
                            placeholder="Kode Unit"
                            value={values.kode_unit}
                            onChange={handleChange}
                        >
                            {
                                ListUnit.map(value => {
                                    return <option key={value.unit_id} value={value.kode_unit}>{value.kode_unit} - {value.nama_unit}</option>
                            })
                            }
                        </InputSelect>
                        {touched.kode_unit && errors.kode_unit && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode_unit}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextInput 
                            id="sub_kode_unit"
                            name="sub_kode_unit"
                            withLabel
                            label="Kode Sub Unit"
                            placeholder="Kode Sub Unit"
                            value={values.sub_kode_unit}
                            onChange={handleChange}
                        />
                        {touched.sub_kode_unit && errors.sub_kode_unit && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.sub_kode_unit}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextArea 
                            id="sub_nama_unit"
                            name="sub_nama_unit"
                            withLabel
                            label="Sub Unit"
                            placeholder="Sub Unit"
                            value={values.sub_nama_unit}
                            onChange={handleChange}
                        />
                        {touched.sub_nama_unit && errors.sub_nama_unit && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.sub_nama_unit}</span>}
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
                                    {contentType === 'Add' ? 'Tambah Sub Unit' : 'Edit Sub Unit' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}