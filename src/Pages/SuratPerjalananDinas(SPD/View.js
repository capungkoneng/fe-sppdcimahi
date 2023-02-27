import { useEffect, useState } from "react";
import moment from "moment";
import Logo from 'Assets/icons/logo-kota-cimahi.png';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export const View = ({
    data = null,
    pegawaiKepala = null,
    pegawaiKepalaDinas = null
}) => {

    const [activeTab, setActiveTab] = useState([]);

    useEffect(() => {
        if (data) {
            setActiveTab(data.spt.kegiatan.lsnamajbatan[0]);
        }
    }, [data]);

    const printDocument = () => {
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
                pdf.addImage(imgData, "JPEG", 0, 0);
                pdf.addPage()
                pdf.addImage(imgData2, "JPEG", 0, 0);
                // window.open(pdf.output('bloburl'), '_blank');
                pdf.save(`SPD_${namePDF}.pdf`);
            });
        });
    };

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
            <p id="as" className="text-sm">Hello</p>
            <div className="w-3/4 border mt-6 mx-32">
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
                        <div className="grid grid-cols-7 gap-4 mt-24 mb-8 text-sm">
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
                        <table className="table-fixed border border-black w-full text-xs">
                            <tbody>
                                <tr>
                                    <td className="w-1/2 border border-black px-2 pb-2 align-text-top">
                                        <p>I.</p>
                                    </td>
                                    <td className="w-1/2 border border-black px-2 pb-2">
                                        <p>Berangkat dari :</p>
                                        <p>Ke :</p>
                                        <p>Pada Tanggal :</p>
                                        <p>Kepala Dinas Pangan dan Pertanian Kota Cimahi</p>
                                        <p className="mt-20 text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                        <p className="text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                        <p className="text-center">NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-1/2 border border-black px-2 pb-2 align-text-top">
                                        <p>II. Tiba di :</p>
                                        <p className="ml-4">Pada Tanggal :</p>
                                        <p className="text-center">Kepala Bidang Perikanan Tangkap Dinas Kelautan dan Perikanan Prov. Jabar</p>
                                        <p className="mt-20 text-center">{ pegawaiKepalaDinas !== null ? pegawaiKepalaDinas[0].nama : '' }</p>
                                        <p className="text-center">NIP. { pegawaiKepalaDinas !== null ? pegawaiKepalaDinas[0].nip : '' }</p>
                                    </td>
                                    <td className="w-1/2 border border-black px-2 pb-2">
                                        <p>Berangkat dari :</p>
                                        <p>Ke :</p>
                                        <p>Pada Tanggal :</p>
                                        <p className="text-center">Kepala Bidang Perikanan Tangkap Dinas Kelautan dan Perikanan Prov. Jabar</p>
                                        <p className="mt-20 text-center">{ pegawaiKepalaDinas !== null ? pegawaiKepalaDinas[0].nama : '' }</p>
                                        <p className="text-center">NIP. { pegawaiKepalaDinas !== null ? pegawaiKepalaDinas[0].nip : '' }</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-1/2 border border-black px-2 pb-2 align-text-top">
                                        <p>III. Tiba di :</p>
                                        <p className="ml-4">Pada Tanggal :</p>
                                        <p className="ml-4 mb-16">Kepala :</p>
                                    </td>
                                    <td className="w-1/2 border border-black px-2 pb-2">
                                        <p>Berangkat dari :</p>
                                        <p>Ke :</p>
                                        <p className="mb-16">Pada Tanggal :</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-1/2 border border-black px-2 pb-2 align-text-top">
                                        <p>IV. Tiba di :</p>
                                        <p className="ml-4">Pada Tanggal :</p>
                                        <p className="ml-4 mb-16">Kepala :</p>
                                    </td>
                                    <td className="w-1/2 border border-black px-2 pb-2">
                                        <p>Berangkat dari :</p>
                                        <p>Ke :</p>
                                        <p className="mb-16">Pada Tanggal :</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-1/2 border border-black px-2 pb-2 align-text-top">
                                        <p>V. Tiba di :</p>
                                        <p className="ml-4">Pada Tanggal :</p>
                                        <p className="ml-4 mb-16">Kepala :</p>
                                    </td>
                                    <td className="w-1/2 border border-black px-2 pb-2">
                                        <p>Berangkat dari :</p>
                                        <p>Ke :</p>
                                        <p className="mb-16">Pada Tanggal :</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-1/2 border border-black px-2 pb-2 align-text-top">
                                        <p>VI. Tiba di :</p>
                                        <p className="ml-4">Pada Tanggal :</p>
                                        <p className="text-center">Kepala Dinas Pangan dan Pertanian Kota Cimahi</p>
                                        <p className="mt-20 text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                        <p className="text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                        <p className="text-center">NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                    </td>
                                    <td className="w-1/2 border border-black px-2 pb-2">
                                        <p className="text-justify">Telah diperiksa dengan keterangan bahwa perjalanan tersebut atas perintahnya dan semata-mata untuk kepentingan jabatan dalama waktu yang sesingkat-singkatanya.</p>
                                        <p className="text-center">Kepala Dinas Pangan dan Pertanian Kota Cimahi</p>
                                        <p className="mt-20 text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].nama : '' }</p>
                                        <p className="text-center">{ pegawaiKepala !== null ? pegawaiKepala[0].jabatan : '' }</p>
                                        <p className="text-center">NIP. { pegawaiKepala !== null ? pegawaiKepala[0].nip : '' }</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="w-1/2 border border-black px-2 pb-2 align-text-top">
                                        <p>VII. Catatan Lain-Lain</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="w-1/2 border border-black px-2 pb-2 align-text-top">
                                        <p>VII. Perhatian:</p>
                                        <div className="ml-8 text-justify">
                                            <ol className="list-decimal">
                                                <li>Pada lembar I, penandatanganan oleh PenggunaAnggaran / Kuasa Pengguna Anggaran, dilaksanakan bersamaan dengan tanggal dikeluarkannya Surat Perintah (SP)</li>
                                                <li>PA/KPA yang menerbitkan SPPD, pegawai yang melakukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat / tiba, serta bendahara pengeluaran bertanggung jawab berdasarkan perarturan-perarturan Keuangan Negara apabila Negara menderita kerugian akibat.</li>
                                            </ol>
                                        </div>
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