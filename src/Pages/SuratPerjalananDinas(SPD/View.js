import { useEffect, useState } from "react";
import moment from "moment";
import Logo from 'Assets/icons/logo-kota-cimahi.png';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


export const View = ({
    data = null,
    pegawaiKepala = null,
    pegawaiKepalaDinas = null
}) => {

    const [activeTab, setActiveTab] = useState([]);
    const [pulang, setPulang] = useState(false);
    const [viewPage2, setViewPage2] = useState(false);
    const [dataColumn1, setDataColumn1] = useState({
        berangkat: '',
        ke: '',
        tanggal: '',
    });
    const [dataColumn2, setDataColumn2] = useState({
        tiba: '',
        tanggalTiba: '',
        berangkat: '',
        ke: '',
        tanggal: '',
    });
    const [dataColumn3, setDataColumn3] = useState({
        tiba: '',
        tanggalTiba: '',
        kepala: '',
        berangkat: '',
        ke: '',
        tanggal: '',
    });
    const [dataColumn4, setDataColumn4] = useState({
        tiba: '',
        tanggalTiba: '',
        kepala: '',
        berangkat: '',
        ke: '',
        tanggal: '',
    });
    const [dataColumn5, setDataColumn5] = useState({
        tiba: '',
        tanggalTiba: '',
        kepala: '',
        berangkat: '',
        ke: '',
        tanggal: '',
    });
    const [dataColumn6, setDataColumn6] = useState({
        tiba: '',
        tanggalTiba: '',
    });

    useEffect(() => {
        if (data) {
            setActiveTab(data.spt.kegiatan.lsnamajbatan[0]);
        }
    }, [data]);

    const onChangeDataColumn1 = (value,key) => {
        if(key === 'berangkat'){
            setDataColumn1({
                berangkat: value,
                ke: dataColumn1.ke,
                tanggal: dataColumn1.tanggal,
            })
        }else if(key === 'ke'){
            setDataColumn1({
                berangkat: dataColumn1.berangkat,
                ke: value,
                tanggal: dataColumn1.tanggal,
            })
        }else{
            setDataColumn1({
                berangkat: dataColumn1.berangkat,
                ke: dataColumn1.ke,
                tanggal: value,
            })
        }
    }

    const onChangeDataColumn2 = (value,key) => {
        if(key === 'tiba'){
            setDataColumn2({
                tiba: value,
                tanggalTiba: dataColumn2.tanggalTiba,
                berangkat: dataColumn2.berangkat,
                ke: dataColumn2.ke,
                tanggal: dataColumn2.tanggal,
            })
        }else if(key === 'tanggalTiba'){
            setDataColumn2({
                tiba: dataColumn2.tiba,
                tanggalTiba: value,
                berangkat: dataColumn2.berangkat,
                ke: dataColumn2.ke,
                tanggal: dataColumn2.tanggal,
            })
        }else if(key === 'berangkat'){
            setDataColumn2({
                tiba: dataColumn2.tiba,
                tanggalTiba: dataColumn2.tanggalTiba,
                berangkat: value,
                ke: dataColumn2.ke,
                tanggal: dataColumn2.tanggal,
            })
        }else if(key === 'ke'){
            setDataColumn2({
                tiba: dataColumn2.tiba,
                tanggalTiba: dataColumn2.tanggalTiba,
                berangkat: dataColumn2.berangkat,
                ke: value,
                tanggal: dataColumn2.tanggal,
            })
        }else{
            setDataColumn2({
                tiba: dataColumn2.tiba,
                tanggalTiba: dataColumn2.tanggalTiba,
                berangkat: dataColumn2.berangkat,
                ke: dataColumn2.ke,
                tanggal: value,
            })
        }
    }

    const onChangeDataColumn3 = (value,key) => {
        if(key === 'tiba'){
            setDataColumn3({
                tiba: value,
                tanggalTiba: dataColumn3.tanggalTiba,
                kepala: dataColumn3.kepala,
                berangkat: dataColumn3.berangkat,
                ke: dataColumn3.ke,
                tanggal: dataColumn3.tanggal,
            })
        }else if(key === 'tanggalTiba'){
            setDataColumn3({
                tiba: dataColumn3.tiba,
                tanggalTiba: value,
                kepala: dataColumn3.kepala,
                berangkat: dataColumn3.berangkat,
                ke: dataColumn3.ke,
                tanggal: dataColumn3.tanggal,
            })
        }else if(key === 'kepala'){
            setDataColumn3({
                tiba: dataColumn3.tiba,
                tanggalTiba: dataColumn3.tanggalTiba,
                kepala: value,
                berangkat: dataColumn3.berangkat,
                ke: dataColumn3.ke,
                tanggal: dataColumn3.tanggal,
            })
        }else if(key === 'berangkat'){
            setDataColumn3({
                tiba: dataColumn3.tiba,
                tanggalTiba: dataColumn3.tanggalTiba,
                kepala: dataColumn3.kepala,
                berangkat: value,
                ke: dataColumn3.ke,
                tanggal: dataColumn3.tanggal,
            })
        }else if(key === 'ke'){
            setDataColumn3({
                tiba: dataColumn3.tiba,
                tanggalTiba: dataColumn3.tanggalTiba,
                kepala: dataColumn3.kepala,
                berangkat: dataColumn3.berangkat,
                ke: value,
                tanggal: dataColumn3.tanggal,
            })
        }else{
            setDataColumn3({
                tiba: dataColumn3.tiba,
                tanggalTiba: dataColumn3.tanggalTiba,
                kepala: dataColumn3.kepala,
                berangkat: dataColumn3.berangkat,
                ke: dataColumn3.ke,
                tanggal: value,
            })
        }
    }

    const onChangeDataColumn4 = (value,key) => {
        if(key === 'tiba'){
            setDataColumn4({
                tiba: value,
                tanggalTiba: dataColumn4.tanggalTiba,
                kepala: dataColumn4.kepala,
                berangkat: dataColumn4.berangkat,
                ke: dataColumn4.ke,
                tanggal: dataColumn4.tanggal,
            })
        }else if(key === 'tanggalTiba'){
            setDataColumn4({
                tiba: dataColumn4.tiba,
                tanggalTiba: value,
                kepala: dataColumn4.kepala,
                berangkat: dataColumn4.berangkat,
                ke: dataColumn4.ke,
                tanggal: dataColumn4.tanggal,
            })
        }else if(key === 'kepala'){
            setDataColumn4({
                tiba: dataColumn4.tiba,
                tanggalTiba: dataColumn4.tanggalTiba,
                kepala: value,
                berangkat: dataColumn4.berangkat,
                ke: dataColumn4.ke,
                tanggal: dataColumn4.tanggal,
            })
        }else if(key === 'berangkat'){
            setDataColumn4({
                tiba: dataColumn4.tiba,
                tanggalTiba: dataColumn4.tanggalTiba,
                kepala: dataColumn4.kepala,
                berangkat: value,
                ke: dataColumn4.ke,
                tanggal: dataColumn4.tanggal,
            })
        }else if(key === 'ke'){
            setDataColumn4({
                tiba: dataColumn4.tiba,
                tanggalTiba: dataColumn4.tanggalTiba,
                kepala: dataColumn4.kepala,
                berangkat: dataColumn4.berangkat,
                ke: value,
                tanggal: dataColumn4.tanggal,
            })
        }else{
            setDataColumn4({
                tiba: dataColumn4.tiba,
                tanggalTiba: dataColumn4.tanggalTiba,
                kepala: dataColumn4.kepala,
                berangkat: dataColumn4.berangkat,
                ke: dataColumn4.ke,
                tanggal: value,
            })
        }
    }

    const onChangeDataColumn5 = (value,key) => {
        if(key === 'tiba'){
            setDataColumn5({
                tiba: value,
                tanggalTiba: dataColumn5.tanggalTiba,
                kepala: dataColumn5.kepala,
                berangkat: dataColumn5.berangkat,
                ke: dataColumn5.ke,
                tanggal: dataColumn5.tanggal,
            })
        }else if(key === 'tanggalTiba'){
            setDataColumn5({
                tiba: dataColumn5.tiba,
                tanggalTiba: value,
                kepala: dataColumn5.kepala,
                berangkat: dataColumn5.berangkat,
                ke: dataColumn5.ke,
                tanggal: dataColumn5.tanggal,
            })
        }else if(key === 'kepala'){
            setDataColumn5({
                tiba: dataColumn5.tiba,
                tanggalTiba: dataColumn5.tanggalTiba,
                kepala: value,
                berangkat: dataColumn5.berangkat,
                ke: dataColumn5.ke,
                tanggal: dataColumn5.tanggal,
            })
        }else if(key === 'berangkat'){
            setDataColumn5({
                tiba: dataColumn5.tiba,
                tanggalTiba: dataColumn5.tanggalTiba,
                kepala: dataColumn5.kepala,
                berangkat: value,
                ke: dataColumn5.ke,
                tanggal: dataColumn5.tanggal,
            })
        }else if(key === 'ke'){
            setDataColumn5({
                tiba: dataColumn5.tiba,
                tanggalTiba: dataColumn5.tanggalTiba,
                kepala: dataColumn5.kepala,
                berangkat: dataColumn5.berangkat,
                ke: value,
                tanggal: dataColumn5.tanggal,
            })
        }else{
            setDataColumn5({
                tiba: dataColumn5.tiba,
                tanggalTiba: dataColumn5.tanggalTiba,
                kepala: dataColumn5.kepala,
                berangkat: dataColumn5.berangkat,
                ke: dataColumn5.ke,
                tanggal: value,
            })
        }
    }

    const onChangeDataColumn6 = (value,key) => {
        if(key === 'tiba'){
            setDataColumn6({
                tiba: value,
                tanggalTiba: dataColumn5.tanggalTiba,
            })
        }else{
            setDataColumn6({
                tiba: dataColumn5.tiba,
                tanggalTiba: value,
            })
        }
    }

    const printDocument = () => {
        setViewPage2(true)
        const doc = document.getElementById("divToPrint");
        const doc2 = document.getElementById("divToPrint2");
        const namePDF = activeTab.nama_pegawai
        html2canvas(doc).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            html2canvas(doc2).then((canvas) => {
                const imgData2 = canvas.toDataURL("image/png");
                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "cm",
                    format: [21, 33]  
                });
                if(pulang){
                    pdf.addImage(imgData2, "JPEG", 0, 0);
                    window.open(pdf.output('bloburl'), '_blank');
                    // pdf.save(`SPD_${namePDF}.pdf`);
                }else{
                    pdf.addImage(imgData, "JPEG", 0, 0);
                    pdf.addPage()
                    pdf.addImage(imgData2, "JPEG", 0, 0);
                    // window.open(pdf.output('bloburl'), '_blank');
                    pdf.save(`SPD_${namePDF}.pdf`);
                }
                setViewPage2(false)
            });
        });
    };

    const Tiba = () => {
        setPulang(!pulang)
        setDataColumn1({
            berangkat: '',
            ke: '',
            tanggal: '',
        })
        setDataColumn2({
            tiba: '',
            tanggalTiba: '',
            berangkat: '',
            ke: '',
            tanggal: '',
        })
        setDataColumn3({
            tiba: '',
            tanggalTiba: '',
            kepala: '',
            berangkat: '',
            ke: '',
            tanggal: '',
        })
        setDataColumn4({
            tiba: '',
            tanggalTiba: '',
            kepala: '',
            berangkat: '',
            ke: '',
            tanggal: '',
        })
        setDataColumn5({
            tiba: '',
            tanggalTiba: '',
            kepala: '',
            berangkat: '',
            ke: '',
            tanggal: '',
        })
        setDataColumn6({
            tiba: '',
            tanggalTiba: '',
        })
    }

    const days = (berangkat,selesai) => {
        var TglBerangkat = moment(berangkat);
        var TglSelesai = moment(selesai);
        return TglBerangkat.diff(TglSelesai, 'days')+1
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-4">
                {
                    data !== null ? (
                        data.spt.kegiatan.lsnamajbatan.map(value => {
                            return (
                                <button 
                                    key={value.id}
                                    className={`text-base font-semibold ${activeTab.nama_pegawai === value.nama_pegawai ? 'text-[#66B6FF] border-b-4 border-[#66B6FF]' : 'text-[#9A9A9A]'}`}
                                    onClick={() => setActiveTab(value)}
                                >
                                    {value.nama_pegawai}
                                </button>
                            )
                        })
                    ) : null
                }

            </div>
            <div className="mt-8 flex justify-start">
                <div className="flex gap-2 items-center">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-full border border-transparent bg-[#3F7459] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={() => {
                            printDocument()
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                        </svg> Export PDF
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-full border border-transparent bg-[#3F7459] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={() => {
                            Tiba()
                        }}
                    >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
                    </svg> { pulang ? 'Belum tiba' : 'Sudah tiba' }
                    </button>
                </div>
            </div>
            <div className={`w-3/4 border mt-6 mx-32 ${ pulang ? 'hidden' : '' }`}>
                <div className="pl-8 pr-16 pt-6 text-black" id="divToPrint">
                    <div>
                        <div className="relative inline">
                            <div className="flex border-b-4 border-black">
                                <img src={Logo} alt="logo" className="h-24 w-24 ml-14 mt-4"/>
                                <div className="text-center ml-14 mb-2">
                                    <h1 className="text-lg font-semibold">PEMERINTAH DAERAH KOTA CIMAHI</h1>
                                    <h1 className="text-xl font-bold">DINAS PANGAN DAN PERTANIAN</h1>
                                    <p className="text-sm">Jl. Rd. Deman Hardjakusumah Blok Jati Cihanjuang</p>
                                    <p className="text-sm">Telp/Fax: (022) 20665337 Website : <span className="underline">www.cimahikota.go.id</span></p>
                                    <p className="text-sm">E-mail: dispangtan@cimahikota.go.id Cimahi 40513 Jawa Barat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-8 gap-4 mt-2">
                            <div className="col-span-5"></div>
                            <div className="col-span-3 text-sm">Lembar Ke : </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-8 gap-4">
                            <div className="col-span-5"></div>
                            <div className="col-span-3 text-sm">Kode No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-8 gap-4">
                            <div className="col-span-5"></div>
                            <div className="col-span-3 text-sm">Nomor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </div>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <h1 className="font-bold text-lg">SURAT PERJALANAN DINAS (SPD)</h1>
                    </div>
                    <div className="mt-2">
                        <table className="table-fixed border border-black w-full text-sm">
                            <tbody>
                                <tr>
                                    <td className="w-[5%] text-center border border-black pb-2">1.</td>
                                    <td className="w-[35%] border border-black px-2 pb-2">Pengguna Anggaran / Kuasa Pengguan Anggaran</td>
                                    <td className="w-[60%] border border-black px-2 pb-2">Kepala Dinas dan Pertanian</td>
                                </tr>
                                <tr>
                                    <td className="w-[5%] text-center border border-black pb-2">2.</td>
                                    <td className="w-[35%] border border-black px-2 pb-2">Nama / NIP Pegawai yang melaksanakan perjalanan dinas</td>
                                    <td className="w-[60%] border border-black px-2 pb-2">
                                        <p className="m-0">{ activeTab !== null ? activeTab.nama_pegawai : '' }</p>
                                        <p className="m-0">{ activeTab !== null ? `NIP. ${activeTab.nip}` : '' }</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[5%] text-center border border-black pb-2">3.</td>
                                    <td className="w-[35%] border border-black px-2 py-1 pb-2">
                                        <p className="m-0">a. Pangkat dan Golongan</p>
                                        <p className="m-0">b. Jabatan/Instansi</p>
                                        <p className="m-0">c. Tingkat Biaya Perjalan Dinas</p>
                                    </td>
                                    <td className="w-[60%] border border-black px-2 pb-2">
                                        <p className="m-0">a. { activeTab !== null ? `${activeTab.pangkat} / ${activeTab.gol}` : '' }</p>
                                        <p className="m-0">b. { activeTab !== null ? `${activeTab.nama} / Dinas Pangan dan Pertanian` : '' }</p>
                                        <p className="m-0">c. </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[5%] text-center border border-black pb-2">4.</td>
                                    <td className="w-[35%] border border-black px-2 pb-2">
                                        <p className="m-0">Maksud perjalanan dinas</p>
                                    </td>
                                    <td className="w-[60%] border border-black px-2 pb-2">
                                        <p className="m-0 text-justify">{ data !== null ? data.spt.kegiatan.keperluan : '' }</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[5%] text-center border border-black pb-2">5.</td>
                                    <td className="w-[35%] border border-black px-2 pb-2">
                                        <p className="m-0">Alat Angkut yang dipergunakan</p>
                                    </td>
                                    <td className="w-[60%] border border-black px-2 pb-2">
                                        <p className="m-0"></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[5%] text-center border border-black pb-2">6.</td>
                                    <td className="w-[35%] border border-black px-2 pb-2">
                                        <p className="m-0">a. Tempat Berangkat</p>
                                        <p className="m-0">b. Tempat Tujuan</p>
                                    </td>
                                    <td className="w-[60%] border border-black px-2 pb-2">
                                        <p className="m-0">a. Kota Cimahi</p>
                                        <p className="m-0">b. { data !== null ? data.spt.kegiatan.kota : '' }</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[5%] text-center border border-black pb-2">7.</td>
                                    <td className="w-[35%] border border-black px-2 pb-2">
                                        <p className="m-0">a. Lama Perjalan Dinas</p>
                                        <p className="m-0">b. Tanggal Berangkat</p>
                                        <p className="m-0">c. Tanggal Kembali</p>
                                    </td>
                                    <td className="w-[60%] border border-black px-2 pb-2">
                                        <p className="m-0">a. { data !== null ? days(data.spt.kegiatan.tgl_berangkat,data.spt.kegiatan.tgl_selesai) : '' } hari</p>
                                        <p className="m-0">b. { data !== null ? moment(data.spt.kegiatan.tgl_berangkat).format('DD MMMM YYYY') : '' }</p>
                                        <p className="m-0">c. { data !== null ? moment(data.spt.kegiatan.tgl_selesai).format('DD MMMM YYYY') : '' }</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[5%] text-center border border-black pb-2">8.</td>
                                    <td className="w-[35%] border border-black px-2 pb-2">
                                        <p className="m-0">Pengikut</p>
                                    </td>
                                    <td className="w-[60%] border border-black px-2 pb-2">
                                        <p className="m-0"></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[5%] text-center border border-black pb-2">9.</td>
                                    <td className="w-[35%] border border-black px-2 pb-2">
                                        <p className="m-0">Pembebanan Anggaran</p>
                                        <p className="m-0">a. Instansi</p>
                                        <p className="m-0">b. Akun</p>
                                    </td>
                                    <td className="w-[60%] border border-black px-2 pb-2">
                                        <p className="m-0 text-white">a</p>
                                        <p className="m-0">a. Dinas Pangan dan Pertanian</p>
                                        <p className="m-0">b.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-[5%] text-center border border-black pb-2">10.</td>
                                    <td className="w-[35%] border border-black px-2 pb-2">
                                        <p className="m-0">keterangan lain-lain</p>
                                    </td>
                                    <td className="w-[60%] border border-black px-2 pb-2">
                                        <p className="m-0"></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-2">
                        <p className="m-0 text-xs">*) Coret yang tidak perlu</p>
                    </div>
                    <div>
                        <div className="grid grid-cols-7 gap-4 mt-4 text-sm">
                            <div className="col-span-4"></div>
                            <div className="col-span-3">Dikeluarkan di : Cimahi</div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-7 gap-4 text-sm">
                            <div className="col-span-4"></div>
                            <div className="col-span-3">Tanggal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: { moment(new Date()).format('DD MMMM YYYY') }</div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-7 gap-4 mt-2 text-sm">
                            <div className="col-span-4"></div>
                            <div className="col-span-3 text-center">
                                <p>Kepala Dinas Pangan dan Pertanian Kota Cimahi,</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-7 gap-4 mt-20 mb-8 text-sm">
                            <div className="col-span-4"></div>
                            <div className="col-span-3 text-center">
                                <p>{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                <p>{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                <p>NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                <p className="text-white">a</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-3/4 border mt-6 mx-32">
                <div className="pl-8 pr-16 pt-6 pb-4 text-black" id="divToPrint2">
                    <div className="mt-2">
                        <table className={`table-fixed ${ pulang && viewPage2 ? '' : 'border border-black' } w-full text-xs`}>
                            <tbody>
                                <tr>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2 align-text-top`}>
                                        <p></p>
                                    </td>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <div className="grid grid-cols-4">
                                                        <div>Berangkat dari :</div>
                                                        <div className="col-span-3">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn1.berangkat} onChange={ (e) => onChangeDataColumn1(e.target.value,'berangkat')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        <div>Ke :</div>
                                                        <div className="col-span-3">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn1.ke} onChange={ (e) => onChangeDataColumn1(e.target.value,'ke')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        <div>Pada Tanggal :</div>
                                                        <div className="col-span-3">
                                                            <DatePicker
                                                                selected={ dataColumn1.tanggal === '' ? new Date() : new Date(dataColumn1.tanggal)}
                                                                onChange={ (e) => onChangeDataColumn1(e,'tanggal') }
                                                                className="border-b border-blue-800 outline-none w-full"
                                                                dateFormat="dd MMMM yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <p></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">Berangkat dari : <span className="text-black">{dataColumn1.berangkat}</span></p>
                                                    <p className="text-white">Ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{dataColumn1.ke}</span></p>
                                                    <p className="text-white">Pada Tanggal &nbsp;: <span className="text-black">{ dataColumn1.tanggal === '' ? '' : moment(dataColumn1.tanggal).format('DD MMMM YYYY') }</span></p>
                                                    <p>Kepala Dinas Pangan dan Pertanian Kota Cimahi</p>
                                                    <p className="mt-20 text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                                    <p className="text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                                    <p className="text-center">NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>Berangkat dari : </p>
                                                    <p>Ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p>
                                                    <p>Pada Tanggal &nbsp;: </p>
                                                    <p></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            )
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2 align-text-top`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <div className="grid grid-cols-3">
                                                        <div>II. Tiba di :</div>
                                                        <div className="col-span-2">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn2.tiba} onChange={ (e) => onChangeDataColumn2(e.target.value,'tiba')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3">
                                                        <div className="ml-4">Pada Tanggal :</div>
                                                        <div className="col-span-2">
                                                            <DatePicker
                                                                selected={ dataColumn2.tanggalTiba === '' ? new Date() : new Date(dataColumn2.tanggalTiba)}
                                                                onChange={ (e) => onChangeDataColumn2(e,'tanggalTiba') }
                                                                className="border-b border-blue-800 outline-none w-full"
                                                                dateFormat="dd MMMM yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">II. Tiba di &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn2.tiba }</span></p>
                                                    <p className="ml-4 text-white">Pada Tanggal : <span className="text-black">{ dataColumn2.tanggalTiba === '' ? '' : moment(dataColumn2.tanggalTiba).format('DD MMMM YYYY') }</span></p>
                                                    <p className="text-center">Kepala Bidang Perikanan Tangkap Dinas Kelautan dan Perikanan Prov. Jabar</p>
                                                    <p className="mt-20 text-center">{ pegawaiKepalaDinas !== null ? pegawaiKepalaDinas[0].nama : '' }</p>
                                                    <p className="text-center">NIP. { pegawaiKepalaDinas !== null ? pegawaiKepalaDinas[0].nip : '' }</p>                                                
                                                </>
                                            ) : (
                                                <>
                                                    <p>II. Tiba di &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                                                    <p className="ml-4">Pada Tanggal :</p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            )
                                        }
                                    </td>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <div className="grid grid-cols-4">
                                                        <div>Berangkat dari :</div>
                                                        <div className="col-span-3">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn2.berangkat} onChange={ (e) => onChangeDataColumn2(e.target.value,'berangkat')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        <div>Ke :</div>
                                                        <div className="col-span-3">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn2.ke} onChange={ (e) => onChangeDataColumn2(e.target.value,'ke')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        <div>Pada Tanggal :</div>
                                                        <div className="col-span-3">
                                                            <DatePicker
                                                                selected={ dataColumn2.tanggal === '' ? new Date() : new Date(dataColumn2.tanggal)}
                                                                onChange={ (e) => onChangeDataColumn2(e,'tanggal') }
                                                                className="border-b border-blue-800 outline-none w-full"
                                                                dateFormat="dd MMMM yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <p></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">Berangkat dari : <span className="text-black">{ dataColumn2.berangkat }</span></p>
                                                    <p>Ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: { dataColumn2.ke }</p>
                                                    <p className="text-white">Pada Tanggal &nbsp;&nbsp;: <span className="text-black">{ dataColumn2.tanggal === '' ? '' : moment(dataColumn2.tanggal).format('DD MMMM YYYY') }</span></p>
                                                    <p className="text-center">Kepala Bidang Perikanan Tangkap Dinas Kelautan dan Perikanan Prov. Jabar</p>
                                                    <p className="mt-20 text-center">{ pegawaiKepalaDinas !== null ? pegawaiKepalaDinas[0].nama : '' }</p>
                                                    <p className="text-center">NIP. { pegawaiKepalaDinas !== null ? pegawaiKepalaDinas[0].nip : '' }</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>Berangkat dari :</p>
                                                    <p>Ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                                                    <p>Pada Tanggal &nbsp;&nbsp;:</p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            )
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2 align-text-top`}>
                                    {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <div className="grid grid-cols-3">
                                                        <div>III. Tiba di :</div>
                                                        <div className="col-span-2">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn3.tiba} onChange={ (e) => onChangeDataColumn3(e.target.value,'tiba')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3">
                                                        <div className="ml-4">Pada Tanggal :</div>
                                                        <div className="col-span-2">
                                                            <DatePicker
                                                                selected={ dataColumn3.tanggalTiba === '' ? new Date() : new Date(dataColumn3.tanggalTiba)}
                                                                onChange={ (e) => onChangeDataColumn3(e,'tanggalTiba') }
                                                                className="border-b border-blue-800 outline-none w-full"
                                                                dateFormat="dd MMMM yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3">
                                                        <div className="ml-4">Kepala :</div>
                                                        <div className="col-span-2">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn3.kepala} onChange={ (e) => onChangeDataColumn3(e.target.value,'kepala')}/>
                                                        </div>
                                                    </div>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">III. Tiba di &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn3.tiba }</span></p>
                                                    <p className="ml-4 text-white">Pada Tanggal : <span className="text-black">{ dataColumn3.tanggalTiba === '' ? '' : moment(dataColumn3.tanggalTiba).format('DD MMMM YYYY') }</span></p>
                                                    <p className="ml-4 text-white">Kepala &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn3.kepala }</span></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>                                                
                                                </>
                                            ) : (
                                                <>
                                                    <p>III. Tiba di &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                                                    <p className="ml-4">Pada Tanggal :</p>
                                                    <p className="ml-4">Kepala &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            )
                                        }
                                    </td>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <div className="grid grid-cols-4">
                                                        <div>Berangkat dari :</div>
                                                        <div className="col-span-3">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn3.berangkat} onChange={ (e) => onChangeDataColumn3(e.target.value,'berangkat')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        <div>Ke :</div>
                                                        <div className="col-span-3">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn3.ke} onChange={ (e) => onChangeDataColumn3(e.target.value,'ke')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        <div>Pada Tanggal :</div>
                                                        <div className="col-span-3">
                                                            <DatePicker
                                                                selected={ dataColumn3.tanggal === '' ? new Date() : new Date(dataColumn3.tanggal)}
                                                                onChange={ (e) => onChangeDataColumn3(e,'tanggal') }
                                                                className="border-b border-blue-800 outline-none w-full"
                                                                dateFormat="dd MMMM yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <p></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">Berangkat dari : <span className="text-black">{ dataColumn3.berangkat }</span></p>
                                                    <p className="text-white">Ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn3.ke }</span></p>
                                                    <p className="text-white">Pada Tanggal &nbsp;&nbsp;: <span className="text-black">{ dataColumn3.tanggal === '' ? '' : moment(dataColumn3.tanggal).format('DD MMMM YYYY') }</span></p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>Berangkat dari :</p>
                                                    <p>Ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                                                    <p>Pada Tanggal &nbsp;&nbsp;:</p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            )
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2 align-text-top`}>
                                    {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <div className="grid grid-cols-3">
                                                        <div>IV. Tiba di :</div>
                                                        <div className="col-span-2">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn4.tiba} onChange={ (e) => onChangeDataColumn4(e.target.value,'tiba')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3">
                                                        <div className="ml-4">Pada Tanggal :</div>
                                                        <div className="col-span-2">
                                                            <DatePicker
                                                                selected={ dataColumn4.tanggalTiba === '' ? new Date() : new Date(dataColumn4.tanggalTiba)}
                                                                onChange={ (e) => onChangeDataColumn4(e,'tanggalTiba') }
                                                                className="border-b border-blue-800 outline-none w-full"
                                                                dateFormat="dd MMMM yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3">
                                                        <div className="ml-4">Kepala :</div>
                                                        <div className="col-span-2">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn4.kepala} onChange={ (e) => onChangeDataColumn4(e.target.value,'kepala')}/>
                                                        </div>
                                                    </div>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">IV. Tiba di &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn4.tiba }</span></p>
                                                    <p className="ml-4 text-white">Pada Tanggal : <span className="text-black">{ dataColumn4.tanggalTiba === '' ? '' : moment(dataColumn4.tanggalTiba).format('DD MMMM YYYY') }</span></p>
                                                    <p className="ml-4 text-white">Kepala &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn4.kepala }</span></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>                                                
                                                </>
                                            ) : (
                                                <>
                                                    <p>IV. Tiba di &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                                                    <p className="ml-4">Pada Tanggal :</p>
                                                    <p className="ml-4">Kepala &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            )
                                        }
                                    </td>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <div className="grid grid-cols-4">
                                                        <div>Berangkat dari :</div>
                                                        <div className="col-span-3">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn4.berangkat} onChange={ (e) => onChangeDataColumn4(e.target.value,'berangkat')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        <div>Ke :</div>
                                                        <div className="col-span-3">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn4.ke} onChange={ (e) => onChangeDataColumn4(e.target.value,'ke')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        <div>Pada Tanggal :</div>
                                                        <div className="col-span-3">
                                                            <DatePicker
                                                                selected={ dataColumn4.tanggal === '' ? new Date() : new Date(dataColumn4.tanggal)}
                                                                onChange={ (e) => onChangeDataColumn4(e,'tanggal') }
                                                                className="border-b border-blue-800 outline-none w-full"
                                                                dateFormat="dd MMMM yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <p></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">Berangkat dari : <span className="text-black">{ dataColumn4.berangkat }</span></p>
                                                    <p className="text-white">Ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn4.ke }</span></p>
                                                    <p className="text-white">Pada Tanggal &nbsp;&nbsp;: <span className="text-black">{ dataColumn4.tanggal === '' ? '' : moment(dataColumn4.tanggal).format('DD MMMM YYYY') }</span></p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>Berangkat dari :</p>
                                                    <p>Ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                                                    <p>Pada Tanggal &nbsp;&nbsp;:</p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            )
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2 align-text-top`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <div className="grid grid-cols-3">
                                                        <div>V. Tiba di :</div>
                                                        <div className="col-span-2">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn5.tiba} onChange={ (e) => onChangeDataColumn5(e.target.value,'tiba')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3">
                                                        <div className="ml-4">Pada Tanggal :</div>
                                                        <div className="col-span-2">
                                                            <DatePicker
                                                                selected={ dataColumn5.tanggalTiba === '' ? new Date() : new Date(dataColumn5.tanggalTiba)}
                                                                onChange={ (e) => onChangeDataColumn5(e,'tanggalTiba') }
                                                                className="border-b border-blue-800 outline-none w-full"
                                                                dateFormat="dd MMMM yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3">
                                                        <div className="ml-4">Kepala :</div>
                                                        <div className="col-span-2">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn5.kepala} onChange={ (e) => onChangeDataColumn5(e.target.value,'kepala')}/>
                                                        </div>
                                                    </div>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">V. Tiba di &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn5.tiba }</span></p>
                                                    <p className="ml-4 text-white">Pada Tanggal : <span className="text-black">{ dataColumn5.tanggalTiba === '' ? '' : moment(dataColumn5.tanggalTiba).format('DD MMMM YYYY') }</span></p>
                                                    <p className="ml-4 text-white">Kepala &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn5.kepala }</span></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>                                                
                                                </>
                                            ) : (
                                                <>
                                                    <p>V. Tiba di &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                                                    <p className="ml-4">Pada Tanggal :</p>
                                                    <p className="ml-4">Kepala &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            )
                                        }
                                    </td>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <div className="grid grid-cols-4">
                                                        <div>Berangkat dari :</div>
                                                        <div className="col-span-3">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn5.berangkat} onChange={ (e) => onChangeDataColumn5(e.target.value,'berangkat')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        <div>Ke :</div>
                                                        <div className="col-span-3">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn5.ke} onChange={ (e) => onChangeDataColumn5(e.target.value,'ke')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4">
                                                        <div>Pada Tanggal :</div>
                                                        <div className="col-span-3">
                                                            <DatePicker
                                                                selected={ dataColumn5.tanggal === '' ? new Date() : new Date(dataColumn5.tanggal)}
                                                                onChange={ (e) => onChangeDataColumn5(e,'tanggal') }
                                                                className="border-b border-blue-800 outline-none w-full"
                                                                dateFormat="dd MMMM yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <p></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">Berangkat dari : <span className="text-black">{ dataColumn5.berangkat }</span></p>
                                                    <p className="text-white">Ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn5.ke }</span></p>
                                                    <p className="text-white">Pada Tanggal &nbsp;&nbsp;: <span className="text-black">{ dataColumn5.tanggal === '' ? '' : moment(dataColumn5.tanggal).format('DD MMMM YYYY') }</span></p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>Berangkat dari :</p>
                                                    <p>Ke &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                                                    <p>Pada Tanggal &nbsp;&nbsp;:</p>
                                                    <p className="text-center"></p>
                                                    <p className="mt-20 text-center"></p>
                                                    <p className="text-center"></p>
                                                </>
                                            )
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2 align-text-top`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <div className="grid grid-cols-3">
                                                        <div>VI. Tiba di :</div>
                                                        <div className="col-span-2">
                                                            <input className="border-b border-blue-800 outline-none w-full" type='text' value={dataColumn6.tiba} onChange={ (e) => onChangeDataColumn6(e.target.value,'tiba')}/>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-3">
                                                        <div className="ml-4">Pada Tanggal :</div>
                                                        <div className="col-span-2">
                                                            <DatePicker
                                                                selected={ dataColumn6.tanggalTiba === '' ? new Date() : new Date(dataColumn6.tanggalTiba)}
                                                                onChange={ (e) => onChangeDataColumn6(e,'tanggalTiba') }
                                                                className="border-b border-blue-800 outline-none w-full"
                                                                dateFormat="dd MMMM yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <p className="text-center">Kepala Dinas Pangan dan Pertanian Kota Cimahi</p>
                                                    <p className="mt-20 text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                                    <p className="text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                                    <p className="text-center">NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">VI. Tiba di &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span className="text-black">{ dataColumn6.tiba }</span></p>
                                                    <p className="ml-4 text-white">Pada Tanggal : <span className="text-black">{ dataColumn6.tanggalTiba === '' ? '' : moment(dataColumn6.tanggalTiba).format('DD MMMM YYYY') }</span></p>
                                                    <p className="text-center text-white">Kepala Dinas Pangan dan Pertanian Kota Cimahi</p>
                                                    <p className="mt-20 text-center text-white">{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                                    <p className="text-center text-white">{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                                    <p className="text-center text-white">NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>VI. Tiba di &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                                                    <p className="ml-4">Pada Tanggal :</p>
                                                    <p className="text-center">Kepala Dinas Pangan dan Pertanian Kota Cimahi</p>
                                                    <p className="mt-20 text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                                    <p className="text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                                    <p className="text-center">NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                                </>
                                            )
                                        }
                                    </td>
                                    <td className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <p className="text-justify">Telah diperiksa dengan keterangan bahwa perjalanan tersebut atas perintahnya dan semata-mata untuk kepentingan jabatan dalama waktu yang sesingkat-singkatanya.</p>
                                                    <p className="text-center">Kepala Dinas Pangan dan Pertanian Kota Cimahi</p>
                                                    <p className="mt-20 text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                                    <p className="text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                                    <p className="text-center">NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-justify text-white">Telah diperiksa dengan keterangan bahwa perjalanan tersebut atas perintahnya dan semata-mata untuk kepentingan jabatan dalama waktu yang sesingkat-singkatanya.</p>
                                                    <p className="text-center text-white">Kepala Dinas Pangan dan Pertanian Kota Cimahi</p>
                                                    <p className="mt-20 text-center text-white">{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                                    <p className="text-center text-white">{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                                    <p className="text-center text-white">NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-justify">Telah diperiksa dengan keterangan bahwa perjalanan tersebut atas perintahnya dan semata-mata untuk kepentingan jabatan dalama waktu yang sesingkat-singkatanya.</p>
                                                    <p className="text-center">Kepala Dinas Pangan dan Pertanian Kota Cimahi</p>
                                                    <p className="mt-20 text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                                    <p className="text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                                    <p className="text-center">NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                                </>
                                            )
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black'} px-2 pb-2 align-text-top`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <p>VII. Catatan Lain-Lain</p>
                                            ) : viewPage2 ? (
                                                <p className="text-white">VII. Catatan Lain-Lain</p>
                                            ) : (
                                                <p>VII. Catatan Lain-Lain</p>
                                            )
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className={`w-1/2 ${ pulang && viewPage2 ? '' : 'border border-black' } px-2 pb-2 align-text-top`}>
                                        {
                                            pulang && !viewPage2 ? (
                                                <>
                                                    <p>VII. Perhatian:</p>
                                                    <div className="ml-8 text-justify">
                                                        <ol className="list-decimal">
                                                            <li>Pada lembar I, penandatanganan oleh PenggunaAnggaran / Kuasa Pengguna Anggaran, dilaksanakan bersamaan dengan tanggal dikeluarkannya Surat Perintah (SP)</li>
                                                            <li>PA/KPA yang menerbitkan SPPD, pegawai yang melakukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat / tiba, serta bendahara pengeluaran bertanggung jawab berdasarkan perarturan-perarturan Keuangan Negara apabila Negara menderita kerugian akibat kesalahan, kelalaian, dan kealpaannya.</li>
                                                        </ol>
                                                    </div>
                                                </>
                                            ) : viewPage2 ? (
                                                <>
                                                    <p className="text-white">VII. Perhatian:</p>
                                                    <div className="ml-8 text-justify text-white">
                                                        <ol className="list-decimal">
                                                            <li>Pada lembar I, penandatanganan oleh PenggunaAnggaran / Kuasa Pengguna Anggaran, dilaksanakan bersamaan dengan tanggal dikeluarkannya Surat Perintah (SP)</li>
                                                            <li>PA/KPA yang menerbitkan SPPD, pegawai yang melakukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat / tiba, serta bendahara pengeluaran bertanggung jawab berdasarkan perarturan-perarturan Keuangan Negara apabila Negara menderita kerugian akibat kesalahan, kelalaian, dan kealpaannya.</li>
                                                        </ol>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p>VII. Perhatian:</p>
                                                    <div className="ml-8 text-justify">
                                                        <ol className="list-decimal">
                                                            <li>Pada lembar I, penandatanganan oleh PenggunaAnggaran / Kuasa Pengguna Anggaran, dilaksanakan bersamaan dengan tanggal dikeluarkannya Surat Perintah (SP)</li>
                                                            <li>PA/KPA yang menerbitkan SPPD, pegawai yang melakukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat / tiba, serta bendahara pengeluaran bertanggung jawab berdasarkan perarturan-perarturan Keuangan Negara apabila Negara menderita kerugian akibat kesalahan, kelalaian, dan kealpaannya.</li>
                                                        </ol>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}