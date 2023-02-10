import {
    Button,
    Table, 
    TableContent,
    SectionForm,
    TextInput,
    InputSelect,
    WrapperForm,
} from "Components";
import { useEffect, useState } from "react"
import { Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddDataKwitansi } from "Services";
import { toast } from "react-toastify";

export const FormInput = ({
    onCallback = () => {},
    contentType = "Add",
    item = null,
}) => {
    const [data, setData] = useState({
        no_spd: "",
        no_spt: "",
        nik: "",
        nama: "",
        tgl: new Date(),
        no_kwt: "",
        tgl_berangkat: new Date(),
        tgl_mulai: new Date(),
        tgl_pulang: new Date(),
        tujuan: "",
        kegiatan: "",
        sub_kegiatan: "",
        kode_rek: "",
        bidang: "",
        vkwitansi: [
            {
                uraian: "transportasi",
                nilai_rill: "90000",
                nilai_disetujui: "90000"
            }
        ]
    });

    console.log(data)
    useEffect(() => {
        if (item) {
            setData({
                no_spd: item.no_spd,
                no_spt: item.no_spt,
                nik: item.nik,
                nama: item.nama,
                tgl: new Date(item.tgl),
                no_kwt: item.no_kwt,
                tgl_berangkat: new Date(item.tgl_berangkat),
                tgl_mulai: new Date(item.tgl_mulai),
                tgl_pulang: new Date(item.tgl_pulang),
                tujuan: item.tujuan,
                kegiatan: item.kegiatan,
                sub_kegiatan: item.sub_kegiatan,
                kode_rek: item.kode_rek,
                bidang: item.bidang,
            });
        }
    }, [item]);


    const addDataKwitansi = async (payload) => {
        console.log(payload)
        try {
          const response = await AddDataKwitansi(payload);
          if (response.data) {
            console.log(response.data)
            onCallback({ success: true });
            toast.success("Berhasil tambah data");
          }
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className="wrapper-content">
            <Formik
                initialValues={data}
                enableReinitialize
                onSubmit={(value) =>
                    contentType === addDataKwitansi(value)
                  }
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <Form>
                        <SectionForm
                            column="3"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <WrapperForm
                                    title={"Tambah Data Kwitansi"}>
                                </WrapperForm>    
                            </div>
                            <div>
                                <TextInput
                                    id="no_kwt"
                                    name="no_kwt"
                                    withLabel
                                    label="No KWT"
                                    value={values.no_kwt}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="text-gray-700">Tgl</label>
                                <DatePicker
                                    selected={new Date(values.tgl)}
                                    className="base-input px-10 mt-2"
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(value) => setFieldValue("tgl", value)}
                                />
                            </div>
                        </SectionForm>
                        <SectionForm
                            column="3"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <TextInput
                                    id="no_spd"
                                    name="no_spd"
                                    withLabel
                                    label="No SPD"
                                    value={values.no_spd}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextInput
                                    id="nik"
                                    name="nik"
                                    withLabel
                                    label="NIK"
                                    value={values.nik}
                                    onChange={handleChange}
                                />
                            </div>
                        </SectionForm>
                        <SectionForm
                            column="3"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <TextInput
                                    id="no_spt"
                                    name="no_spt"
                                    withLabel
                                    label="No SPT"
                                    value={values.no_spt}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextInput
                                    id="nama"
                                    name="nama"
                                    withLabel
                                    label="Nama"
                                    value={values.nama}
                                    onChange={handleChange}
                                />
                            </div>
                        </SectionForm>
                        <SectionForm
                            column="2"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <TextInput
                                    id="tujuan"
                                    name="tujuan"
                                    withLabel
                                    label="Tujuan"
                                    value={values.tujuan}
                                    onChange={handleChange}
                                />
                            </div>
                        </SectionForm>
                        <SectionForm
                            column="3"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <label className="text-gray-700">Tgl Berangkat</label>
                                <DatePicker
                                    selected={new Date(values.tgl_berangkat)}
                                    className="base-input px-10 mt-2"
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(value) => setFieldValue("tgl_berangkat", value)}
                                />
                            </div>
                            <div>
                                <label className="text-gray-700">Tgl Mulai</label>
                                <DatePicker
                                    selected={new Date(values.tgl_mulai)}
                                    className="base-input px-10 mt-2"
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(value) => setFieldValue("tgl_mulai", value)}
                                />
                            </div>
                            <div>
                                <label className="text-gray-700">Tgl Pulang</label>
                                <DatePicker
                                    selected={new Date(values.tgl_pulang)}
                                    className="base-input px-10 mt-2"
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(value) => setFieldValue("tgl_pulang", value)}
                                />
                            </div>
                        </SectionForm>
                        <SectionForm
                            column="2"
                            gap="4"
                            className="mt-8"
                        >   
                            <div>
                                <WrapperForm
                                    title={"Verifikasi Biaya SPPD"}>
                                </WrapperForm>    
                            </div>
                        </SectionForm>
                        <Table
                            listLabel={[
                                {id: 'Uraian', name: 'Uraian'},
                                {id: 'Nilai Riil', name: 'Nilai Riil'},
                                {id: 'Nilai Disetujui', name: 'Nilai Disetujui'},
                            ]}
                        >
                            <tr>
                                <TableContent>
                                    Uang Harian
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilai_rill"
                                        name="nilai_rill"
                                        onChange={handleChange}
                                    />
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilai_disetujui"
                                        name="nilai_disetujui"
                                        onChange={handleChange}
                                    />
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Transportasi 
                                    Dari Kantor ke 
                                    bandara / Stasiun 
                                    / terminal PP 
                                    tiket lain lain
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilHarian"
                                        name="nilaiRiilHarian"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilDisetujui"
                                        name="nilaiRiilDisetujui"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Penginapan
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilHarian"
                                        name="nilaiRiilHarian"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilDisetujui"
                                        name="nilaiRiilDisetujui"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Biaya Pengeluaran Riil
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilHarian"
                                        name="nilaiRiilHarian"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilDisetujui"
                                        name="nilaiRiilDisetujui"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Uang Repsentatif
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilHarian"
                                        name="nilaiRiilHarian"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilDisetujui"
                                        name="nilaiRiilDisetujui"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Lain - lain
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilHarian"
                                        name="nilaiRiilHarian"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilDisetujui"
                                        name="nilaiRiilDisetujui"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Lain - lain
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilHarian"
                                        name="nilaiRiilHarian"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilDisetujui"
                                        name="nilaiRiilDisetujui"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                            </tr>
                            <tr>
                                <TableContent>
                                    Lain - lain
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilHarian"
                                        name="nilaiRiilHarian"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                                <TableContent>
                                    <TextInput
                                        id="nilaiRiilDisetujui"
                                        name="nilaiRiilDisetujui"
                                        // onChange={handleChange}
                                    />
                                </TableContent>
                            </tr>
                        </Table>
                        <Table
                            listLabel={[
                                {id: 'Kegiatan', name: 'Kegiatan'},
                                {id: 'Sub Kegiatan', name: 'Sub Kegiatan'},
                                {id: 'Kode Rekening', name: 'Kode Rekening'},
                                {id: 'Bidang', name: 'Bidang'},
                            ]}
                        >
                            <tr>
                                <TableContent>
                                    <InputSelect 
                                        id="kegiatan"
                                        name="kegiatan"
                                        onChange={handleChange}
                                    >
                                        <option value="Services">Services</option>
                                    </InputSelect>
                                </TableContent>
                                <TableContent>
                                    <InputSelect 
                                        id="sub_kegiatan"
                                        name="sub_kegiatan"
                                        onChange={handleChange}
                                    >
                                        <option value="Maintanance">Maintanance</option>
                                    </InputSelect>
                                </TableContent>
                                <TableContent>
                                    <InputSelect 
                                        id="kode_rek"
                                        name="kode_rek"
                                        onChange={handleChange}
                                    >
                                        <option value="029231">029231</option>
                                    </InputSelect>
                                </TableContent>
                                <TableContent>
                                    <InputSelect 
                                        id="bidang"
                                        name="bidang"
                                        onChange={handleChange}
                                    >
                                        <option value="Instalasi">Instalasi</option>
                                    </InputSelect>
                                </TableContent>
                            </tr>
                        </Table>
                        <div className="mt-10 flex pb-10 md:pb-0 lg:pb-0 justify-center md:justify-end lg:justify-end">
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full md:w-60 lg:w-60"
                                backgroundColor="bg-orange-500"
                            >
                                Simpan
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};