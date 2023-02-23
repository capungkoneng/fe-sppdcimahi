import moment from "moment";

export const View = ({
    data = []
}) => {
    return (
        <div>
            { data !== null ? (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>No SPT</div>
                            <div>: { data.no_spt }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>No Dasar SPT</div>
                            <div>: { data.kegiatan.no_surat }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Provinsi</div>
                            <div>: { data.kegiatan.tujuan_provinsi }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Kota</div>
                            <div>: { data.kegiatan.kota }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Lokasi</div>
                            <div>: { data.kegiatan.lokasi }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Kendaraan</div>
                            <div>: { data.kegiatan.berangkat }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Tanggal Mulai</div>
                            <div>: { moment(data.kegiatan.tgl_mulai).format('DD-MMMM-YYYY') }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Selesai</div>
                            <div>: { moment(data.kegiatan.tgl_selesai).format('DD-MMMM-YYYY') }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Tanggal Berangkat</div>
                            <div>: { moment(data.kegiatan.tgl_berangkat).format('DD-MMMM-YYYY') }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Tahun Anggaran</div>
                            <div>: { data.kegiatan.tahun_anggaran }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Keperluan</div>
                        <div className="col-span-3">: { data.kegiatan.keperluan }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Keterangan</div>
                        <div className="col-span-3">: { data.kegiatan.keterangan }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Peserta</div>
                        <div className="col-span-3"> 
                            <lu className="list-none">
                                {
                                    data.kegiatan.lsnamajbatan.map( data => {
                                        return (
                                            <li>{ data.nama_pegawai } ({data.nama})</li>
                                        )
                                    })
                                }
                            </lu>
                        </div>
                    </div>
                </>
            ) : ( null )
        }
        </div>
    )
}