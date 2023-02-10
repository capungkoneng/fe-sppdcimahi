import { Button, SectionForm, TextInput, WrapperForm } from "Components"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { AddDataRepresentais, EditDataRepresentasi } from "Services";
import { RepresentasiSchema } from "./data/RepresentasiSchema";

export const FormInput = ({
    onCallback = () => {},
    item = null,
    contentType = 'Add'
}) => {
    const [data, setData] = useState({
        uraian: '',
        satuan: '',
        luar_kota: '',
        dalam_kota: '',
    });

    useEffect(() => {
        if (item) {
            setData({
                uraian: item.uraian,
                satuan: item.satuan,
                luar_kota: item.luar_kota,
                dalam_kota: item.dalam_kota
            });
        }
    }, [item]);


    const addData = async (payload) => {
        try {
            const response = await AddDataRepresentais(payload);
            if (response.data) {
                onCallback({success: true});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editData = async (payload) => {
        try {
            const response = await EditDataRepresentasi(item?.id, payload);
            if (response.data) {
                onCallback({success: true});
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <WrapperForm
            title={`${contentType === 'Edit' ? 'Edit' : 'Tambah'} Data Biaya Representasi SPPD`}
        >

            <Formik
                initialValues={data}
                enableReinitialize
                onSubmit={value => contentType === 'Edit' ? editData(value) : addData(value)}
                validationSchema={RepresentasiSchema}
            >
                {({errors, touched, handleChange, handleSubmit, values}) => (
                    <Form>
                        <SectionForm
                            column="1"
                        >
                            <div>
                                <TextInput 
                                    id="uraian"
                                    name="uraian"
                                    withLabel
                                    label="Uraian"
                                    placeholder="Uraian"
                                    value={values.uraian}
                                    onChange={handleChange}
                                />
                                {touched.uraian && errors.uraian && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.uraian}</span>}
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
                                />
                                {touched.dalam_kota && errors.dalam_kota && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.dalam_kota}</span>}
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