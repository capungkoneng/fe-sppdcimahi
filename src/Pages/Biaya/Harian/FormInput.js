import { InputSelect, SectionForm, TextInput } from "Components"
import { Form, Formik } from "formik";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { AddDataHarian, EditDataHarian } from "Services";
import { HarianSchema } from "./data/HarianSchema";

export const FormInput = ({
    onCallback = () => {},
    listProvince = [],
    contentType = 'Add',
    item = null
}) => {

    const [data, setData] = useState({
        provinsi: '',
        satuan: '',
        luar_kota: '',
        dalam_kota: '',
        diklat: ''
    });

    useEffect(() => {
        if (item) {
            setData({
                provinsi: item?.provinsi,
                satuan: item?.satuan,
                luar_kota: item.luar_kota,
                dalam_kota: item.dalam_kota,
                diklat: item.diklat
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataHarian(payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil tambah data");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editData = async (payload) => {
        try {
            const response = await EditDataHarian(item?.id, payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil edit data");
            } 
        } catch (error) {
            console.log(error);
        }
    }
    return (

            <Formik
                initialValues={data}
                enableReinitialize
                validationSchema={HarianSchema}
                onSubmit={(value) => contentType === 'Edit' ? editData(value) : addData(value)}
            >
                {({errors, touched, handleChange, handleSubmit, values}) => (
                    <Form>
                        <SectionForm
                            column="1"
                        >
                            <div>
                                <InputSelect 
                                    id="provinsi"
                                    name="provinsi"
                                    value={values.provinsi}
                                    withLabel
                                    label="Provinsi"
                                    onChange={handleChange}
                                >
                                    {
                                        listProvince.map((value, index) => {
                                            return <option key={index} value={value.name}>{value.name}</option>
                                        })
                                    }
                                </InputSelect>
                                {touched.provinsi && errors.provinsi && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.provinsi}</span>}
                            </div>
                        </SectionForm>

                        <SectionForm
                            column="3"
                            gap="4"
                            className="mt-8"
                        >
                            <div>
                                <TextInput 
                                    id="satuan"
                                    name="satuan"
                                    withLabel
                                    label="Satuan"
                                    placeholder="Satuan"
                                    value={values.satuan}
                                    onChange={handleChange}
                                />
                                {touched.satuan && errors.satuan && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.satuan}</span>}
                            </div>

                            <div>
                                <TextInput 
                                    id="luar_kota"
                                    name="luar_kota"
                                    withLabel
                                    label="Luar Kota"
                                    placeholder="Luar Kota"
                                    value={values.luar_kota}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {touched.luar_kota && errors.luar_kota && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.luar_kota}</span>}
                            </div>

                            <div>
                                <TextInput 
                                    id="dalam_kota"
                                    name="dalam_kota"
                                    withLabel
                                    label="Dalam Kota"
                                    placeholder="Dalam Kota"
                                    value={values.dalam_kota}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {touched.dalam_kota && errors.dalam_kota && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.dalam_kota}</span>}
                            </div>

                        </SectionForm>
                        <div className="mt-4">
                            <TextInput 
                                id="diklat"
                                name="diklat"
                                withLabel
                                label="Diklat"
                                placeholder="Diklat"
                                value={values.diklat}
                                onChange={handleChange}
                                type="number"
                            />
                            {touched.diklat && errors.diklat && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.diklat}</span>}
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
                                    {contentType === 'Add' ? 'Tambah Biaya Harian SPPD' : 'Edit Biaya Harian SPPD' }
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
    )
}