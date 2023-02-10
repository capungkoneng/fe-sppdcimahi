import { Button, InputSelect, SectionForm, TextInput, WrapperForm } from "Components"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AddPegawai, EditPegawaiById } from "Services/Pegawai"
import { EmployeSchema } from "./data/EmployeSchema"

export const FormInput = ({
    onCallback = () => {},
    contentType = 'Add',
    item = null,
    listData = {
        jabatan: [],
        golongan: [],
        pangkat: []
    }
}) => {
    const [data, setData] = useState({
        nama: '',
        nip: '',
        jabatan: '',
        pangkat: '',
        phone: '',
        nama_bank: '',
        no_rek: '',
        nama_rek: ''
    });

    useEffect(() => {
        if (item !== null) {
            setData({
                nama: item.nama,
                nip: item?.nip,
                jabatan: item.jabatan,
                pangkat: item?.pangkat,
                phone: item?.phone,
                nama_bank: item?.nama_bank,
                no_rek: item?.no_rek,
                nama_rek: item?.nama_rek
            });
        }
    }, [item]);

    const addData = async (payload) => {
        try {
            const response = await AddPegawai(payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil Tambah Data");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editData = async (payload) => {
        try {
            const response = await EditPegawaiById(item?.id, payload);
            if (response.data) {
                onCallback({success: true});
                toast.success("Berhasil Edit Data");
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
                initialValues={{...data}}
                validationSchema={EmployeSchema}
                onSubmit={(value) => contentType === 'Edit' ? editData(value) : addData(value)}
                enableReinitialize
            >
                {({errors, touched, handleChange, handleSubmit, values}) => (
                    <Form>
                        <SectionForm
                            column="1"
                        >
                            <TextInput 
                                id="nama"
                                name="nama"
                                withLabel
                                label="Nama"
                                placeholder="Nama Pegawai"
                                value={values.nama}
                                onChange={handleChange}
                            />
                            {touched.nama && errors.nama && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama}</span>}

                            <TextInput 
                                id="nip"
                                name="nip"
                                withLabel
                                label="NIP"
                                placeholder="NIP"
                                value={values.nip}
                                onChange={handleChange}
                            />
                            {touched.nip && errors.nip && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nip}</span>}

                        </SectionForm>

                        <SectionForm
                            gap="4"
                            column="3"
                            className="mt-8"
                        >
                            <InputSelect
                                id="jabatan"
                                name="jabatan"
                                withLabel
                                label="Jabatan"
                                onChange={handleChange}
                                value={values.jabatan}
                            >
                                {
                                    listData.jabatan.map(value => {
                                        return <option key={value.id} value={value.nama}>{value.nama}</option>
                                    })
                                }
                            </InputSelect>

                            <InputSelect 
                                id="pangkat"
                                name="pangkat"
                                withLabel
                                label="Pangkat"
                                onChange={handleChange}
                                value={values.pangkat}
                            >
                                {
                                    listData.pangkat.map(value => {
                                        return <option key={value.id} value={value.nama}>{value.nama}</option>
                                    })
                                }
                            </InputSelect>

                            <InputSelect 
                                withLabel
                                label="Gol"
                            >
                                {
                                    listData.golongan.map(value => {
                                        return <option key={value.id} value={value.nama}>{value.nama}</option>
                                    })
                                }
                            </InputSelect>
                        </SectionForm>

                        <div className="mt-8">
                            <TextInput 
                                id="phone"
                                name="phone"
                                type="tel"
                                withLabel
                                label="Kontak"
                                placeholder="Kontak"
                                value={values.phone}
                                onChange={handleChange}
                            />
                            {touched.phone && errors.phone && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.phone}</span>}
                        </div>

                        <SectionForm
                            column="3"
                            gap="4"
                            className="mt-8"
                        >
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
                                    id="no_rek"
                                    name="no_rek"
                                    withLabel
                                    label="No Rek"
                                    placeholder="No Rek"
                                    value={values.no_rek}
                                    onChange={handleChange}
                                />
                                {touched.no_rek && errors.no_rek && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.no_rek}</span>}
                            </div>
                            
                            <div>
                                <TextInput 
                                    id="nama_rek"
                                    name="nama_rek"
                                    withLabel
                                    label="Nama Rek"
                                    placeholder="Nama Rek"
                                    value={values.nama_rek}
                                    onChange={handleChange}
                                />
                                {touched.nama_rek && errors.nama_rek && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nama_rek}</span>}
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