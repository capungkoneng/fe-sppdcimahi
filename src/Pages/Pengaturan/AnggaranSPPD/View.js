import moment from "moment";
import { formatterCurrency } from "utils";

export const View = ({
    data = [],
    onCallback = () => { },
}) => {

    const tabelBiayaAnggaran = (value) => {
        const grandTotal = value.sumberPens[0].jumPens.filter(res => { return res.tahun === value.tahun_anggaran })
        console.log(grandTotal)
        return (
            <>
                <table className="w-full mt-4 text-xs text-box">
                    {
                        value.sumberPens[0].rekAnggarans.map((result, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td className="border border-black w-[11%] p-1">{result.kode}</td>
                                        <td className="border border-black w-[28%] p-1" colSpan={5}>{result.keperluan}</td>
                                        <td className="border border-black w-[15%] p-1">{formatterCurrency.format(parseInt(result.total))}</td>
                                        <td className="border border-black w-[28%] p-1" colSpan={4}> </td>
                                        <td className="border border-black w-[15%] p-1">{formatterCurrency.format(parseInt(result.total))}</td>
                                        <td className="border border-black w-[2%] p-1 text-center">0</td>
                                    </tr>
                                    {
                                        result.detailRekAnggarans.length > 0 ? (
                                            result.detailRekAnggarans.map((data, i) => {
                                                return (
                                                    <>
                                                        {
                                                            i === 0 ? (
                                                                <>
                                                                    <tr key={i}>
                                                                        <td className="border border-black w-[11%] p-1"></td>
                                                                        <td className="border border-black w-[28%] p-1" colSpan={5}>[#] {data.judul}</td>
                                                                        <td className="border border-black w-[15%] p-1">{formatterCurrency.format(parseInt(data.grandtotal))}</td>
                                                                        <td className="border border-black w-[28%] p-1" colSpan={4}> </td>
                                                                        <td className="border border-black w-[15%] p-1">{formatterCurrency.format(parseInt(data.grandtotal))}</td>
                                                                        <td className="border border-black w-[2%] p-1 text-center">0</td>
                                                                    </tr>
                                                                    <tr key={i}>
                                                                        <td className="border border-black w-[11%] p-1"></td>
                                                                        <td className="border border-black w-[28%] p-1" colSpan={5}>[-]</td>
                                                                        <td className="border border-black w-[15%] p-1"></td>
                                                                        <td className="border border-black w-[28%] p-1" colSpan={4}> </td>
                                                                        <td className="border border-black w-[15%] p-1"></td>
                                                                        <td className="border border-black w-[2%] p-1 text-center"></td>
                                                                    </tr>
                                                                </>
                                                            ) : null
                                                        }
                                                        <tr key={i}>
                                                            <td className="border border-black w-[11%] p-1"></td>
                                                            <td className="border border-black w-[14%] p-1">{data.keperluan}
                                                            </td>
                                                            <td className="border border-black w-[3%] p-1">{data.jumlah_peserta} {data.jenis} / hari</td>
                                                            <td className="border border-black w-[4%] p-1">{data.jenis} / hari</td>
                                                            <td className="border border-black w-[6%] p-1">{formatterCurrency.format(parseInt(data.jumlah))}</td>
                                                            <td className="border border-black w-[1%] p-1">0</td>
                                                            <td className="border border-black w-[15%] p-1">{formatterCurrency.format(parseInt(data.grandtotal))}</td>
                                                            <td className="border border-black w-[7%] p-1">{data.jumlah_peserta} {data.jenis} / hari</td>
                                                            <td className="border border-black w-[10%] p-1">{data.jenis} / hari</td>
                                                            <td className="border border-black w-[10%] p-1">{formatterCurrency.format(parseInt(data.jumlah))}</td>
                                                            <td className="border border-black w-[1%] p-1">0</td>
                                                            <td className="border border-black w-[15%] p-1">{formatterCurrency.format(parseInt(data.grandtotal))}</td>
                                                            <td className="border border-black w-[2%] p-1 text-center">0</td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        ) : null
                                    }
                                </>
                            )
                        })
                    }
                    <tr>
                        <td className="border border-black w-[39%] p-1 text-right" colSpan={6}>Grand Total:</td>
                        <td className="border border-black w-[15%] p-1">{formatterCurrency.format(parseInt(grandTotal[0].jumlah))}</td>
                        <td className="border border-black w-[28%] p-1 text-right" colSpan={4}>Grand Total:</td>
                        <td className="border border-black w-[15%] p-1">{formatterCurrency.format(parseInt(grandTotal[0].jumlah))}</td>
                        <td className="border border-black w-[2%] p-1">0</td>
                    </tr>
                </table>
                <div className="flex mt-1 text-sm">
                    <div className="border border-black px-6 py-6 w-[60%] mr-1"></div>
                    <div className="border border-black w-[40%] text-center">
                        <p>Kota Cimahi, ..................</p>
                        <p className="pb-28">Kepala Dinas Pangan dan Pertanian</p>
                        <p>TITA MARIAM, S,p.t., M.M.</p>
                        <p>NIP. 199982198291829</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="text-black">
            {data !== null ? (
                <>
                    <div className="border border-black text-semibold text-center">
                        <p className="my-2">Pemerintah Kota Cimahi Tahun Anggaran {data.tahun_anggaran}</p>
                    </div>
                    <div className="grid grid-cols-5 gap-4 mt-4">
                        <div>Urusan</div>
                        <div className="col-span-4">: {data.urusans[0].kode_urusan} {data.urusans[0].nama_urusan}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>Unit Organisasi</div>
                        <div className="col-span-4">: {data.unitOrs[0].kode_unit} {data.unitOrs[0].nama_unit}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>Sub Unit Organisasi</div>
                        <div className="col-span-4">: {data.subunits[0].sub_kode_unit} {data.subunits[0].sub_nama_unit}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>Program</div>
                        <div className="col-span-4">: {data.programs[0].kode_program} {data.programs[0].nama_program}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>Kegiatan</div>
                        <div className="col-span-4">: {data.kegiatanAnggarans[0].kode_kegiatan_anggaran} {data.kegiatanAnggarans[0].nama_kegiatan_anggaran}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>Sub Kegiatan</div>
                        <div className="col-span-4">: {data.SubkegiatanAnggarans[0].kode_sub_anggaran} {data.SubkegiatanAnggarans[0].nama_sub_anggaran}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>Sumber Pendanaan</div>
                        <div className="col-span-4">: {data.sumberPens[0].nama_sumber_pendanaan}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>Lokasi Kegiatan</div>
                        <div className="col-span-4">: {data.sumberPens[0].lokasi_kegiatan}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>Waktu Pelaksanaan</div>
                        <div className="col-span-4">: {moment(data.sumberPens[0].waktu_mulai).format('MMMM')} s.d. {moment(data.sumberPens[0].waktu_selesai).format('MMMM')}</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div>Kelompok Sasaran</div>
                        <div className="col-span-4">: {data.sumberPens[0].kelompok_saran}</div>
                    </div>
                    {
                        data.sumberPens[0].jumPens.map((result, index) => {
                            return (
                                <div className="grid grid-cols-5 gap-4" key={index}>
                                    <div>Jumlah {result.tahun}</div>
                                    <div className="col-span-4">: {formatterCurrency.format(parseInt(result.jumlah))}</div>
                                </div>
                            )
                        })
                    }
                    {tabelBiayaAnggaran(data)}
                </>
            ) : (null)
            }
        </div>
    )
}