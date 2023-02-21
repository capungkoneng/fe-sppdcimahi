import { InputSelect, SectionForm, TextInput } from "Components"
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
        pangkat: [],
        bidang: []
    },
}) => {
    const [data, setData] = useState({
        nama: '',
        nip: '',
        jabatan: '',
        pangkat: '',
        phone: '',
        nama_bank: '',
        no_rek: '',
        nama_rek: '',
        gol: '',
        bidang: ''
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
                nama_rek: item?.nama_rek,
                gol: item?.gol,
                bidang: item?.bidang
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
                onCallback({success: true, contentType: 'Edit', data: payload});
                toast.success("Berhasil Edit Data");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
            <Formik
                initialValues={{...data}}
                validationSchema={EmployeSchema}
                onSubmit={(value) => contentType === 'Edit' ? editData(value) : addData(value)}
                enableReinitialize
            >
                {({errors, touched, handleChange, handleSubmit, values}) => (
                    <Form>
                        <SectionForm>
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
                        </SectionForm>
                        <SectionForm
                            gap="4"
                            column="3"
                            className="mt-8"
                        >

                            <TextInput 
                                id="nip"
                                name="nip"
                                type="number"
                                withLabel
                                label="NIP"
                                placeholder="NIP"
                                value={values.nip}
                                onChange={handleChange}
                            />
                            {touched.nip && errors.nip && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.nip}</span>}
                            <InputSelect 
                                id="bidang"
                                name="bidang"
                                withLabel
                                label="Bidang"
                                onChange={handleChange}
                                value={values.bidang}
                            >
                                {
                                    listData.bidang.map(value => {
                                        return <option key={value.id} value={value.nama}>{value.nama}</option>
                                    })
                                }
                            </InputSelect>
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
                        </SectionForm>

                        <SectionForm
                            gap="4"
                            column="3"
                            className="mt-8"
                        >

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
                                id="gol"
                                name="gol"
                                withLabel
                                label="Gol"
                                onChange={handleChange}
                                value={values.gol}
                            >
                                {
                                    listData.golongan.map(value => {
                                        return <option key={value.id} value={value.nama}>{value.nama}</option>
                                    })
                                }
                            </InputSelect>
                            
                            <TextInput 
                                id="phone"
                                name="phone"
                                type="number"
                                withLabel
                                label="Kontak"
                                placeholder="Kontak"
                                value={values.phone}
                                onChange={handleChange}
                            />
                            {touched.phone && errors.phone && <span className="mt-2 text-xs text-red-500 font-semibold">{errors.phone}</span>}
                        </SectionForm>

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
                                    type="number"
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

                        <div className="mt-8 flex justify-end">
                            <div className="flex gap-2 items-center">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-full border border-transparent bg-[#3F7459] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                >
                                    {contentType === 'Add' ? 'Tambah Pegawai' : 'Edit Pegawai' }
                                </button>
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>

        // </WrapperForm>
    )
}