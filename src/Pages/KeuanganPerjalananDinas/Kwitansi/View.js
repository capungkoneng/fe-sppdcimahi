import { Table, TableContent } from "Components"
import moment from "moment"

export const View = ({
    listData = []
}) => {
    return (
        <Table
            listLabel={[
                {id: 'no_kwt', name: 'Keperluan'},
                {id: 'nik', name: 'No Surat'},
                {id: 'nama', name: 'Lokasi'},
                {id: 'no_spd', name: 'No.SPD'},
                {id: 'no_spt', name: 'No.SPT'},
                {id: 'tgl_mulai', name: 'Tgl Mulai'},
                {id: 'tgl_selesai', name: 'Tgl Selesai'},
                {id: 'kegiatan', name: 'Kegiatan'},
                {id: 'aksi', name: 'Aksi'},
            ]}
        >
            {
                listData.map(value => {
                    return (
                        <tr key={value.id}>
                            <TableContent>{value.no_kwt}</TableContent>
                            <TableContent>{value.nik}</TableContent>
                            <TableContent>{value.nama}</TableContent>
                            <TableContent>{value.no_spd}</TableContent>
                            <TableContent>{value.no_spt}</TableContent>
                            <TableContent>{moment(value.tgl_mulai).format('DD-MMM-YYYY')}</TableContent>
                            <TableContent>{moment(value.tgl_selesai).format('DD-MMM-YYYY')}</TableContent>
                            <TableContent>{value.kegiatan}</TableContent>
                            <TableContent>
                                Action
                            </TableContent>
                        </tr>
                    )
                })
            }
        </Table>
    )
}