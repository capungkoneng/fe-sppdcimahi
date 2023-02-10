import { Table, TableContent } from "Components"

export const View = () => {
    return (
        <Table
            listLabel={[
                {id: 'no_spt', name: 'No.SPT'},
                {id: 'deskripsi', name: 'Deskripsi'},
                {id: 'tgl_berangkat', name: 'Tgl Berangkat'},
                {id: 'tgl_mulai', name: 'Tgl Mulai'},
                {id: 'tgl_selesai', name: 'Tgl Selesai'},
                {id: 'peserta', name: 'Perserta'},
                {id: 'aksi', name: 'Aksi'},
            ]}
        >
            <tr>
                <TableContent>001-SPT-2023</TableContent>
                <TableContent>005-UND-Prov</TableContent>
                <TableContent>05-Jan-2023</TableContent>
                <TableContent>05-Jan-2023</TableContent>
                <TableContent>05-Jan-2023</TableContent>
                <TableContent>Teti(Kabid Pertanian)</TableContent>
                <TableContent>Action</TableContent>
            </tr>
        </Table>
    )
}