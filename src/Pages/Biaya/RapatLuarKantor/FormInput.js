import { Button, InputSelect, SectionForm, TextInput, WrapperForm } from "Components"
import { Form, Formik } from "formik";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { AddDataRapat, EditDataRapat } from "Services";
import { RapatSchema } from "./data/RapatSchema";

export const FormInput = ({
    onCallback = () => {},
    listProvince = [],
    item = null,
    contentType = 'Add'
}) => {

    const [data, setData] = useState({
        provinsi: '',
        satuan: '',
        fullboard_luarkota: '',
        fullboard_dalemkota: '',
        fullday: ''
    });

    useEffect(() => {
        if (item) {
            setData({
                provinsi: item.provinsi,
                satuan: item.satuan,
                fullboard_dalemkota: item.fullboard_dalemkota,
                fullboard_luarkota: item.fullboard_luarkota,
                fullday: item.fullday
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddDataRapat(payload);
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
            const response = await EditDataRapat(item?.id, payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil edit data");
            } 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <WrapperForm
            title={`${contentType === 'Edit' ? 'Edit' : 'Tambah'} Data Biaya Harian SPPD`}
        >

            <Formik
                initialValues={data}
                enableReinitialize
                onSubmit={(value) => contentType === 'Edit' ? editData(value) : addData(value)}
                validationSchema={RapatSchema}
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
                            className="mt-4"
                        >
                            <div>
                                <TextInput 
                                    id="fullboard_luarkota"
                                    name="fullboard_luarkota"
                                    withLabel
                                    label="FullBoard Luar Kota"
                                    placeholder="FullBoard Luar Kota"
                                    value={values.fullboard_luarkota}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {touched.fullboard_luarkota && errors.fullboard_luarkota && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.fullboard_luarkota}</span>}
                            </div>

                            <div>
                                <TextInput
                                    id="fullboard_dalemkota"
                                    name="fullboard_dalemkota" 
                                    withLabel
                                    label="FullBoard Dalam Kota"
                                    placeholder="FullBoard Dalam Kota"
                                    value={values.fullboard_dalemkota}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {touched.fullboard_dalemkota && errors.fullboard_dalemkota && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.fullboard_dalemkota}</span>}
                            </div>

                            <div>
                                <TextInput 
                                    id="fullday"
                                    name="fullday"
                                    withLabel
                                    label="Full / Half Day Dalam Kota"
                                    placeholder="Full / Half Day Dalam Kota"
                                    value={values.fullday}
                                    onChange={handleChange}
                                    type="number"
                                />
                                {touched.fullday && errors.fullday && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.fullday}</span>}
                            </div>
                        </SectionForm>

                        <div className="mt-10 flex pb-10 md:pb-0 lg:pb-0 justify-center md:justify-end lg:justify-end">
                            <Button onClick={handleSubmit} className="w-full md:w-60 lg:w-60" backgroundColor="bg-orange-500">Simpan</Button>
                        </div>
                    </Form>
                )}

            </Formik>

        </WrapperForm>
    )
}