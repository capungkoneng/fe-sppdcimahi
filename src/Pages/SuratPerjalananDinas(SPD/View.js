import { Table, TableContent } from "Components"

export const View = () => {
    return (
        <Table
            listLabel={[
                {id: 'no_spd', name: 'No.SPD'},
                {id: 'nip', name: 'NIP'},
                {id: 'nama', name: 'Nama'},
                {id: 'no_spt', name: 'No.SPT'},
                {id: 'tgl_berankat', name: 'Tgl Berangkat'},
                {id: 'tgl_mulai', name: 'Tgl Mulai'},
                {id: 'tgl_selesai', name: 'Tgl Selesai'},
                {id: 'kegiatan', name: 'Kegiatan'},
                {id: 'aksi', name: 'Aksi'},
            ]}
        >
            <tr>
                <TableContent>001-SPD-2023</TableContent>
                <TableContent>20029121</TableContent>
                <TableContent>Teti(Kadis Pertanian)</TableContent>
                <TableContent>001-SPT-2023</TableContent>
                <TableContent>05-Jan-2023</TableContent>
                <TableContent>05-Jan-2023</TableContent>
                <TableContent>05-Jan-2023</TableContent>
                <TableContent>Rakor Anggaran</TableContent>
                <TableContent>Action</TableContent>
            </tr>
        </Table>
    )
}