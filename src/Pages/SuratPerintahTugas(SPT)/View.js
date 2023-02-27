import { useEffect, useState, useRef  } from "react";
import moment from "moment";
import Logo from 'Assets/icons/logo-kota-cimahi.png';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const Views = ({
    data = null,
    pegawaiKepala = null
}) => {
    const reportTemplateRef = useRef(null);
    const [activeTab, setActiveTab] = useState([]);

    useEffect(() => {
        if (data) {
            setActiveTab(data.kegiatan.lsnamajbatan[0]);
        }
    }, [data]);

    const printDocument = () => {
        const doc = document.getElementById("divToPrint");
        const namePDF = activeTab.nama_pegawai
        html2canvas(doc).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "cm",
                format: [21, 33]  
            });
            pdf.addImage(imgData, "JPEG", 0, 0);
            // window.open(pdf.output('bloburl'), '_blank');
            pdf.save(`SPT_${namePDF}.pdf`);
        });
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-4">
                {
                    data !== null ? (
                        data.kegiatan.lsnamajbatan.map(value => {
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
            <div className="mt-8 flex justify-center">
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
                        </svg> PDF
                    </button>
                </div>
            </div>
            <div className="w-3/4 border mt-8 mx-32">
                <div className="pl-8 pr-16 pt-8 text-black" id="divToPrint">
                    <div>
                        <div className="relative inline">
                            <div className="flex border-b-4 border-black">
                                <img src={Logo} alt="logo" className="h-32 w-32 ml-10 mt-4"/>
                                <div className="text-center ml-10 mb-4">
                                    <h1 className="text-xl font-semibold">PEMERINTAH DAERAH KOTA CIMAHI</h1>
                                    <h1 className="text-2xl font-bold">DINAS PANGAN DAN PERTANIAN</h1>
                                    <p className="text-base">Jl. Rd. Deman Hardjakusumah Blok Jati Cihanjuang</p>
                                    <p className="text-base">Telp/Fax: (022) 20665337 Website : <span className="underline">www.cimahikota.go.id</span></p>
                                    <p className="text-base">E-mail: dispangtan@cimahikota.go.id Cimahi 40513 Jawa Barat</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <h1 className="font-bold text-xl">SURAT PERINTAH TUGAS</h1>
                            <h2 className="font-bold text-xl">Nomor: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ PP</h2>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-6 gap-4 mt-8">
                            <div>Dasar :</div>
                            <div className="col-span-5 text-justify">{ data !== null ? data.kegiatan.keterangan : '' }</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-center mt-4">
                            <h1 className="font-bold text-1xl">MEMERINTAHKAN :</h1>
                        </div>
                    </div>
                    <div>
                        <div className="mt-1">
                            <p>Kepada :</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 ml-12 mt-1">
                        <div>Nama </div>
                        <div className="text-right">:</div>
                        <div className="col-span-4"> { activeTab.nama_pegawai } </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 ml-12 mt-1">
                        <div>NIP </div>
                        <div className="text-right">:</div>
                        <div className="col-span-4"> { activeTab.nip } </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 ml-12 mt-1">
                        <div>Pangkat/Golongan </div>
                        <div className="text-right">:</div>
                        <div className="col-span-4"> { activeTab.pangkat }/ { activeTab.gol } </div>
                    </div>
                    <div className="grid grid-cols-6 gap-4 ml-12 mt-1">
                        <div>Jabatan </div>
                        <div className="text-right">:</div>
                        <div className="col-span-4"> { activeTab.nama } </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-6 gap-4 mt-8">
                            <div>Untuk :</div>
                            <div className="col-span-5 text-justify">{ data !== null ? data.kegiatan.keperluan : '' }</div>
                        </div>
                    </div>
                    <div>
                        <div className="mt-8">
                            <p>Selesai melaksanakan tugas agar membuat laporan.</p>
                            <p>Demikian Surat Perintah Tugas ini untuk dilaksanakan dengan penuh tanggung jawab.</p>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-7 gap-4 mt-4">
                            <div className="col-span-4"></div>
                            <div className="col-span-3">Ditetapkan di Cimahi</div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-7 gap-4">
                            <div className="col-span-4"></div>
                            <div className="col-span-3">Pada Tanggal { moment(new Date()).format('DD MMMM YYYY') }</div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-7 gap-4 mt-2">
                            <div className="col-span-4"></div>
                            <div className="col-span-3 text-center">
                                <p>Kepala Dinas Pangan dan Pertanian Kota Cimahi,</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-7 gap-4 mt-28 mb-8">
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
        </div>
    )
}