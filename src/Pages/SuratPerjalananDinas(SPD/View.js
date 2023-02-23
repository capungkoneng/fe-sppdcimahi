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
                            <div>No SPD</div>
                            <div>: { data.no_spd }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>No SPT</div>
                            <div>: { data.no_spt }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Provinsi</div>
                            <div>: { data.spt.kegiatan.tujuan_provinsi }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Kota</div>
                            <div>: { data.spt.kegiatan.kota }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Lokasi</div>
                            <div>: { data.spt.kegiatan.lokasi }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Kendaraan</div>
                            <div>: { data.spt.kegiatan.berangkat }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Tanggal Mulai</div>
                            <div>: { moment(data.spt.kegiatan.tgl_mulai).format('DD-MMMM-YYYY') }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Selesai</div>
                            <div>: { moment(data.spt.kegiatan.tgl_selesai).format('DD-MMMM-YYYY') }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>Tanggal Berangkat</div>
                            <div>: { moment(data.spt.kegiatan.tgl_berangkat).format('DD-MMMM-YYYY') }</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>Tahun Anggaran</div>
                            <div>: { data.spt.kegiatan.tahun_anggaran }</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Keperluan</div>
                        <div className="col-span-3">: { data.spt.kegiatan.keperluan }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Keterangan</div>
                        <div className="col-span-3">: { data.spt.kegiatan.keterangan }</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div>Peserta</div>
                        <div className="col-span-3"> 
                            <lu className="list-none">
                                {
                                    data.spt.kegiatan.lsnamajbatan.map( data => {
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