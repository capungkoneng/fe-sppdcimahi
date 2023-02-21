import { InputSelect, SectionForm, TextInput } from "Components"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AddDataPenginapan, EditDataPenginapan } from "Services"
import { PenginapanSchema } from "./data/PenginapanSchema"

export const FormInput = ({
    onCallback = () => {},
    contentType = 'Add',
    item = null,
    listProvince = []
}) => {

    const [data, setData] = useState({
        provinsi: '',
        satuan: '',
        g2eselon1: '',
        g3eselon3: '',
        g4eselon4: '',
        peselon1: '',
        peselon2: '',
    });

    useEffect(() => {
        if (item) {
            setData({
                provinsi: item.provinsi,
                satuan: item.satuan,
                g2eselon1: item.g2eselon1,
                g3eselon3: item.g3eselon3,
                g4eselon4: item.g4eselon4,
                peselon1: item.peselon1,
                peselon2: item.peselon2
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataPenginapan(payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil tambah data");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editData = async (payload) => {
        try {
            const response = await EditDataPenginapan(item?.id, payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil edit data");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        // <WrapperForm
        //     title={`${contentType === 'Edit' ? 'Edit' : 'Tambah'} Data Biaya Harian SPPD`}
        // >

            <Formik
                initialValues={data}
                enableReinitialize
                validationSchema={PenginapanSchema}
                onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
            >
                {({errors, touched, values, handleChange, handleSubmit}) => (
                    <Form>
                        <SectionForm
                            column="2"
                            gap="4"
                        >
                            <div>
                                <InputSelect 
                                    id="provinsi"
                                    name="provinsi"
                                    withLabel
                                    label="Provinsi"
                                    value={values.provinsi}
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
                        </SectionForm>
                        <SectionForm
                            column="3"
                            gap="4"
                        >
                            <div>
                                <TextInput 
                                    id="peselon1"
                                    name="peselon1"
                                    withLabel
                                    label="Pejabat/Eselon I"
                                    placeholder="Pejabat/Eselon I"
                                    wrapperClassName="mt-4"
                                    value={values.peselon1}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {touched.peselon1 && errors.peselon1 && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.peselon1}</span>}
                            </div>
                            <div>
                                <TextInput 
                                    id="peselon2"
                                    name="peselon2"
                                    withLabel
                                    label="Pejabat/Eselon II"
                                    placeholder="Pejabat/Eselon II"
                                    wrapperClassName="mt-4"
                                    value={values.peselon2}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {touched.peselon2 && errors.peselon2 && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.peselon2}</span>}
                            </div>
                            <div>
                                <TextInput 
                                    id="g4eselon4"
                                    name="g4eselon4"
                                    withLabel
                                    label="Eselon III/ Gol IV"
                                    placeholder="Eselon III/ Gol IV"
                                    wrapperClassName="mt-4"
                                    value={values.g4eselon4}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {touched.g4eselon4 && errors.g4eselon4 && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.g4eselon4}</span>}
                            </div>
                        </SectionForm>

                        <SectionForm
                            column="3"
                            gap="4"
                        >
                            <div>
                                <TextInput 
                                    id="g3eselon3"
                                    name="g3eselon3"
                                    withLabel
                                    label="Eselon IV/ Gol III"
                                    placeholder="Eselon IV/ Gol III"
                                    wrapperClassName="mt-4"
                                    value={values.g3eselon3}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {touched.g3eselon3 && errors.g3eselon3 && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.g3eselon3}</span>}
                            </div>

                            <div>
                                <TextInput 
                                    id="g2eselon1"
                                    name="g2eselon1"
                                    withLabel
                                    label="Eselon I/ Gol II"
                                    placeholder="Eselon I/ Gol II"
                                    wrapperClassName="mt-4"
                                    value={values.g2eselon1}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {touched.g2eselon1 && errors.g2eselon1 && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.g2eselon1}</span>}
                            </div>
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
                                    {contentType === 'Add' ? 'Tambah Biaya Penginapan SPPD' : 'Edit Penginapan SPPD' }
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

        // </WrapperForm>
    )
}