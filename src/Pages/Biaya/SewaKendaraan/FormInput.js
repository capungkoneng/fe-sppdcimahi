import { Button, InputSelect, SectionForm, TextInput, WrapperForm } from "Components"
import { Form, Formik } from "formik";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { AddSewaKendaraan, EditSewaKendaraan } from "Services";

export const FormInput = ({
    onCallback = () => {},
    listProvince = [],
    item = null,
    contentType = 'Add'
}) => {
    const [data, setData] = useState({
        provinsi: '',
        satuan: '',
        roda4: '',
        roda6_biskecil: '',
        roda6_bisbesar: '',
        taxi: ''
    });

    useEffect(() => {
        if (item) {
            setData({
                provinsi: item.provinsi,
                satuan: item.satuan,
                roda4: item.roda4,
                roda6_bisbesar: item.roda6_bisbesar,
                roda6_biskecil: item.roda6_biskecil,
                taxi: item.taxi
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddSewaKendaraan(payload);
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
            const response = await EditSewaKendaraan(item?.id, payload);
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
                            column="4"
                            gap="4"
                            className="mt-8"
                        >
                            <TextInput 
                                id="roda4"
                                name="roda4"
                                withLabel
                                label="Roda 4"
                                placeholder="Roda 4"
                                value={values.roda4}
                                onChange={handleChange}
                                type="number"
                            />
                            <TextInput 
                                id="roda6_biskecil"
                                name="roda6_biskecil"
                                withLabel
                                label="Roda 6 / Bis Kecil"
                                placeholder="Roda 6 / Bis Kecil"
                                value={values.roda6_biskecil}
                                onChange={handleChange}
                                type="number"
                            />

                            <TextInput 
                                id="roda6_bisbesar"
                                name="roda6_bisbesar"
                                withLabel
                                label="Roda 6 / Bis Besar"
                                placeholder="Roda 6 / Bis Besar"
                                value={values.roda6_bisbesar}
                                onChange={handleChange}
                                type="number"
                            />

                            <TextInput 
                                id="taxi"
                                name="taxi"
                                withLabel
                                label="Taxi"
                                placeholder="Taxi"
                                value={values.taxi}
                                onChange={handleChange}
                                type="number"
                            />
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