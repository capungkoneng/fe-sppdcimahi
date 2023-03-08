import { SectionForm, TextInput, TextArea, InputSelect } from "Components";
import { Form, Formik } from "formik";
import { JumlahPenSchema } from "./data/JumlahPenSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataJumPen, EditDataJumPen } from "Services/Pengaturan";
import { toast } from "react-toastify";
import { GetListYear } from "utils";

export const FormInput = ({
    onCallback = () => {},
    item = null,
    contentType="Add",
    ListSumberPen = []
}) => {
    const formikRef = useRef();
    const [data, setData] = useState({
        nama: "",
        tahun: "",
        jumlah: "",
        sumberpen_id: ""
    });

    useEffect(() => {
        if (item) {
            setData({
                nama: item.nama,
                tahun: item.tahun,
                jumlah: item.jumlah,
                sumberpen_id: item.sumberpen_id
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataJumPen(payload);
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
            const response = await EditDataJumPen(item?.jumpen_id,payload);
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
            validationSchema={JumlahPenSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <SectionForm
                        column="1"
                        gap="4"
                    >
                        <InputSelect
                            id="sumberpen_id"
                            name="sumberpen_id"
                            withLabel
                            label="Sumber Pendanaan"
                            placeholder="Sumber Pendanaan"
                            value={values.sumberpen_id}
                            onChange={handleChange}
                        >
                            {
                                ListSumberPen.map(value => {
                                    return <option key={value.sumberpen_id} value={value.sumberpen_id}>{value.nama_sumber_pendanaan}</option>
                            })
                            }
                        </InputSelect>
                        {touched.sumberpen_id && errors.sumberpen_id && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.sumberpen_id}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextInput 
                            id="nama"
                            name="nama"
                            withLabel
                            label="Nama Pendanaan"
                            placeholder="Nama Pendanaan"
                            value={values.nama}
                            onChange={handleChange}
                        />
                        {touched.nama && errors.nama && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                            <InputSelect
                                name="tahun"
                                id="tahun"
                                withLabel
                                label="Tahun Anggaran"
                                placeholder="Tahun Anggaran"
                                value={values.tahun}
                                onChange={handleChange}
                            >
                            {
                                GetListYear().map(value => {
                                    return <option key={value.id} value={value.name}>{value.name}</option>
                                })
                            }
                            </InputSelect>
                            {touched.tahun && errors.tahun && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.tahun}</span>}
                    </SectionForm>

                    <SectionForm
                        column="1"
                        gap="4"
                        className="mt-6"
                    >
                        <TextInput
                            id="jumlah"
                            name="jumlah"
                            type="number"
                            withLabel
                            label="Jumlah Pendanaan"
                            placeholder="Jumlah Pendanaan"
                            value={values.jumlah}
                            onChange={handleChange}
                        />
                        {touched.jumlah && errors.jumlah && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.jumlah}</span>}
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
                                    {contentType === 'Add' ? 'Tambah Jumlah Pendanaan' : 'Edit Jumlah Pendanaan' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}