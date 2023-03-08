import { SectionForm, TextInput, TextArea, InputSelect } from "Components";
import { Form, Formik } from "formik";
import { RekeningSchema } from "./data/RekeningSchema";
import { useRef, useEffect, useState } from "react";
import { AddDataRekening, EditDataRekening } from "Services/Pengaturan";
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
        kode: "",
        atas_nama: "",
        nama_bank: "",
        total: ""
    });

    useEffect(() => {
        if (item) {
            setData({
                kode: item.kode,
                atas_nama: item.atas_nama,
                nama_bank: item.nama_bank,
                total: item.total
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataRekening(payload);
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
            const response = await EditDataRekening(item?.id,payload);
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
            validationSchema={RekeningSchema}
            onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
        >
            {({errors, touched, values, handleChange, handleSubmit, setFieldValue}) => (
                <Form>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <TextInput 
                                id="kode"
                                name="kode"
                                withLabel
                                label="Kode Rekening"
                                placeholder="Kode Rekening"
                                value={values.kode}
                                onChange={handleChange}
                            />
                            {touched.kode && errors.kode && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.kode}</span>}
                        </div>
                        <div>
                            <TextInput 
                                id="atas_nama"
                                name="atas_nama"
                                withLabel
                                label="Atas Nama"
                                placeholder="Atas Nama"
                                value={values.atas_nama}
                                onChange={handleChange}
                            />
                            {touched.atas_nama && errors.atas_nama && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.atas_nama}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <TextInput 
                                id="nama_bank"
                                name="nama_bank"
                                withLabel
                                label="Nama Bank"
                                placeholder="Nama Bank"
                                value={values.nama_bank}
                                onChange={handleChange}
                            />
                            {touched.nama_bank && errors.nama_bank && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama_bank}</span>}
                        </div>
                        <div>
                            <TextInput 
                                id="total"
                                name="total"
                                type="number"
                                withLabel
                                label="Total"
                                placeholder="Total"
                                value={values.total}
                                onChange={handleChange}
                            />
                            {touched.total && errors.total && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.total}</span>}
                        </div>
                    </div>
                        <div className="mt-8 flex justify-end">
                            <div className="flex gap-2 items-center">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-full border border-transparent bg-[#3F7459] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                >
                                    {contentType === 'Add' ? 'Tambah Rekening' : 'Edit Rekening' }
                                </button>
                            </div>
                        </div>
                </Form>
            )}
        </Formik>


    )
}