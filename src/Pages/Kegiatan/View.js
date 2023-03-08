import { useState } from "react"
import Multiselect from 'multiselect-react-dropdown';
import moment from "moment";
import { EditKegiatan, ApproveKegiatan } from "Services/Kegiatan";
import { toast } from "react-toastify";

export const View = ({
    data = [],
    listPegawai = [],
    onCallback = () => {},
}) => {

    const [pegawai,setPegawai] = useState([])

    const editData = async (status) => {
        let payload = {
            status: status
        }
        try {
            const response = await EditKegiatan(data?.id, payload);
            if (response.data) {
                onCallback({success: true});
                toast.success(`${status === '0' ? 'Berhasil rejected kegiatan' : 'Berhasil submit kegiatan' }`);
            } 
        } catch (error) {
            console.log(error);
        }
    }

    const AccKegiatan = async (payload) => {
        let data = {
            id: payload.id,
            status_kegiatan: '3'
        }
        let dataBody = { ...data, pegawai: pegawai }

        try {
            const response = await ApproveKegiatan(dataBody);
            if (response.data) {
                onCallback({success: true});
                toast.success('Berhasil Approve kegiatan');
            } 
        } catch (error) {
            console.log(error);
        }
    }

    const filterPegawai = (jabatan) => {
        const dataPegawai = listPegawai.filter(val => val.jabatan.includes(jabatan));
        return dataPegawai
    }

    const onSelect = (selectedPegawai,payload) => {
        const datasPegawai = []

        selectedPegawai.map( (data) => {
            let dataPegawai = {
                nama: data.jabatan,
                nama_pegawai: data.nama,
                kegiatan_id: payload.id,
                pangkat: data.pangkat,
                gol: data.gol,
                nip: data.nip
            }
            datasPegawai.push(dataPegawai)
        })
        const listDatasPegawai = [...pegawai,...datasPegawai]
        const listDataPegawai = listDatasPegawai.filter( (val, index) => 
            index === listDatasPegawai.findIndex(
                other => val.nama_pegawai === other.nama_pegawai
            )
        );
        return setPegawai(listDataPegawai)
    }

    // const onRemove = (selectedPegawai,payload) => {
    //     const datasPegawai = []

    //     selectedPegawai.map( (data) => {
    //         let dataPegawai = {
    //             nama: data.jabatan,
    //             nama_pegawai: data.nama,
    //             kegiatan_id: payload.id    
    //         }
    //         datasPegawai.push(dataPegawai)
    //     })
    //     const listDatasPegawai = [...pegawai,...datasPegawai]
    //     const listDataPegawai = listDatasPegawai.filter( (val, index) => 
    //         index === listDatasPegawai.findIndex(
    //             other => val.nama_pegawai === other.nama_pegawai
    //         )
    //     );
    //     return setPegawai(listDataPegawai)
    // }

    return (
        <div>
            { data !== null ? (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>No Surat</div>
                            <div>: { data.no_surat }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Provinsi</div>
                            <div>: { data.tujuan_provinsi }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Kota</div>
                            <div>: { data.kota }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Lokasi</div>
                            <div>: { data.lokasi }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Tanggal Berangkat</div>
                            <div>: { moment(data.tgl_berangkat).format('DD-MMMM-YYYY') }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Tanggal Mulai</div>
                            <div>: { moment(data.tgl_mulai).format('DD-MMMM-YYYY') }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Tanggal Selesai</div>
                            <div>: { moment(data.tgl_selesai).format('DD-MMMM-YYYY') }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Tahun Anggaran</div>
                            <div>: { data.tahun_anggaran }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Kendaraan</div>
                            <div>: { data.berangkat }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>File Surat</div>
                            <div>: <a href={data.upload} target="_blank" rel="noreferrer">File surat</a></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                            <div>Keperluan</div>
                            <div className="col-span-3">: { data.keperluan }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4  mt-4">
                            <div>Keterangan</div>
                            <div className="col-span-3">: { data.keterangan }</div>    
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                        <div>Rekomendasi Peserta Jabatan</div>
                        <div className="col-span-3">: { data.lsjabatan.map( (jabatan) => { return jabatan.nama + ', ' }) }</div>
                    </div>
                    {
                        data.status === '2' ? (
                            <div className="grid grid-cols-4 gap-4 mt-2">
                                <div>peserta</div>
                                <div className="col-span-3">
                                    <div className="grid grid-cols-3 gap-1">
                                        {
                                            data.lsjabatan.map( (jabatan,i) => {
                                                return (
                                                    <>
                                                        <div key={i}>{ jabatan.nama }</div>
                                                        <div className="col-span-2">
                                                            <Multiselect
                                                                className='input-base w-full'
                                                                    options={filterPegawai(`${jabatan.nama}`)}
                                                                    placeholder='Pilih Pegawai'
                                                                    name={jabatan.nama}
                                                                    // selectedValues={selectedValue}
                                                                    onSelect={ (e) => onSelect(e,data)}
                                                                    // onRemove={onRemove}
                                                                    displayValue="nama"
                                                                />
                                                            </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : ''
                    }
                    <div className="mt-8 flex justify-end">
                        <div className="flex gap-2 items-center">
                            {
                                data.status === '1' ? (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-full border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                        onClick={() => {
                                            editData('0')
                                        }}
                                    >
                                        Rejected
                                    </button>
                                ) : null
                            }
                            {
                                data.status !== '3' ? (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-full border border-transparent bg-[#3F7459] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                        onClick={() => {
                                            data.status === '0' ? editData('1') : data.status === '1' ? editData('2') : AccKegiatan(data)
                                        }}
                                    >
                                        {data.status === '0' ? 'Submit' : 'Approve' }
                                    </button>
                                ) : null
                            }
                        </div>
                    </div>
                </>
            ) : ( null )
        }
        </div>
    )
}